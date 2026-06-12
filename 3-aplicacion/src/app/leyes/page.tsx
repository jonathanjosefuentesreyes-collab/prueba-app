import Link from "next/link";
import { buscar, listarNormas, gruposBiblioteca, nombreDe, numeroReal, MATERIAS } from "@/lib/db";

export const metadata = {
  title: "Biblioteca de leyes chilenas | Ley Chilena",
  description: "Todas las leyes de Chile actualizadas desde la BCN: códigos, leyes y decretos con sus artículos completos y buscables.",
};

export default async function Leyes(props: {
  searchParams: Promise<{ q?: string; materia?: string }>;
}) {
  const { q, materia } = await props.searchParams;
  const consulta = (q || "").trim();
  const materiaActiva = materia && MATERIAS[materia] ? MATERIAS[materia] : null;
  const resultados = consulta ? buscar(consulta, 25) : [];
  const normas = !consulta && materiaActiva ? listarNormas(materiaActiva.ids) : [];
  const grupos = !consulta && !materiaActiva ? gruposBiblioteca() : [];
  const totalNormas = grupos.reduce((s, g) => s + g.normas.length, 0);

  return (
    <main>
      <header className="header">
        <span className="marca">
          <span className="azul">Biblioteca</span> <span className="rojo">de Leyes</span>
        </span>
      </header>

      <form method="GET" action="/leyes" style={{ display: "flex", gap: 8, marginBottom: 14 }}>
        <input className="campo" type="search" name="q" defaultValue={consulta} placeholder="Busca un tema: despido, arriendo, pensión…" aria-label="Buscar en las leyes" />
        <button className="boton" type="submit">Buscar</button>
      </form>

      {!consulta && (
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
          <Link href="/leyes" className="chip" style={!materiaActiva ? { background: "var(--azul)", color: "#fff" } : undefined}>Todas</Link>
          {Object.entries(MATERIAS).map(([clave, m]) => (
            <Link key={clave} href={`/leyes?materia=${clave}`} className="chip" style={materiaActiva === m ? { background: "var(--azul)", color: "#fff" } : undefined}>
              {m.etiqueta}
            </Link>
          ))}
        </div>
      )}

      {consulta ? (
        <>
          <h2 className="seccion-titulo">Resultados para “{consulta}”</h2>
          <div className="lista">
            {resultados.length === 0 && (
              <p className="vacio">No encontramos artículos para esa búsqueda.<br />Prueba con otras palabras o pregúntale a AbogaBot en el chat.</p>
            )}
            {resultados.map((r) => (
              <Link key={r.articulo_id} href={`/leyes/${r.norma_id}?art=${r.articulo_id}`} className="tarjeta">
                <span className="badge azul">{r.nombre}</span>
                <h3>Artículo {numeroReal(r.encabezado)}</h3>
                <p dangerouslySetInnerHTML={{ __html: r.extracto }} />
              </Link>
            ))}
          </div>
        </>
      ) : materiaActiva ? (
        <>
          <h2 className="seccion-titulo">Materia: {materiaActiva.etiqueta}</h2>
          <div className="lista">
            {normas.map((n) => (
              <Link key={n.id} href={`/leyes/${n.id}`} className="tarjeta">
                <span className="badge azul">{n.numero_norma || n.tipo || "Norma"}</span>
                <span className="fecha">{n.total_articulos} artículos</span>
                <h3>{nombreDe(n)}</h3>
                {n.nombre_corto && <p>{n.titulo.length > 90 ? n.titulo.slice(0, 90) + "…" : n.titulo}</p>}
              </Link>
            ))}
          </div>
        </>
      ) : (
        <>
          <h2 className="seccion-titulo">{totalNormas} normas vigentes desde la BCN</h2>
          <div className="lista">
            {grupos.map((g, i) => (
              <details key={g.clave} className="grupo" open={i === 0}>
                <summary>
                  <span>
                    <strong>{g.etiqueta}</strong>
                    <span className="nota">{g.descripcion}</span>
                  </span>
                  <span className="contador">{g.normas.length}</span>
                  <svg className="flecha" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="m6 9 6 6 6-6" /></svg>
                </summary>
                <div className="contenido">
                  {g.normas.slice(0, 40).map((n) => (
                    <Link key={n.id} href={`/leyes/${n.id}`}>
                      <h4>{nombreDe(n)}</h4>
                      <p>{n.numero_norma ? `${n.numero_norma} · ` : ""}{n.total_articulos} artículos · versión {n.fecha_version || "s/i"}</p>
                    </Link>
                  ))}
                  {g.normas.length > 40 && (
                    <p className="nota" style={{ textAlign: "center", padding: "4px 0" }}>
                      …y {g.normas.length - 40} normas más en este grupo — usa el buscador de arriba para encontrarlas.
                    </p>
                  )}
                </div>
              </details>
            ))}
          </div>
        </>
      )}
    </main>
  );
}
