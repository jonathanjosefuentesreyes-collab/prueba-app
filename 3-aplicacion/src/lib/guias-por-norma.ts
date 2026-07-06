import { guias } from "@/lib/guias";

// Enlazado interno triangular (SEO): las guías ya enlazan a los artículos de ley, pero las
// páginas de ley no devolvían el enlace. Este mapa inverso — qué guías citan cada norma —
// se computa UNA vez al cargar el módulo, escaneando los enlaces /leyes/{id} del contenido
// real de cada guía (así nunca se desincroniza de lo que la guía efectivamente cita).
// Las páginas de leyes son las que más autoridad reciben de Google; devolverles el enlace
// hacia las guías reparte esa autoridad hacia las páginas que rankean y monetizan.
const RE_LEY = /\/leyes\/(\d+)/g;

function construir(): Map<number, [string, string][]> {
  const mapa = new Map<number, [string, string][]>();
  for (const g of guias) {
    const texto = [g.contenido, g.respuestaCorta || "", ...(g.faq || []).map((f) => f.respuesta)].join("\n");
    const normas = new Set<number>();
    for (const m of texto.matchAll(RE_LEY)) normas.add(Number(m[1]));
    for (const id of normas) {
      const lista = mapa.get(id) || [];
      lista.push([g.slug, g.titulo]);
      mapa.set(id, lista);
    }
  }
  return mapa;
}

const GUIAS_POR_NORMA = construir();

/** Hasta `max` guías que citan la norma dada (pares [slug, título] para GuiasRelacionadas). */
export function guiasQueCitan(normaId: number, max = 4): [string, string][] {
  return (GUIAS_POR_NORMA.get(normaId) || []).slice(0, max);
}
