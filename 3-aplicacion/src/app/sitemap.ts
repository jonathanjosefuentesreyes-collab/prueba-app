import type { MetadataRoute } from "next";
import { listarNormas } from "@/lib/db";
import { guias } from "@/lib/guias";

const BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://www.leyesdechile.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const fijas: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, changeFrequency: "daily", priority: 1 },
    { url: `${BASE}/leyes`, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE}/guias`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/calculadora`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/facturacion`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/premium`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/quienes-somos`, changeFrequency: "yearly", priority: 0.4 },
    { url: `${BASE}/privacidad`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/aviso-legal`, changeFrequency: "yearly", priority: 0.3 },
  ];
  const paginasGuias: MetadataRoute.Sitemap = guias.map((g) => ({
    url: `${BASE}/guias/${g.slug}`,
    lastModified: new Date(g.fecha + "T12:00:00"),
    changeFrequency: "monthly",
    priority: 0.8,
  }));
  const leyes: MetadataRoute.Sitemap = listarNormas().map((n) => ({
    url: `${BASE}/leyes/${n.id}`,
    lastModified: n.fecha_version ? new Date(n.fecha_version + "T12:00:00") : undefined,
    changeFrequency: "weekly",
    priority: 0.7,
  }));
  return [...fijas, ...paginasGuias, ...leyes];
}
