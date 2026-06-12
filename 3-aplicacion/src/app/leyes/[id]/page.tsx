import Link from "next/link";
import { notFound } from "next/navigation";
import {
  obtenerNorma, articulosDeNorma, paginaDeArticulo, buscar,
  nombreDe, numeroReal, POR_PAGINA,
} from "@/lib/db";
import GuardarBtn from "@/components/GuardarBtn";

export async function generateMetadata(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const norma = obtenerNorma(Number(id));
  if (!norma) return { title: "Ley no encontrada | Ley Chilena" };
  return {
    title: `${nombreDe(norma)}: texto completo y actualizado | Ley Chilena`,
    description: norma.titulo.slice(0, 155),
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

  return (
    <main>
      <header className="header" style={{ justifyContent: "flex-start", gap: 12 }}>
        <Link href="/leyes" aria-label="Volver a la biblioteca" style={{ display: "flex" }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M15 18l-6-6 6-6" /></svg>
        </Link>
        <span style={{ fontWeight: 800, fontSize: 16, lineHeight: 1.2 }}>{nombreDe(norma)}</span>
      </header>

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
            <Link key={r.articulo_id} href={`/leyes/${norma.id}?art=${r.articulo_id}#a${r.articulo_id}`} className="tarjeta">
              <h3 style={{ margin: 0, color: "var(--azul)", fontSize: 15 }}>Artículo {numeroReal(r.encabezado)}</h3>
              <p dangerouslySetInnerHTML={{ __html: r.extracto }} />
            </Link>
          ))}
        </div>
      ) : (
        <>
          <div className="lista">
            {articulos.map((a) => (
              <article key={a.id} id={`a${a.id}`} className={`articulo${a.id === artDestacado ? " destacado" : ""}`}>
                <h3>
                  Artículo {numeroReal(a.encabezado)}
                  {a.transitorio ? <span className="badge" style={{ marginLeft: 8 }}>transitorio</span> : null}
                </h3>
                <p>{a.texto}</p>
              </article>
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
