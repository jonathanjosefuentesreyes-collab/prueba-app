import simplificaciones from "@/data/simplificaciones.json";
import { normasConSimplificacion } from "@/lib/db";

const SIMPL = simplificaciones as Record<string, string>;

// Normas con VALOR ÚNICO = las que tienen al menos una explicación en lenguaje simple.
// SOLO esas se indexan en Google y entran al sitemap. Las ~20.000 restantes son texto legal
// CRUDO (duplicado de la BCN/leychile.cl), así que van NOINDEX: el sitio se debe evaluar por
// su contenido ORIGINAL (guías + leyes explicadas), no por el volumen de texto republicado
// —que es justo lo que AdSense marcó como "contenido de bajo valor" y lo que Google penaliza
// como "scaled content". Es reversible: a medida que se generan más simplificaciones, más
// normas entran al índice. Se computa UNA sola vez al cargar el módulo.
export const NORMAS_CON_VALOR: Set<number> = normasConSimplificacion(
  Object.keys(SIMPL)
    .map(Number)
    .filter((n) => Number.isFinite(n) && n > 0)
);
