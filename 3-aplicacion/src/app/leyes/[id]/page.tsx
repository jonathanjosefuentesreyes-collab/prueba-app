import Link from "next/link";
import { notFound } from "next/navigation";
import {
  obtenerNorma, articulosDeNorma, paginaDeArticulo, buscar,
  nombreDe, numeroReal, POR_PAGINA,
} from "@/lib/db";
import GuardarBtn from "@/components/GuardarBtn";
import AccessibilityBar from "@/components/AccessibilityBar";
import ArticuloItem from "@/components/ArticuloItem";

const BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://www.leyesdechile.com";

export async function generateMetadata(props: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ pagina?: string; art?: string; q?: string }>;
}) {
  const { id } = await props.params;
  const { pagina: pg } = await props.searchParams;
  const norma = obtenerNorma(Number(id));
  if (!norma) return { title: "Ley no encontrada | Ley Chilena", robots: { index: false, follow: true } };
  const nombre = nombreDe(norma);
  const nombreCorto = nombre.length > 56 ? nombre.slice(0, 53).trimEnd() + "…" : nombre;
  const pagNum = Math.max(1, Number(pg) || 1);
  // Canonical: la página limpia (o con ?pagina para que indexen todos los artículos);
  // ?q y ?art son vistas de la misma ley → no generan URL canónica propia.
  const canonical = pagNum > 1 ? `${BASE}/leyes/${norma.id}?pagina=${pagNum}` : `${BASE}/leyes/${norma.id}`;
  const desc = `${nombre}: ${norma.total_articulos} artículos. Texto oficial actualizado de la BCN${norma.fecha_version ? ` (versión ${norma.fecha_version})` : ""}. Léelo en simple y consulta gratis a AbogaBot.`.slice(0, 155);
  return {
    title: `${nombreCorto} — texto actualizado | Ley Chilena`,
    description: desc,
    alternates: { canonical },
    openGraph: { title: `${nombre} | Ley Chilena`, description: desc, url: canonical, type: "article", siteName: "Ley Chilena" },
    robots: { index: true, follow: true },
  };
}

export default async function Norma(props: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ pagina?: string; q?: string; art?: string }>;
}) {
  const { id } = await props.params;
  const { pagina: pg, q, art } = await props.searchParams;
  const norma = obtenerNorma(Number(id));
  if (!norma) notFound();

  const consulta = (q || "").trim();
  const artDestacado = art ? Number(art) : null;
  const pagina = artDestacado
    ? paginaDeArticulo(norma.id, artDestacado)
    : Math.max(1, Number(pg) || 1);
  const totalPaginas = Math.max(1, Math.ceil((norma.total_articulos || 0) / POR_PAGINA));
  const articulos = consulta ? [] : articulosDeNorma(norma.id, pagina);
  const resultados = consulta ? buscar(consulta, 20, norma.id) : [];

  const nombre = nombreDe(norma);
  const urlLey = `${BASE}/leyes/${norma.id}`;
  // Datos estructurados: ayudan a Google a entender que esto es legislación chilena
  // oficial y a mostrar resultados enriquecidos (Legislation + BreadcrumbList).
  const ldLegislacion = {
    "@context": "https://schema.org",
    "@type": "Legislation",
    name: nombre,
    ...(norma.numero_norma ? { legislationIdentifier: norma.numero_norma } : {}),
    legislationType: norma.tipo || "Ley",
    legislationJurisdiction: "Chile",
    inLanguage: "es-CL",
    ...(norma.fecha_version ? { datePublished: norma.fecha_version } : {}),
    url: urlLey,
    ...(norma.url ? { sameAs: norma.url } : {}),
    publisher: { "@type": "GovernmentOrganization", name: "Biblioteca del Congreso Nacional de Chile" },
    isAccessibleForFree: true,
  };
  const ldBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: `${BASE}/` },
      { "@type": "ListItem", position: 2, name: "Leyes", item: `${BASE}/leyes` },
      { "@type": "ListItem", position: 3, name: nombre, item: urlLey },
    ],
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ldLegislacion) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ldBreadcrumb) }} />
      <header className="header" style={{ justifyContent: "flex-start", gap: 12 }}>
        <Link href="/leyes" aria-label="Volver a la biblioteca" style={{ display: "flex" }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M15 18l-6-6 6-6" /></svg>
        </Link>
        <h1 style={{ fontWeight: 800, fontSize: 16, lineHeight: 1.2, margin: 0 }}>{nombre}</h1>
      </header>

      {/* Migas de pan (institucional + refuerza el BreadcrumbList) */}
      <nav className="migas" aria-label="Ruta de navegación">
        <Link href="/">Inicio</Link>
        <span aria-hidden>›</span>
        <Link href="/leyes">Leyes</Link>
        <span aria-hidden>›</span>
        <span className="migas-actual">{nombre}</span>
      </nav>

      <AccessibilityBar />

      <div className="tarjeta" style={{ marginBottom: 14 }}>
        <p style={{ fontSize: 13.5 }}>{norma.titulo}</p>
        <p className="nota" style={{ margin: "8px 0 10px" }}>
          {norma.numero_norma ? `${norma.numero_norma} · ` : ""}{norma.total_articulos} artículos ·
          Versión BCN: {norma.fecha_version || "s/i"}
          {norma.url && <> · <a href={norma.url} style={{ color: "var(--azul)", fontWeight: 600 }} target="_blank" rel="noopener noreferrer">Ver en LeyChile ↗</a></>}
        </p>
        <GuardarBtn id={norma.id} nombre={nombreDe(norma)} />
      </div>

      <form method="GET" action={`/leyes/${norma.id}`} style={{ display: "flex", gap: 8, marginBottom: 14 }}>
        <input className="campo" type="search" name="q" defaultValue={consulta} placeholder={`Buscar dentro de ${nombreDe(norma)}…`} aria-label="Buscar en esta ley" />
        <button className="boton" type="submit">Buscar</button>
      </form>

      {consulta ? (
        <div className="lista">
          {resultados.length === 0 && <p className="vacio">Sin resultados dentro de esta ley.</p>}
          {resultados.map((r) => (
            <ArticuloItem
              key={r.articulo_id}
              articulo={{
                id: r.articulo_id,
                norma_id: r.norma_id,
                orden: 0,
                encabezado: r.encabezado,
                texto: r.texto || "",
                transitorio: r.transitorio || 0
              }}
              destacado={r.articulo_id === artDestacado}
              showParentLawInfo={false}
              nombreLey={nombreDe(norma)}
              tituloLey={norma.titulo}
            />
          ))}
        </div>
      ) : (
        <>
          <div className="lista">
            {articulos.map((a) => (
              <ArticuloItem
                key={a.id}
                articulo={a}
                destacado={a.id === artDestacado}
                showParentLawInfo={false}
                nombreLey={nombreDe(norma)}
                tituloLey={norma.titulo}
              />
            ))}
          </div>
          {totalPaginas > 1 && (
            <div className="paginacion">
              {pagina > 1 ? (
                <Link className="boton secundario" href={`/leyes/${norma.id}?pagina=${pagina - 1}`}>← Anterior</Link>
              ) : <span />}
              <span className="nota">Página {pagina} de {totalPaginas}</span>
              {pagina < totalPaginas ? (
                <Link className="boton secundario" href={`/leyes/${norma.id}?pagina=${pagina + 1}`}>Siguiente →</Link>
              ) : <span />}
            </div>
          )}
        </>
      )}
    </main>
  );
}
