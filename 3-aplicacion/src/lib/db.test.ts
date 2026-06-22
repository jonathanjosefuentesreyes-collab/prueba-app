import { describe, it, expect } from "vitest";
import { existsSync } from "node:fs";
import path from "node:path";
import { numeroReal, normaPorReferencia, articuloPorNumero, buscar } from "./db";

// numeroReal es la regla dura #4 hecha código: el número visible se DERIVA del
// encabezado, nunca de un contador posicional. Es función pura, así que se prueba
// sin la base. Un error aquí mostraría el artículo equivocado bajo el número correcto.
describe("numeroReal — deriva el número real del encabezado", () => {
  const casos: [string, string][] = [
    ["Artículo 159", "159"],
    ["Art. 162", "162"],
    ["Artículo 9 bis", "9 bis"],
    ["Artículo 489", "489"],
    // Metadata del importador en DL/DFL refundidos: el número real va antes del paréntesis.
    ["27 (DEL ART 1)", "27"],
    ["20 (DEL ART. PRIMERO)", "20"],
    // Limpieza de puntuación final.
    ["Artículo 5.", "5"],
  ];
  for (const [entrada, esperado] of casos) {
    it(`"${entrada}" → "${esperado}"`, () => {
      expect(numeroReal(entrada)).toBe(esperado);
    });
  }
  it("nunca devuelve vacío para un encabezado con contenido", () => {
    expect(numeroReal("Artículo 1").length).toBeGreaterThan(0);
  });
});

// Tests de integración contra la base oficial: verifican el candado anti-invención
// (resolver citas a normas y artículos REALES, y NO inventar lo que no existe). Se
// saltan si la base no está presente; en CI se descomprime antes de correr.
const dbExiste = existsSync(path.join(process.cwd(), "data", "leyes.db"));

describe.skipIf(!dbExiste)("normaPorReferencia — resuelve citas a normas reales", () => {
  it("resuelve 'Código del Trabajo' a la norma núcleo 207436", () => {
    const n = normaPorReferencia("Código del Trabajo");
    expect(n).toBeDefined();
    expect(n!.id).toBe(207436);
    expect(/trabajo/i.test(n!.nombre_corto || n!.titulo)).toBe(true);
  });

  it("resuelve un código por su nombre ('Código Penal')", () => {
    const n = normaPorReferencia("Código Penal");
    expect(n).toBeDefined();
    expect(/penal/i.test(n!.nombre_corto || n!.titulo)).toBe(true);
  });

  it("resuelve una ley por su número ('Ley 19.496' → consumidor)", () => {
    const n = normaPorReferencia("Ley 19.496");
    expect(n).toBeDefined();
    expect((n!.numero_norma || "").replace(/\D/g, "")).toBe("19496");
  });

  it("NO inventa: una referencia inexistente devuelve undefined", () => {
    expect(normaPorReferencia("Ley imaginaria zzqq sin sentido")).toBeUndefined();
  });
});

describe.skipIf(!dbExiste)("articuloPorNumero — enlaza al artículo EXACTO", () => {
  it("Código del Trabajo art. 162 resuelve a una fila cuyo número real es 162", () => {
    const art = articuloPorNumero(207436, "162");
    expect(art).toBeDefined();
    expect(numeroReal(art!.encabezado)).toBe("162");
  });

  it("NO inventa: un artículo inexistente devuelve undefined", () => {
    expect(articuloPorNumero(207436, "999999")).toBeUndefined();
  });
});

describe.skipIf(!dbExiste)("buscar — la búsqueda FTS devuelve artículos reales", () => {
  it("una consulta en lenguaje natural trae resultados con id de artículo", () => {
    const res = buscar("me despidieron sin aviso indemnización", 5, undefined, true);
    expect(res.length).toBeGreaterThan(0);
    for (const r of res) {
      expect(typeof r.articulo_id).toBe("number");
      expect(r.nombre.length).toBeGreaterThan(0);
    }
  });

  it("una consulta sin palabras útiles no revienta (devuelve arreglo)", () => {
    expect(Array.isArray(buscar("de la el por", 5))).toBe(true);
  });
});
