import type { MetadataRoute } from "next";
import { listarNormas, articulosIndice, slugDeArticulo } from "@/lib/db";
import { guias } from "@/lib/guias";
import { CANONICAL } from "@/lib/canonical";
import { NORMAS_CON_VALOR } from "@/lib/normas-valor";
import simplificaciones from "@/data/simplificaciones.json";

const BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://leyesdechile.com";
const SIMPL = simplificaciones as Record<string, string>;
const LEY_PILOTO = 207436; // ley con páginas por-artículo (Fase 3)

// Devuelve una fecha válida para <lastmod>, o undefined si el dato está vacío o mal formado.
// Algunas fecha_version de la BCN vienen en formato que produce "Invalid Date"; en ese caso
// se omite el lastmod (es opcional) en vez de mandarle a Google una fecha inválida.
function fechaValida(s: string | null | undefined): Date | undefined {
  if (!s) return undefined;
  const d = new Date(s + "T12:00:00");
  return Number.isNaN(d.getTime()) ? undefined : d;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const fijas: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, changeFrequency: "daily", priority: 1 },
    { url: `${BASE}/leyes`, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE}/guias`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/calculadora`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/facturacion`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/sueldo`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/conversor`, changeFrequency: "weekly", priority: 0.6 },
    { url: `${BASE}/premium`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/quienes-somos`, changeFrequency: "yearly", priority: 0.4 },
    { url: `${BASE}/estandar-editorial`, changeFrequency: "yearly", priority: 0.4 },
    { url: `${BASE}/privacidad`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/aviso-legal`, changeFrequency: "yearly", priority: 0.3 },
  ];
  const paginasGuias: MetadataRoute.Sitemap = guias.map((g) => ({
    url: `${BASE}/guias/${g.slug}`,
    lastModified: fechaValida(g.fecha),
    changeFrequency: "monthly",
    priority: 0.8,
  }));
  const leyes: MetadataRoute.Sitemap = listarNormas()
    // Solo leyes con VALOR único (explicación en simple); el texto crudo duplicado va noindex
    // y NO se anuncia en el sitemap. Y los duplicados refundidos tampoco (su canónica ya está).
    .filter((n) => !(n.id in CANONICAL) && NORMAS_CON_VALOR.has(n.id))
    .map((n) => ({
      url: `${BASE}/leyes/${n.id}`,
      lastModified: fechaValida(n.fecha_version),
      changeFrequency: "weekly",
      priority: 0.7,
    }));
  // Páginas por-artículo de la ley piloto (solo las que tienen simplificación = contenido único).
  const paginasArticulos: MetadataRoute.Sitemap = articulosIndice(LEY_PILOTO)
    .filter((a) => SIMPL[String(a.id)])
    .map((a) => ({
      url: `${BASE}/leyes/${LEY_PILOTO}/${slugDeArticulo(a.encabezado)}`,
      changeFrequency: "monthly",
      priority: 0.6,
    }));
  return [...fijas, ...paginasGuias, ...leyes, ...paginasArticulos];
}
