import { notFound } from "next/navigation";
import Link from "next/link";
import {
  obtenerNorma, articulosIndice, articuloPorId, slugDeArticulo, nombreDe, numeroReal,
} from "@/lib/db";
import simplificaciones from "@/data/simplificaciones.json";
import { jsonLdSafe } from "@/lib/jsonld";

const BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://leyesdechile.com";
const SIMPL = simplificaciones as Record<string, string>;

// Ley PILOTO del motor de páginas por-artículo (Fase 3): Código del Trabajo. Ya tiene
// simplificaciones pre-generadas, así que cada página tiene contenido único (la explicación
// en simple), no solo el texto legal crudo. Tras medir en Search Console se escala (Fase 4).
const LEY_PILOTO = 207436;

export function generateStaticParams() {
  // Solo los artículos CON simplificación: páginas con valor único, evita texto legal
  // duplicado (que ya vive en /leyes/{id}). Las demás se sirven on-demand si se enlazan.
  return articulosIndice(LEY_PILOTO)
    .filter((a) => SIMPL[String(a.id)])
    .map((a) => ({ id: String(LEY_PILOTO), articulo: slugDeArticulo(a.encabezado) }));
}

function resolver(idStr: string, slug: string) {
  const norma = obtenerNorma(Number(idStr));
  if (!norma) return null;
  const arts = articulosIndice(norma.id);
  const idx = arts.findIndex((a) => slugDeArticulo(a.encabezado) === slug);
  if (idx < 0) return null;
  return { norma, arts, idx };
}

export async function generateMetadata(props: { params: Promise<{ id: string; articulo: string }> }) {
  const { id, articulo } = await props.params;
  const r = resolver(id, articulo);
  if (!r) return { title: "Artículo no encontrado | Leyes de Chile", robots: { index: false, follow: true } };
  const a = r.arts[r.idx];
  const num = numeroReal(a.encabezado);
  const nombre = nombreDe(r.norma);
  const url = `${BASE}/leyes/${r.norma.id}/${articulo}`;
  const simpl = SIMPL[String(a.id)];
  return {
    title: `Artículo ${num} de ${nombre}: qué dice y qué significa`.slice(0, 65),
    description: (simpl || `Texto oficial y explicación en simple del artículo ${num} de ${nombre}.`).slice(0, 155),
    alternates: { canonical: url },
    openGraph: {
      title: `Artículo ${num} — ${nombre}`,
      description: (simpl || `Artículo ${num} de ${nombre}, explicado en simple.`).slice(0, 155),
      url, type: "article", siteName: "Leyes de Chile",
    },
    // Solo se indexa el artículo si tiene explicación en simple (contenido único). Sin ella es
    // texto legal crudo duplicado de la BCN → noindex, igual que las leyes en /leyes/[id].
    robots: { index: Boolean(simpl), follow: true },
  };
}

export default async function ArticuloPagina(props: { params: Promise<{ id: string; articulo: string }> }) {
  const { id, articulo } = await props.params;
  const r = resolver(id, articulo);
  if (!r) notFound();
  const { norma, arts, idx } = r;
  const full = articuloPorId(arts[idx].id);
  if (!full) notFound();

  const num = numeroReal(full.encabezado);
  const nombre = nombreDe(norma);
  const simpl = SIMPL[String(full.id)];
  const urlLey = `${BASE}/leyes/${norma.id}`;
  const url = `${urlLey}/${articulo}`;
  // Relacionados: artículos vecinos por orden (contexto + enlazado interno).
  const relacionados = [arts[idx - 2], arts[idx - 1], arts[idx + 1], arts[idx + 2]].filter(Boolean);
  const preguntaChat = `AbogaBot, explícame en simple el artículo ${num} de ${nombre} y dime qué hacer.`;

  // JSON-LD: el artículo como Legislation, parte de su ley, con la explicación simple.
  const ld = {
    "@context": "https://schema.org",
    "@type": "Legislation",
    name: `${nombre}, Artículo ${num}`,
    legislationJurisdiction: "Chile",
    inLanguage: "es-CL",
    isPartOf: { "@type": "Legislation", name: nombre, "@id": urlLey },
    url,
    ...(simpl ? { description: simpl } : {}),
    isAccessibleForFree: true,
  };
  const ldBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: `${BASE}/` },
      { "@type": "ListItem", position: 2, name: "Leyes", item: `${BASE}/leyes` },
      { "@type": "ListItem", position: 3, name: nombre, item: urlLey },
      { "@type": "ListItem", position: 4, name: `Artículo ${num}`, item: url },
    ],
  };

  return (
    <main style={{ paddingBottom: 80 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdSafe(ld) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdSafe(ldBreadcrumb) }} />

      <header className="header" style={{ justifyContent: "flex-start", gap: 12 }}>
        <Link href={`/leyes/${norma.id}?art=${full.id}`} aria-label={`Volver a ${nombre}`} style={{ display: "flex" }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M15 18l-6-6 6-6" /></svg>
        </Link>
        <span className="marca" style={{ fontSize: 16 }}>Artículo {num}</span>
      </header>

      <nav className="migas" aria-label="Ruta de navegación">
        <Link href="/">Inicio</Link>
        <span aria-hidden>›</span>
        <Link href="/leyes">Leyes</Link>
        <span aria-hidden>›</span>
        <Link href={`/leyes/${norma.id}`}>{nombre}</Link>
        <span aria-hidden>›</span>
        <span className="migas-actual">Artículo {num}</span>
      </nav>

      <article className="tarjeta" style={{ marginBottom: 14 }}>
        <h1 style={{ fontSize: "calc(20px * var(--escala-letra, 1))", margin: "0 0 6px", color: "var(--azul)", lineHeight: 1.3, fontFamily: "var(--font-titulo), serif" }}>
          Artículo {num} — {nombre}
        </h1>
        <p className="nota" style={{ margin: 0 }}>Qué dice y qué significa, en simple. Texto oficial de la BCN.</p>
      </article>

      {simpl && (
        <div className="tarjeta" style={{ marginBottom: 14, background: "#eef4ff", borderLeft: "4px solid var(--azul)" }}>
          <div className="etiqueta-explicacion" style={{ marginBottom: 6 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            <span>Qué significa (en simple):</span>
          </div>
          <p style={{ margin: 0, fontSize: "calc(14.5px * var(--escala-letra, 1))", lineHeight: 1.6 }}>{simpl}</p>
        </div>
      )}

      <div className="tarjeta" style={{ marginBottom: 14 }}>
        <h2 style={{ fontSize: 15, margin: "0 0 8px", color: "var(--texto-suave)" }}>Texto oficial</h2>
        <p style={{ margin: 0, fontSize: "calc(14.5px * var(--escala-letra, 1))", lineHeight: 1.65, color: "var(--texto)", whiteSpace: "pre-wrap" }}>
          {full.texto}
        </p>
        {norma.url && (
          <p className="nota" style={{ marginTop: 10 }}>
            Fuente: <a href={norma.url} target="_blank" rel="noopener noreferrer" style={{ color: "var(--azul)", fontWeight: 600 }}>BCN / LeyChile ↗</a>
          </p>
        )}
      </div>

      <Link className="boton" style={{ width: "100%", marginBottom: 14 }} href={`/chat?q=${encodeURIComponent(preguntaChat)}`}>
        Preguntar a AbogaBot sobre este artículo →
      </Link>

      {relacionados.length > 0 && (
        <div className="tarjeta">
          <h2 style={{ fontSize: 15, margin: "0 0 8px" }}>Artículos relacionados</h2>
          <div className="lista" style={{ gap: 6 }}>
            {relacionados.map((a) => (
              <Link key={a.id} href={`/leyes/${norma.id}/${slugDeArticulo(a.encabezado)}`} className="chip" style={{ padding: "8px 12px", justifyContent: "flex-start" }}>
                Artículo {numeroReal(a.encabezado)}
              </Link>
            ))}
          </div>
          <p className="nota" style={{ marginTop: 10 }}>
            <Link href={`/leyes/${norma.id}`} style={{ color: "var(--azul)", fontWeight: 600 }}>Ver toda la ley: {nombre} →</Link>
          </p>
        </div>
      )}
    </main>
  );
}
