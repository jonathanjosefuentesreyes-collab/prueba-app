import { describe, it, expect } from "vitest";
import { existsSync } from "node:fs";
import path from "node:path";

// Regresión del sitemap: Search Console marcó 9.852 "fecha no válida" (2026-06) por
// lastmod mal formados, y luego 9 más por fechas anteriores a 1970 (leyes del siglo XIX:
// Google rechaza todo lastmod pre-epoch). También cubre la dieta de URLs: solo páginas
// con valor único (~890), nunca las ~20.000 de texto crudo que causaron el rechazo de
// AdSense por "contenido de bajo valor". Requiere la base (en CI se descomprime antes).
const dbExiste = existsSync(path.join(process.cwd(), "data", "leyes.db"));

describe.skipIf(!dbExiste)("sitemap — URLs de valor y fechas que Google acepta", () => {
  it("genera solo páginas de valor (miles con explicación, no las 20 mil de texto crudo)", async () => {
    const { default: sitemap } = await import("../app/sitemap");
    const filas = sitemap();
    expect(filas.length).toBeGreaterThan(500);
    // Tope: guías + leyes con valor + páginas por-artículo de los códigos de la Fase 4.
    // Si algún día se acerca a las ~20.000 (todas las normas crudas), volvió la dieta rota.
    expect(filas.length).toBeLessThan(12000);
  });

  it("todas las URLs son absolutas y sin duplicados", async () => {
    const { default: sitemap } = await import("../app/sitemap");
    const urls = sitemap().map((f) => f.url);
    expect(urls.every((u) => u.startsWith("http"))).toBe(true);
    expect(new Set(urls).size).toBe(urls.length);
  });

  it("ningún lastmod es inválido ni anterior a 1970 (Google los rechaza)", async () => {
    const { default: sitemap } = await import("../app/sitemap");
    const malas = sitemap()
      .filter((f) => f.lastModified !== undefined)
      .map((f) => new Date(f.lastModified as Date))
      .filter((d) => Number.isNaN(d.getTime()) || d.getFullYear() < 1970);
    expect(malas).toEqual([]);
  });
});
