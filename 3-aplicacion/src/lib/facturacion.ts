// Motor de cálculo de facturación chilena — Ley Chilena / AbogaBot.
// 100% determinista en el navegador. Dos herramientas: boleta de honorarios
// (retención de impuesto) y factura (IVA 19%).
//
// RETENCIÓN DE HONORARIOS: la Ley 21.133 subió gradualmente la tasa de retención de
// boletas de honorarios (de 10% en 2019 a 17% en 2028). La tasa la define el AÑO, así
// que se entrega como parámetro EDITABLE y se muestra el valor por defecto del año, con
// nota de "verifica en sii.cl". Esto evita dar un número tributario desactualizado.
export const RETENCION_POR_ANIO: Record<number, number> = {
  2020: 10.75, 2021: 11.5, 2022: 12.25, 2023: 13, 2024: 13.75,
  2025: 14.5, 2026: 15.25, 2027: 16, 2028: 17,
};
export const IVA = 19; // % — DL 825, tasa general vigente

export function retencionDefault(anio: number): number {
  return RETENCION_POR_ANIO[anio] ?? RETENCION_POR_ANIO[2026];
}

const clp = (n: number) => Math.round(n);

// Boleta de honorarios. `tasa` en % (ej. 15.25). `modo`:
//  - 'bruto'   → ingresas el monto BRUTO de la boleta; calcula retención y líquido a recibir.
//  - 'liquido' → ingresas lo que quieres RECIBIR; calcula el bruto a boletar y la retención.
export function boletaHonorarios(
  monto: number,
  tasa: number,
  modo: "bruto" | "liquido"
): { bruto: number; retencion: number; liquido: number } {
  const r = tasa / 100;
  if (monto <= 0) return { bruto: 0, retencion: 0, liquido: 0 };
  if (modo === "bruto") {
    const retencion = monto * r;
    return { bruto: clp(monto), retencion: clp(retencion), liquido: clp(monto - retencion) };
  }
  const bruto = monto / (1 - r);
  return { bruto: clp(bruto), retencion: clp(bruto - monto), liquido: clp(monto) };
}

// Factura / IVA. `modo`:
//  - 'neto'  → ingresas el NETO; calcula IVA y total.
//  - 'total' → ingresas el TOTAL con IVA; calcula el neto y el IVA contenido.
export function calcularIVA(
  monto: number,
  modo: "neto" | "total"
): { neto: number; iva: number; total: number } {
  if (monto <= 0) return { neto: 0, iva: 0, total: 0 };
  if (modo === "neto") {
    const iva = monto * (IVA / 100);
    return { neto: clp(monto), iva: clp(iva), total: clp(monto + iva) };
  }
  const neto = monto / (1 + IVA / 100);
  return { neto: clp(neto), iva: clp(monto - neto), total: clp(monto) };
}
