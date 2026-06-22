// Motor determinista de cálculo de finiquito — Leyes de Chile / AbogaBot.
// REGLA DURA (abogabot-cerebro): el cálculo es 100% código; la IA solo explica el
// resultado citando estos mismos fundamentos. Jamás dejar el número al modelo.
// Fundamentos verificados contra la DB oficial (Código del Trabajo, idNorma 207436):
// arts. 67, 69, 73 (feriado), 159/160/161 (causales), 162 inc. 4° (aviso previo),
// 163 (años de servicio), 168 (recargos y plazo), 172 (remuneración base y tope 90 UF).

export type Causal =
  | 'renuncia'             // art. 159 N°2
  | 'mutuo_acuerdo'        // art. 159 N°1
  | 'vencimiento_plazo'    // art. 159 N°4
  | 'conclusion_obra'      // art. 159 N°5
  | 'caso_fortuito'        // art. 159 N°6
  | 'art160'               // causales imputables al trabajador
  | 'necesidades_empresa'  // art. 161 inc. 1°
  | 'desahucio';           // art. 161 inc. 2°

export interface DatosFiniquito {
  causal: Causal;
  fechaInicio: string;  // 'YYYY-MM-DD'
  fechaTermino: string; // 'YYYY-MM-DD'
  /** Última remuneración mensual según art. 172: incluye sueldo, cotizaciones del
   *  trabajador y regalías avaluables; EXCLUYE horas extra, asignación familiar y
   *  bonos esporádicos. Si es variable: promedio de los últimos 3 meses. */
  remuneracionMensual: number;
  /** Valor UF del día del cálculo (buscar el vigente; cambia a diario). */
  valorUF: number;
  /** Solo art. 161: ¿el empleador avisó con 30 días de anticipación? */
  avisoPrevio30Dias?: boolean;
  /** Días HÁBILES de feriado de periodos anuales completos devengados y no tomados. */
  diasFeriadoAcumuladosHabiles?: number;
  /** Días del último mes trabajados y todavía no pagados. */
  diasTrabajadosImpagos?: number;
  /** Otros haberes adeudados (horas extra impagas, bonos pactados, etc.). */
  otrosHaberes?: number;
}

export interface LineaFiniquito {
  concepto: string;
  formula: string;
  monto: number;       // CLP, redondeado
  fundamento: string;  // artículo del Código del Trabajo
}

export interface ResultadoFiniquito {
  lineas: LineaFiniquito[];
  total: number;
  advertencias: string[];
  supuestos: string[];
}

const DIA_MS = 86_400_000;

function fecha(s: string): Date {
  const [a, m, d] = s.split('-').map(Number);
  return new Date(Date.UTC(a, m - 1, d));
}

/** Años completos y meses (con fracción de días) entre dos fechas. */
function antiguedad(inicio: Date, termino: Date) {
  let anios = termino.getUTCFullYear() - inicio.getUTCFullYear();
  let aniversario = new Date(Date.UTC(inicio.getUTCFullYear() + anios, inicio.getUTCMonth(), inicio.getUTCDate()));
  if (aniversario > termino) {
    anios -= 1;
    aniversario = new Date(Date.UTC(inicio.getUTCFullYear() + anios, inicio.getUTCMonth(), inicio.getUTCDate()));
  }
  const mesesDesdeAniversario = (termino.getTime() - aniversario.getTime()) / DIA_MS / 30; // meses con fracción
  return { anios, mesesDesdeAniversario, aniversario };
}

/** Convierte días hábiles de feriado a días corridos contando desde el día
 *  siguiente al término. Para el feriado, sábado es SIEMPRE inhábil (art. 69 CT)
 *  y domingo también. Limitación conocida: no descuenta festivos (se advierte). */
function habilesACorridos(termino: Date, habiles: number): number {
  if (habiles <= 0) return 0;
  let corridos = 0;
  let restantes = habiles;
  const d = new Date(termino.getTime());
  while (restantes > 0) {
    d.setTime(d.getTime() + DIA_MS);
    corridos += 1;
    const dia = d.getUTCDay(); // 0 dom, 6 sáb
    if (dia !== 0 && dia !== 6) restantes -= 1;
  }
  // la fracción final de día hábil se suma como fracción de día corrido
  return corridos + (restantes < 0 ? restantes : 0);
}

const clp = (n: number) => Math.round(n);

export function calcularFiniquito(datos: DatosFiniquito): ResultadoFiniquito {
  const lineas: LineaFiniquito[] = [];
  const advertencias: string[] = [];
  const supuestos: string[] = [];

  const inicio = fecha(datos.fechaInicio);
  const termino = fecha(datos.fechaTermino);
  if (!(inicio < termino)) throw new Error('fechaInicio debe ser anterior a fechaTermino');
  if (datos.remuneracionMensual <= 0 || datos.valorUF <= 0) throw new Error('remuneración y UF deben ser positivas');

  const es161 = datos.causal === 'necesidades_empresa' || datos.causal === 'desahucio';
  const valorDia = datos.remuneracionMensual / 30;
  const topeUF = 90 * datos.valorUF;
  const baseIndemnizacion = Math.min(datos.remuneracionMensual, topeUF);
  if (datos.remuneracionMensual > topeUF) {
    advertencias.push(`La remuneración informada supera el tope de 90 UF ($${clp(topeUF).toLocaleString('es-CL')}); las indemnizaciones se calculan con ese tope (art. 172 CT).`);
  }

  supuestos.push(`Remuneración base informada: $${clp(datos.remuneracionMensual).toLocaleString('es-CL')} (según art. 172: sin horas extra ni bonos esporádicos; promedio de 3 meses si es variable).`);
  supuestos.push(`UF utilizada: $${datos.valorUF.toLocaleString('es-CL')} — verificar el valor del día del pago.`);
  supuestos.push(`Periodo trabajado: ${datos.fechaInicio} → ${datos.fechaTermino}.`);

  // 1. Remuneraciones pendientes del último mes
  const diasImpagos = datos.diasTrabajadosImpagos ?? 0;
  if (diasImpagos > 0) {
    lineas.push({
      concepto: 'Remuneración pendiente del último mes',
      formula: `(${clp(datos.remuneracionMensual).toLocaleString('es-CL')} ÷ 30) × ${diasImpagos} días`,
      monto: clp(valorDia * diasImpagos),
      fundamento: 'Arts. 54 y ss. CT (pago de remuneraciones)',
    });
  }

  // 2. Otros haberes adeudados
  if ((datos.otrosHaberes ?? 0) > 0) {
    lineas.push({
      concepto: 'Otros haberes adeudados (horas extra, bonos pactados)',
      formula: 'Monto informado',
      monto: clp(datos.otrosHaberes!),
      fundamento: 'Arts. 32 y 55 CT',
    });
  }

  // 3. Feriado (vacaciones): acumulado + proporcional — se paga SIEMPRE, cualquiera sea la causal
  const { anios, mesesDesdeAniversario } = antiguedad(inicio, termino);
  const habilesProporcional = 1.25 * mesesDesdeAniversario; // 15 días hábiles/año ÷ 12 (arts. 67 y 73 CT)
  const habilesAcumulados = datos.diasFeriadoAcumuladosHabiles ?? 0;
  const habilesTotales = habilesAcumulados + habilesProporcional;
  if (habilesTotales > 0) {
    const corridos = habilesACorridos(termino, habilesTotales);
    lineas.push({
      concepto: `Feriado proporcional${habilesAcumulados > 0 ? ' + acumulado' : ''} (${habilesTotales.toFixed(2)} días hábiles ≈ ${corridos.toFixed(1)} corridos)`,
      formula: `${habilesAcumulados} acumulados + 1,25 × ${mesesDesdeAniversario.toFixed(2)} meses; valor día $${clp(valorDia).toLocaleString('es-CL')}`,
      monto: clp(valorDia * corridos),
      fundamento: 'Arts. 67, 69 y 73 CT',
    });
    advertencias.push('La conversión a días corridos no descuenta festivos (solo sábados y domingos) — el monto real puede ser levemente mayor.');
  }

  // 4. Indemnización sustitutiva del aviso previo (solo art. 161 sin aviso de 30 días)
  if (es161 && !datos.avisoPrevio30Dias) {
    lineas.push({
      concepto: 'Indemnización sustitutiva del aviso previo',
      formula: `1 remuneración (tope 90 UF) = $${clp(baseIndemnizacion).toLocaleString('es-CL')}`,
      monto: clp(baseIndemnizacion),
      fundamento: 'Art. 162 inc. 4° CT (tope: art. 172)',
    });
  }

  // 5. Indemnización por años de servicio (solo art. 161 y contrato ≥ 1 año)
  if (es161 && (anios >= 1 || mesesDesdeAniversario >= 12)) {
    let aniosComputables = anios + (mesesDesdeAniversario * 30 > 183 ? 1 : 0); // fracción > 6 meses
    if (aniosComputables > 11) {
      advertencias.push(`Antigüedad de ${aniosComputables} años: se aplica el tope de 330 días (11 años) para contratos posteriores al 14-08-1981 (art. 163 CT).`);
      aniosComputables = 11;
    }
    lineas.push({
      concepto: `Indemnización por años de servicio (${aniosComputables} años computables)`,
      formula: `$${clp(baseIndemnizacion).toLocaleString('es-CL')} × ${aniosComputables}`,
      monto: clp(baseIndemnizacion * aniosComputables),
      fundamento: 'Art. 163 CT (30 días por año y fracción > 6 meses; topes: art. 163 y 172)',
    });
  }

  // Advertencias según causal
  if (datos.causal === 'art160') {
    advertencias.push('La causal del art. 160 no da derecho a indemnizaciones, pero el feriado y las remuneraciones pendientes se pagan IGUAL. Si crees que la causal es indebida, puedes demandar dentro de 60 días hábiles (art. 168 CT) — si ganas, la indemnización se paga con recargo de 80% o 100%.');
  } else if (es161) {
    advertencias.push('Si consideras que el despido es improcedente, puedes demandar dentro de 60 días hábiles desde la separación (art. 168 CT): la indemnización por años subiría 30%.');
  }
  advertencias.push('Si el empleador tiene cotizaciones previsionales impagas, el despido no produce efecto y se deben remuneraciones hasta convalidar (Ley Bustos, art. 162 inc. 5° CT).');
  advertencias.push('Este cálculo es una ESTIMACIÓN referencial y no reemplaza el finiquito legal, que debe firmarse ante ministro de fe (notario, Inspección del Trabajo o finiquito electrónico DT). Puedes firmar con reserva de derechos.');

  const total = lineas.reduce((s, l) => s + l.monto, 0);
  return { lineas, total: clp(total), advertencias, supuestos };
}
