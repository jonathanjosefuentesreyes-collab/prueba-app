import { describe, it, expect } from "vitest";
import { sueldoDesdeBruto, sueldoDesdeLiquido } from "./sueldo";

const P = { valorUF: 40788, valorUTM: 71506 };

describe("sueldoDesdeBruto", () => {
  it("sueldo bajo: sin impuesto (tramo exento)", () => {
    const r = sueldoDesdeBruto(1000000, P);
    expect(r.afp).toBe(114400); // 1M * 11.44%
    expect(r.salud).toBe(70000); // 1M * 7%
    expect(r.cesantia).toBe(6000); // 1M * 0.6%
    expect(r.impuesto).toBe(0); // base bajo 13.5 UTM
    expect(r.liquido).toBe(809600);
  });

  it("sueldo medio: aplica impuesto único 2ª categoría", () => {
    const r = sueldoDesdeBruto(2000000, P);
    expect(r.impuesto).toBeGreaterThan(0);
    expect(r.liquido).toBeLessThan(2000000);
    // líquido razonable (~80% para este tramo)
    expect(r.liquido).toBeGreaterThan(1500000);
  });

  it("sueldo alto: aplica el tope imponible (87,8 UF) a AFP/salud", () => {
    const r = sueldoDesdeBruto(10000000, P);
    const topeAfp = 87.8 * P.valorUF;
    expect(r.afp).toBe(Math.round(topeAfp * 0.1144)); // capado al tope
    expect(r.salud).toBe(Math.round(topeAfp * 0.07));
  });

  it("monto 0 no rompe", () => {
    const r = sueldoDesdeBruto(0, P);
    expect(r.liquido).toBe(0);
  });
});

describe("sueldoDesdeLiquido (inverso por bisección)", () => {
  it("recupera el bruto que produce el líquido pedido", () => {
    const objetivo = 800000;
    const r = sueldoDesdeLiquido(objetivo, P);
    // al recalcular desde el bruto encontrado, el líquido debe coincidir (±1 peso por redondeo)
    expect(Math.abs(r.liquido - objetivo)).toBeLessThanOrEqual(1);
    expect(r.bruto).toBeGreaterThan(objetivo); // el bruto siempre es mayor que el líquido
  });
});
