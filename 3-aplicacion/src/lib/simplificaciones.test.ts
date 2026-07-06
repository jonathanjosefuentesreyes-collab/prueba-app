import { describe, it, expect } from "vitest";
import { existsSync } from "node:fs";
import path from "node:path";
import simplificaciones from "@/data/simplificaciones.json";

// Guardián del corpus de explicaciones en simple (lo alimentan lotes de Antigravity y
// correcciones de QA). Es contenido YMYL que se sirve tal cual en el HTML del servidor:
// una entrada corrupta (markdown crudo, saludos de chatbot, id inexistente) se publica
// directo a Google. Estos tests validan TODO el corpus en cada corrida, para que un lote
// defectuoso rompa el CI antes de llegar a producción.
const ENTRADAS = Object.entries(simplificaciones as Record<string, string>);

describe("simplificaciones.json — integridad del corpus completo", () => {
  it("tiene un volumen razonable (miles de entradas, no se vació por accidente)", () => {
    expect(ENTRADAS.length).toBeGreaterThan(3000);
  });

  it("todas las llaves son ids numéricos positivos", () => {
    const malas = ENTRADAS.filter(([k]) => !/^[1-9]\d*$/.test(k)).map(([k]) => k);
    expect(malas).toEqual([]);
  });

  it("todos los textos respetan el largo del pipeline (15–700 caracteres)", () => {
    const fuera = ENTRADAS.filter(([, v]) => {
      const l = String(v).trim().length;
      return l < 15 || l > 700;
    }).map(([k]) => k);
    expect(fuera).toEqual([]);
  });

  it("ningún texto trae markdown crudo (negritas, títulos, listas, código)", () => {
    const conMarkdown = ENTRADAS.filter(([, v]) => /\*\*|##|```|\n- |\n\d+\.\s/.test(String(v))).map(([k]) => k);
    expect(conMarkdown).toEqual([]);
  });

  it("ningún texto abre con saludos o muletillas de chatbot", () => {
    const re = /^\s*(¡?hola|claro[,:]|por supuesto|aquí tienes|espero que|como (ia|modelo))/i;
    const conSaludo = ENTRADAS.filter(([, v]) => re.test(String(v))).map(([k]) => k);
    expect(conSaludo).toEqual([]);
  });

  it("ningún texto trae etiquetas HTML", () => {
    const conHtml = ENTRADAS.filter(([, v]) => /<\/?[a-z]+[\s>]/i.test(String(v))).map(([k]) => k);
    expect(conHtml).toEqual([]);
  });
});

// Contra la base oficial: cada id debe ser un artículo REAL (candado anti-invención,
// regla dura #3). Se salta si la base no está presente; en CI se descomprime antes.
const dbExiste = existsSync(path.join(process.cwd(), "data", "leyes.db"));

describe.skipIf(!dbExiste)("simplificaciones.json — cada id existe en la base oficial", () => {
  it("no hay ids huérfanos (apuntando a artículos inexistentes)", async () => {
    const { default: Database } = await import("better-sqlite3");
    const db = new Database(path.join(process.cwd(), "data", "leyes.db"), { readonly: true });
    const ids = ENTRADAS.map(([k]) => Number(k));
    const existentes = new Set(
      (db.prepare("SELECT id FROM articulos WHERE id IN (SELECT value FROM json_each(?))")
        .all(JSON.stringify(ids)) as { id: number }[]).map((r) => r.id)
    );
    db.close();
    const huerfanos = ids.filter((id) => !existentes.has(id));
    expect(huerfanos).toEqual([]);
  });
});
