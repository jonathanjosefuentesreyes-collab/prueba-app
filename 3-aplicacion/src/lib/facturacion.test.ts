import { describe, it, expect } from "vitest";
import { boletaHonorarios, calcularIVA, retencionDefault, IVA } from "./facturacion";

describe("boletaHonorarios", () => {
  it("desde bruto: retención y líquido", () => {
    const r = boletaHonorarios(500000, 15.25, "bruto");
    expect(r.bruto).toBe(500000);
    expect(r.retencion).toBe(76250); // 500000 * 15.25%
    expect(r.liquido).toBe(423750);
  });

  it("desde líquido: reconstruye el bruto (ida y vuelta)", () => {
    const r = boletaHonorarios(423750, 15.25, "liquido");
    expect(r.liquido).toBe(423750);
    expect(r.bruto).toBe(500000);
  });

  it("monto 0 o negativo no rompe", () => {
    expect(boletaHonorarios(0, 15.25, "bruto")).toEqual({ bruto: 0, retencion: 0, liquido: 0 });
  });
});

describe("calcularIVA", () => {
  it("desde neto agrega 19%", () => {
    const r = calcularIVA(100000, "neto");
    expect(r.neto).toBe(100000);
    expect(r.iva).toBe(19000);
    expect(r.total).toBe(119000);
  });

  it("desde total extrae el IVA contenido", () => {
    const r = calcularIVA(119000, "total");
    expect(r.neto).toBe(100000);
    expect(r.iva).toBe(19000);
    expect(r.total).toBe(119000);
  });

  it("la tasa general es 19%", () => {
    expect(IVA).toBe(19);
  });
});

describe("retencionDefault", () => {
  it("entrega la tasa del año (gradual Ley 21.133)", () => {
    expect(retencionDefault(2026)).toBe(15.25);
    expect(retencionDefault(2028)).toBe(17);
  });
  it("años fuera de tabla caen al default 2026", () => {
    expect(retencionDefault(1999)).toBe(15.25);
  });
});
