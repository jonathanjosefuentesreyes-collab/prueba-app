import { describe, it, expect } from "vitest";
import { calcularFiniquito } from "./finiquito";

const BASE = {
  fechaInicio: "2023-01-01",
  fechaTermino: "2025-01-15",
  remuneracionMensual: 850000,
  valorUF: 40788,
};

describe("calcularFiniquito — despido art. 161 sin aviso", () => {
  const r = calcularFiniquito({ ...BASE, causal: "necesidades_empresa", avisoPrevio30Dias: false });

  it("incluye indemnización sustitutiva del aviso previo (1 remuneración)", () => {
    const aviso = r.lineas.find((l) => /aviso previo/i.test(l.concepto));
    expect(aviso).toBeDefined();
    expect(aviso!.monto).toBe(850000);
  });

  it("incluye indemnización por años de servicio (2 años × remuneración)", () => {
    const anios = r.lineas.find((l) => /años de servicio/i.test(l.concepto));
    expect(anios).toBeDefined();
    expect(anios!.monto).toBe(1700000); // 850000 × 2
  });

  it("siempre paga feriado y agrega disclaimer de estimación", () => {
    expect(r.lineas.some((l) => /feriado/i.test(l.concepto))).toBe(true);
    expect(r.advertencias.some((a) => /ESTIMACIÓN/i.test(a))).toBe(true);
  });

  it("el total es la suma de las líneas", () => {
    const suma = r.lineas.reduce((s, l) => s + l.monto, 0);
    expect(r.total).toBe(suma);
    expect(r.total).toBeGreaterThan(2550000);
  });
});

describe("calcularFiniquito — renuncia (art. 159 N°2)", () => {
  const r = calcularFiniquito({ ...BASE, causal: "renuncia" });

  it("NO genera indemnización por años de servicio ni aviso previo", () => {
    expect(r.lineas.some((l) => /años de servicio/i.test(l.concepto))).toBe(false);
    expect(r.lineas.some((l) => /aviso previo/i.test(l.concepto))).toBe(false);
  });

  it("pero SÍ paga el feriado (cualquiera sea la causal)", () => {
    expect(r.lineas.some((l) => /feriado/i.test(l.concepto))).toBe(true);
  });
});

describe("calcularFiniquito — topes (art. 172 y 163)", () => {
  it("remuneración sobre 90 UF: advierte y aplica el tope", () => {
    const r = calcularFiniquito({
      ...BASE,
      remuneracionMensual: 5000000, // > 90 UF (3.670.920)
      causal: "necesidades_empresa",
      avisoPrevio30Dias: false,
    });
    expect(r.advertencias.some((a) => /tope.*90 UF/i.test(a))).toBe(true);
    const aviso = r.lineas.find((l) => /aviso previo/i.test(l.concepto));
    expect(aviso!.monto).toBe(Math.round(90 * BASE.valorUF)); // capado a 90 UF
  });

  it("antigüedad > 11 años: aplica tope de 330 días", () => {
    const r = calcularFiniquito({
      fechaInicio: "2010-01-01",
      fechaTermino: "2025-01-15",
      remuneracionMensual: 850000,
      valorUF: 40788,
      causal: "necesidades_empresa",
    });
    expect(r.advertencias.some((a) => /330 días|11 años/i.test(a))).toBe(true);
    const anios = r.lineas.find((l) => /años de servicio/i.test(l.concepto));
    expect(anios!.monto).toBe(850000 * 11); // capado a 11 años
  });

  it("fechas inválidas lanzan error", () => {
    expect(() =>
      calcularFiniquito({ ...BASE, fechaInicio: "2025-01-15", fechaTermino: "2023-01-01", causal: "renuncia" })
    ).toThrow();
  });
});
