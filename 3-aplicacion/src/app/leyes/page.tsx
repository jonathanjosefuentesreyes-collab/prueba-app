import Link from "next/link";
import { buscar, listarNormas, gruposBiblioteca, nombreDe, numeroReal, MATERIAS } from "@/lib/db";
import BibliotecaHeader from "@/components/BibliotecaHeader";
import ArticuloItem from "@/components/ArticuloItem";

export const metadata = {
  title: "Biblioteca de leyes chilenas | Ley Chilena",
  description: "Todas las leyes de Chile actualizadas desde la BCN: códigos, leyes y decretos con sus artículos completos y buscables.",
};

// Claves alineadas con gruposBiblioteca() en db.ts
const CONFIG_GRUPOS: Record<string, { emoji: string }> = {
  fundamentales: { emoji: "⚖️" },
  laboral: { emoji: "💼" },
  familia: { emoji: "👨‍👩‍👧" },
  civil: { emoji: "🛒" },
  penal: { emoji: "🚔" },
  comercial: { emoji: "🏢" },
  tributario: { emoji: "🧾" },
  estado: { emoji: "🏛️" },
  "dfl-dl": { emoji: "📜" },
  otras: { emoji: "📚" }
};

function obtenerInsignia(n: { nombre_corto: string | null; titulo: string; tipo: string | null; numero_norma: string | null }): string {
  const nom = (n.nombre_corto || n.titulo || "").toLowerCase();
  if (nom.includes("constituci")) return "Constitución";
  if (nom.includes("código") || nom.includes("codigo")) return "Código";
  if (n.tipo) return n.tipo;
  if (n.numero_norma) return n.numero_norma.split(" ")[0];
  return "Norma";
}

export default async function Leyes(props: {
  searchParams: Promise<{ q?: string; materia?: string }>;
}) {
  const { q, materia } = await props.searchParams;
  const consulta = (q || "").trim();
  const materiaActiva = materia && MATERIAS[materia] ? MATERIAS[materia] : null;
  
  // La búsqueda ahora trae texto y transitoriedad gracias a la modificación en db.ts
  const resultados = consulta ? buscar(consulta, 25) : [];
  const normas = !consulta && materiaActiva ? listarNormas(materiaActiva.ids) : [];
  const grupos = !consulta && !materiaActiva ? gruposBiblioteca() : [];

  return (
    <main>
      <BibliotecaHeader activeTab="biblioteca" consulta={consulta} />

      <div style={{ padding: "0 2px" }}>
        {consulta ? (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <h2 className="seccion-titulo-compendio" style={{ margin: 0 }}>
                Resultados para “{consulta}”
              </h2>
              <Link 
                href="/leyes" 
                className="chip" 
                style={{ 
                  background: "var(--azul)", 
                  color: "#fff", 
                  textTransform: "none", 
                  fontSize: "12.5px", 
                  padding: "6px 12px",
                  borderRadius: "20px",
                  fontWeight: "bold"
                }}
              >
                Limpiar
              </Link>
            </div>
            
            <div className="lista" style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {resultados.length === 0 && (
                <p className="vacio">
                  No encontramos artículos para esa búsqueda.<br />
                  Prueba con otras palabras o pregúntale a AbogaBot en el chat.
                </p>
              )}
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
                  showParentLawInfo={true}
                  nombreLey={r.nombre}
                  tituloLey={r.titulo_ley}
                />
              ))}
            </div>
          </>
        ) : materiaActiva ? (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <h2 className="seccion-titulo-compendio" style={{ margin: 0 }}>Materia: {materiaActiva.etiqueta}</h2>
              <Link 
                href="/leyes" 
                className="chip" 
                style={{ 
                  background: "var(--azul)", 
                  color: "#fff", 
                  textTransform: "none", 
                  fontSize: "12.5px", 
                  padding: "6px 12px",
                  borderRadius: "20px",
                  fontWeight: "bold"
                }}
              >
                Volver a grupos
              </Link>
            </div>
            <div className="lista" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {normas.slice(0, 100).map((n) => (
                <Link 
                  key={n.id} 
                  href={`/leyes/${n.id}`} 
                  className="item-ley-compendio"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "12px",
                    textDecoration: "none",
                    backgroundColor: "#ffffff",
                    border: "1px solid var(--borde)",
                    borderRadius: "12px",
                    transition: "all 0.15s ease",
                    boxShadow: "var(--sombra)"
                  }}
                >
                  <div style={{
                    backgroundColor: "#0038A8",
                    color: "#ffffff",
                    borderRadius: "8px",
                    padding: "6px 8px",
                    fontSize: "calc(10.5px * var(--escala-letra, 1))",
                    fontWeight: "bold",
                    textAlign: "center",
                    minWidth: "75px",
                    flexShrink: 0
                  }}>
                    {obtenerInsignia(n).toUpperCase()}
                  </div>
                  
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "2px", minWidth: 0 }}>
                    <h4 style={{ margin: 0, fontSize: "calc(13.5px * var(--escala-letra, 1))", color: "#1e293b", fontWeight: "bold", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {nombreDe(n)}
                    </h4>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
                      <span style={{ fontSize: "calc(11px * var(--escala-letra, 1))", color: "#D52B1E", fontWeight: "bold" }}>
                        {n.numero_norma || n.tipo || "Norma"}
                      </span>
                      <span style={{ fontSize: "calc(11px * var(--escala-letra, 1))", color: "#64748B" }}>
                        • Año {n.fecha_version ? n.fecha_version.split("-")[0] : "s/i"}
                      </span>
                      <span style={{ fontSize: "calc(11px * var(--escala-letra, 1))", color: "#64748B" }}>
                        • {n.total_articulos} arts.
                      </span>
                    </div>
                  </div>

                  <svg style={{ color: "#94a3b8", flexShrink: 0 }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
              ))}
              {normas.length > 100 && (
                <p className="tarjeta" style={{ textAlign: "center", color: "#666", background: "none", border: "1px dashed #ccc" }}>
                  Mostrando 100 de {normas.length} normas. Por favor, usa el buscador superior para encontrar leyes específicas.
                </p>
              )}
            </div>
          </>
        ) : (
          <>
            <h2 className="seccion-titulo-compendio">Grupos de Leyes Chilenas</h2>
            <p className="seccion-subtitulo-compendio">Seleccione una categoría para desplegar la lista de leyes importantes.</p>
            
            <div className="lista-compendio">
              {grupos.map((g) => {
                const configGrupo = CONFIG_GRUPOS[g.clave] || CONFIG_GRUPOS.otras;
                return (
                  <details key={g.clave} className="grupo-compendio">
                    <summary className="summary-compendio">
                      <div 
                        className="icono-circulo-compendio"
                        style={{
                          background: "radial-gradient(circle, #eff6ff 0%, #dbeafe 100%)",
                          borderRadius: "50%",
                          width: "48px",
                          height: "48px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0
                        }}
                      >
                        <span style={{ fontSize: "24px" }}>{configGrupo.emoji}</span>
                      </div>
                      <div className="info-compendio">
                        <strong className="titulo-grupo-compendio">{g.etiqueta}</strong>
                        <span className="nota-grupo-compendio">{g.descripcion}</span>
                      </div>
                      <svg className="flecha-compendio" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </summary>
                    <div className="contenido-compendio" style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      {g.normas.slice(0, 25).map((n) => (
                        <Link 
                          key={n.id} 
                          href={`/leyes/${n.id}`} 
                          className="item-ley-compendio"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                            padding: "12px",
                            textDecoration: "none",
                            backgroundColor: "#ffffff",
                            border: "1px solid var(--borde)",
                            borderRadius: "12px",
                            transition: "all 0.15s ease",
                            boxShadow: "var(--sombra)"
                          }}
                        >
                          <div style={{
                            backgroundColor: "#0038A8",
                            color: "#ffffff",
                            borderRadius: "8px",
                            padding: "6px 8px",
                            fontSize: "calc(10.5px * var(--escala-letra, 1))",
                            fontWeight: "bold",
                            textAlign: "center",
                            minWidth: "75px",
                            flexShrink: 0
                          }}>
                            {obtenerInsignia(n).toUpperCase()}
                          </div>
                          
                          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "2px", minWidth: 0 }}>
                            <h4 style={{ margin: 0, fontSize: "calc(13.5px * var(--escala-letra, 1))", color: "#1e293b", fontWeight: "bold", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                              {nombreDe(n)}
                            </h4>
                            <div style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
                              <span style={{ fontSize: "calc(11px * var(--escala-letra, 1))", color: "#D52B1E", fontWeight: "bold" }}>
                                {n.numero_norma || n.tipo || "Norma"}
                              </span>
                              <span style={{ fontSize: "calc(11px * var(--escala-letra, 1))", color: "#64748B" }}>
                                • Año {n.fecha_version ? n.fecha_version.split("-")[0] : "s/i"}
                              </span>
                              <span style={{ fontSize: "calc(11px * var(--escala-letra, 1))", color: "#64748B" }}>
                                • {n.total_articulos} arts.
                              </span>
                            </div>
                          </div>

                          <svg style={{ color: "#94a3b8", flexShrink: 0 }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                          </svg>
                        </Link>
                      ))}
                      {g.normas.length > 25 && (
                        <p style={{ padding: "1rem", color: "#666", fontSize: "0.9rem", textAlign: "center", fontStyle: "italic" }}>
                          Mostrando 25 de {g.normas.length.toLocaleString("es-CL")} normas en este grupo. Usa el buscador superior para encontrar más.
                        </p>
                      )}
                    </div>
                  </details>
                );
              })}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
