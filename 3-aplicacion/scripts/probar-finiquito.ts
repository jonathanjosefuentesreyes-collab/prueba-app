// Muestra de la calculadora de finiquito — 3 casos de prueba del motor determinista.
// Uso: node scripts/probar-finiquito.ts   (Node 24 ejecuta TS directamente)
import { calcularFiniquito, type DatosFiniquito } from '../src/lib/finiquito.ts';

const UF = 40768.69; // valor 11-jun-2026 (mindicador.cl) — en la app se busca el del día

const casos: { titulo: string; datos: DatosFiniquito }[] = [
  {
    titulo: 'CASO A — Despido por necesidades de la empresa (art. 161), sin aviso previo',
    datos: {
      causal: 'necesidades_empresa',
      fechaInicio: '2021-03-01',
      fechaTermino: '2026-06-30',
      remuneracionMensual: 850_000,
      valorUF: UF,
      avisoPrevio30Dias: false,
      diasFeriadoAcumuladosHabiles: 10,
      diasTrabajadosImpagos: 8,
    },
  },
  {
    titulo: 'CASO B — Renuncia voluntaria (art. 159 N°2), mismos datos',
    datos: {
      causal: 'renuncia',
      fechaInicio: '2021-03-01',
      fechaTermino: '2026-06-30',
      remuneracionMensual: 850_000,
      valorUF: UF,
      diasFeriadoAcumuladosHabiles: 10,
      diasTrabajadosImpagos: 8,
    },
  },
  {
    titulo: 'CASO C — Gerente con sueldo sobre 90 UF y 13 años (prueba de topes)',
    datos: {
      causal: 'necesidades_empresa',
      fechaInicio: '2013-01-15',
      fechaTermino: '2026-06-30',
      remuneracionMensual: 4_500_000,
      valorUF: UF,
      avisoPrevio30Dias: true,
    },
  },
];

const f = (n: number) => '$' + n.toLocaleString('es-CL');

for (const { titulo, datos } of casos) {
  const r = calcularFiniquito(datos);
  console.log(`\n${'='.repeat(70)}\n${titulo}\n${'='.repeat(70)}`);
  for (const l of r.lineas) {
    console.log(`\n  ${l.concepto}`);
    console.log(`    Fórmula: ${l.formula}`);
    console.log(`    Monto:   ${f(l.monto)}   [${l.fundamento}]`);
  }
  console.log(`\n  >>> TOTAL ESTIMADO: ${f(r.total)} <<<`);
  console.log(`\n  Advertencias:`);
  r.advertencias.forEach(a => console.log(`   ⚠ ${a}`));
}
