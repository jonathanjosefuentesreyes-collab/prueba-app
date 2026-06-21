// Estimación de SUELDO LÍQUIDO (trabajador dependiente) — Ley Chilena / AbogaBot.
// 100% determinista. Descuenta del sueldo bruto imponible las cotizaciones previsionales
// (AFP, salud, seguro de cesantía) y el impuesto único de 2ª categoría (tabla SII en UTM).
//
// ⚠️ ESTIMACIÓN referencial: la comisión de la AFP y el plan de salud (Isapre) varían por
// persona; los topes imponibles se reajustan. Verifica tu caso en previred.com / sii.cl.

export const AFP_COTIZACION = 10;        // % cuenta individual obligatoria
export const AFP_COMISION_DEF = 1.44;    // % comisión AFP (referencial; varía por AFP)
export const SALUD_DEF = 7;              // % Fonasa (Isapre puede ser mayor)
export const CESANTIA_TRABAJADOR = 0.6;  // % seguro de cesantía (contrato indefinido)
export const TOPE_IMPONIBLE_UF = 87.8;   // tope AFP/salud (referencial)
export const TOPE_CESANTIA_UF = 131.6;   // tope seguro de cesantía (referencial)

// Impuesto único de 2ª categoría (mensual), tramos en UTM: factor y rebaja (tabla SII).
const TRAMOS = [
  { desde: 0, factor: 0, rebaja: 0 },
  { desde: 13.5, factor: 0.04, rebaja: 0.54 },
  { desde: 30, factor: 0.08, rebaja: 1.74 },
  { desde: 50, factor: 0.135, rebaja: 4.49 },
  { desde: 70, factor: 0.23, rebaja: 11.14 },
  { desde: 90, factor: 0.304, rebaja: 17.8 },
  { desde: 120, factor: 0.35, rebaja: 23.32 },
  { desde: 310, factor: 0.4, rebaja: 38.82 },
];

export interface ParamsSueldo {
  afpComision?: number; // %
  salud?: number;       // %
  valorUF: number;
  valorUTM: number;
}
export interface ResultadoSueldo {
  bruto: number;
  afp: number;
  salud: number;
  cesantia: number;
  cotizaciones: number;
  baseTributable: number;
  impuesto: number;
  liquido: number;
  afpPct: number;
  saludPct: number;
}

const clp = (n: number) => Math.round(n);

export function sueldoDesdeBruto(bruto: number, p: ParamsSueldo): ResultadoSueldo {
  const afpPct = AFP_COTIZACION + (p.afpComision ?? AFP_COMISION_DEF);
  const saludPct = p.salud ?? SALUD_DEF;
  if (bruto <= 0 || p.valorUF <= 0 || p.valorUTM <= 0) {
    return { bruto: 0, afp: 0, salud: 0, cesantia: 0, cotizaciones: 0, baseTributable: 0, impuesto: 0, liquido: 0, afpPct, saludPct };
  }
  const baseAfp = Math.min(bruto, TOPE_IMPONIBLE_UF * p.valorUF);
  const baseCes = Math.min(bruto, TOPE_CESANTIA_UF * p.valorUF);
  const afp = baseAfp * (afpPct / 100);
  const salud = baseAfp * (saludPct / 100);
  const cesantia = baseCes * (CESANTIA_TRABAJADOR / 100);
  const cotizaciones = afp + salud + cesantia;
  const baseTributable = Math.max(0, bruto - cotizaciones);
  const baseUTM = baseTributable / p.valorUTM;
  let tramo = TRAMOS[0];
  for (const t of TRAMOS) if (baseUTM >= t.desde) tramo = t;
  const impuesto = Math.max(0, baseUTM * tramo.factor - tramo.rebaja) * p.valorUTM;
  const liquido = bruto - cotizaciones - impuesto;
  return {
    bruto: clp(bruto), afp: clp(afp), salud: clp(salud), cesantia: clp(cesantia),
    cotizaciones: clp(cotizaciones), baseTributable: clp(baseTributable),
    impuesto: clp(impuesto), liquido: clp(liquido), afpPct, saludPct,
  };
}

// Inverso: dado el líquido deseado, busca el bruto por bisección (la función es monótona).
export function sueldoDesdeLiquido(liquidoObjetivo: number, p: ParamsSueldo): ResultadoSueldo {
  if (liquidoObjetivo <= 0) return sueldoDesdeBruto(0, p);
  let lo = liquidoObjetivo;
  let hi = liquidoObjetivo * 2.5;
  let guardia = 0;
  while (sueldoDesdeBruto(hi, p).liquido < liquidoObjetivo && guardia++ < 40) hi *= 1.5;
  for (let i = 0; i < 60; i++) {
    const mid = (lo + hi) / 2;
    if (sueldoDesdeBruto(mid, p).liquido < liquidoObjetivo) lo = mid;
    else hi = mid;
  }
  return sueldoDesdeBruto(Math.round((lo + hi) / 2), p);
}
