import { describe, it, expect } from "vitest";
import { existsSync } from "node:fs";
import path from "node:path";
import { guias, CATEGORIAS, type CategoriaGuia } from "./guias";
import { articuloPorId, obtenerNorma } from "./db";

// Las guías son el contenido SEO (lo que Google indexa y monetiza) y su diferenciador
// son las CITAS LEGALES VERIFICABLES. Estos tests protegen ambas cosas: integridad
// estructural (sin slugs duplicados ni campos faltantes) y, contra la base real, que
// cada enlace a un artículo EXISTA y pertenezca a la ley citada (anti-invención).

describe("guías — integridad estructural", () => {
  it("hay una cantidad razonable de guías", () => {
    expect(guias.length).toBeGreaterThanOrEqual(70);
  });

  it("no hay slugs duplicados", () => {
    const slugs = guias.map((g) => g.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("todos los slugs son kebab-case no vacíos", () => {
    for (const g of guias) {
      expect(g.slug, JSON.stringify(g.slug)).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    }
  });

  it("cada guía tiene título, descripción, contenido y fecha", () => {
    for (const g of guias) {
      expect(g.titulo?.trim().length, g.slug).toBeGreaterThan(0);
      expect(g.descripcion?.trim().length, g.slug).toBeGreaterThan(0);
      expect(g.contenido?.trim().length, g.slug).toBeGreaterThan(0);
      expect(g.fecha, g.slug).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });

  it("cada guía pertenece a una categoría declarada en CATEGORIAS", () => {
    for (const g of guias) {
      expect(Object.keys(CATEGORIAS), g.slug).toContain(g.categoria);
    }
  });

  it("cada categoría declarada tiene al menos una guía", () => {
    for (const cat of Object.keys(CATEGORIAS) as CategoriaGuia[]) {
      expect(guias.some((g) => g.categoria === cat), cat).toBe(true);
    }
  });
});

// Citas: contra la base oficial. Se salta si la base no está (en CI se descomprime).
const dbExiste = existsSync(path.join(process.cwd(), "data", "leyes.db"));

describe.skipIf(!dbExiste)("guías — las citas legales enlazadas son reales", () => {
  // Extrae todos los enlaces internos /leyes/NORMA(?art=ARTICULO) del texto de las guías.
  const refs: { slug: string; normaId: number; artId: number | null }[] = [];
  for (const g of guias) {
    const texto = `${g.respuestaCorta || ""}\n${g.contenido}`;
    for (const m of texto.matchAll(/\/leyes\/(\d+)(?:\?art=(\d+))?/g)) {
      refs.push({ slug: g.slug, normaId: Number(m[1]), artId: m[2] ? Number(m[2]) : null });
    }
  }

  it("hay enlaces a la Biblioteca que verificar", () => {
    expect(refs.length).toBeGreaterThan(0);
  });

  it("cada enlace a una LEY apunta a una norma existente", () => {
    for (const r of refs) {
      expect(obtenerNorma(r.normaId), `${r.slug} → /leyes/${r.normaId}`).toBeDefined();
    }
  });

  it("cada enlace a un ARTÍCULO existe y pertenece a la ley citada (no inventado)", () => {
    for (const r of refs) {
      if (r.artId === null) continue;
      const art = articuloPorId(r.artId);
      expect(art, `${r.slug} → art ${r.artId} no existe`).toBeDefined();
      expect(art!.norma_id, `${r.slug}: art ${r.artId} no pertenece a la ley ${r.normaId}`).toBe(r.normaId);
    }
  });
});
