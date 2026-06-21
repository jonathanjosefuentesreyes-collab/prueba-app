"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useArrastrarScroll } from "@/lib/useArrastrarScroll";

export interface CardGuia {
  slug: string;
  titulo: string;
  descripcion: string;
  fecha: string;
  categoria?: string;
}

export interface CatExplorer {
  clave: string;
  etiqueta: string;
  emoji: string;
  guias: CardGuia[];
}

export default function GuiasExplorer({
  destacadas,
  categorias,
}: {
  destacadas: CardGuia[];
  categorias: CatExplorer[];
}) {
  const router = useRouter();
  const [activa, setActiva] = useState(categorias[0]?.clave ?? "");
  const carDestacadas = useArrastrarScroll<HTMLDivElement>();
  const carTemas = useArrastrarScroll<HTMLDivElement>();

  // La categoría dorada "Deudas" (Premium) va al CENTRO del carrusel de temas.
  const cats = (() => {
    const dorada = categorias.find((c) => c.clave === "deudas");
    const otras = categorias.filter((c) => c.clave !== "deudas");
    if (!dorada) return categorias;
    const mid = Math.floor((otras.length + 1) / 2);
    return [...otras.slice(0, mid), dorada, ...otras.slice(mid)];
  })();

  return (
    <div>
      {/* Carrusel de guías destacadas (scroll horizontal con snap) */}
      {destacadas.length > 0 && (
        <>
          <h2 className="seccion-titulo-compendio" style={{ margin: "0 0 8px" }}>
            Guías destacadas
          </h2>
          <div
            {...carDestacadas}
            style={{
              display: "flex",
              gap: 12,
              overflowX: "auto",
              scrollSnapType: "x mandatory",
              paddingBottom: 8,
              marginBottom: 22,
              cursor: "grab",
            }}
          >
            {destacadas.map((g) => {
              const oro = g.categoria === "deudas"; // Deudas = guía Premium → cuadro DORADO bloqueado
              return (
                <Link
                  key={g.slug}
                  href={oro ? "/premium" : `/guias/${g.slug}`}
                  style={{
                    scrollSnapAlign: "start",
                    flex: "0 0 82%",
                    maxWidth: 300,
                    textDecoration: "none",
                    background: oro
                      ? "linear-gradient(135deg, #E6C15A 0%, #C9A227 60%, #A9851a 100%)"
                      : "linear-gradient(135deg, var(--azul), var(--azul-oscuro))",
                    color: oro ? "#3d2f06" : "#fff",
                    borderRadius: 14,
                    padding: 16,
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                    boxShadow: oro ? "0 4px 16px rgba(201,162,39,0.45)" : "var(--sombra)",
                    border: oro ? "1.5px solid #f0d97a" : undefined,
                  }}
                >
                  <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: 0.5, opacity: oro ? 1 : 0.85, textTransform: "uppercase" }}>
                    {oro ? "👑 Premium" : "⭐ Destacada"}
                  </span>
                  <span style={{ fontSize: 15.5, fontWeight: 800, lineHeight: 1.3, fontFamily: "var(--font-titulo), serif" }}>
                    {g.titulo}
                  </span>
                  <span style={{ fontSize: 12.5, opacity: oro ? 0.92 : 0.9, lineHeight: 1.45 }}>
                    {g.descripcion.length > 90 ? g.descripcion.slice(0, 90) + "…" : g.descripcion}
                  </span>
                  <span style={{ marginTop: "auto", fontSize: 12.5, fontWeight: 800 }}>
                    {oro ? "🔒 Desbloquea con Premium →" : "Leer guía →"}
                  </span>
                </Link>
              );
            })}
          </div>
        </>
      )}

      {/* Pestañas por macro-grupo */}
      <h2 className="seccion-titulo-compendio" style={{ margin: "0 0 10px" }}>
        Explora por tema
      </h2>
      <div role="tablist" aria-label="Temas de guías" {...carTemas} style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 8, marginBottom: 14, cursor: "grab" }}>
        {cats.map((c) => {
          const sel = c.clave === activa;
          const oro = c.clave === "deudas"; // categoría dorada Premium
          return (
            <button
              key={c.clave}
              role="tab"
              aria-selected={sel}
              onClick={() => setActiva(c.clave)}
              style={{
                flex: "0 0 auto",
                cursor: "pointer",
                border: oro ? "1px solid #C9A227" : sel ? "1px solid var(--azul)" : "1px solid var(--borde)",
                background: oro
                  ? (sel ? "linear-gradient(135deg,#E6C15A,#C9A227)" : "linear-gradient(135deg,#FBF3D0,#EFD98F)")
                  : sel ? "var(--azul)" : "#fff",
                color: oro ? "#5b4708" : sel ? "#fff" : "var(--texto)",
                borderRadius: 20,
                padding: "7px 14px",
                fontSize: 13,
                fontWeight: 700,
                whiteSpace: "nowrap",
                boxShadow: oro ? "0 2px 9px rgba(201,162,39,0.4)" : undefined,
              }}
            >
              {oro ? "👑 " : ""}{c.emoji} {c.etiqueta} ({c.guias.length})
            </button>
          );
        })}
      </div>

      {/* Todas las secciones van al DOM (links crawlables); solo se muestra la activa */}
      {cats.map((c) => {
        const esPremium = c.clave === "deudas";
        return (
          <div
            key={c.clave}
            role="tabpanel"
            style={{ display: c.clave === activa ? "flex" : "none", flexDirection: "column", gap: 10 }}
          >
            {c.guias.map((g) => (
              <div key={g.slug} style={{ position: "relative" }}>
                <article className="tarjeta" style={{ display: "flex", flexDirection: "column", gap: 8, opacity: esPremium ? 0.45 : 1, pointerEvents: esPremium ? "none" : "auto", userSelect: esPremium ? "none" : "auto" }}>
                  <h3 style={{ margin: 0, fontSize: "calc(15.5px * var(--escala-letra, 1))" }}>
                    <Link href={`/guias/${g.slug}`} style={{ color: "var(--azul)", textDecoration: "none", fontWeight: "bold" }}>
                      {g.titulo}
                    </Link>
                  </h3>
                  <p style={{ margin: 0, fontSize: "calc(13px * var(--escala-letra, 1))" }}>{g.descripcion}</p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
                    <span className="nota" style={{ fontSize: 11.5 }}>Actualizado: {g.fecha}</span>
                    <Link href={`/guias/${g.slug}`} className="chip" style={{ background: "var(--azul)", color: "white", padding: "4px 12px", borderRadius: 14, fontSize: 12, fontWeight: "bold" }}>
                      Leer guía →
                    </Link>
                  </div>
                </article>

                {/* Overlay premium: cubre la tarjeta, semiopaco, redirige a /premium */}
                {esPremium && (
                  <button
                    type="button"
                    onClick={() => router.push("/premium")}
                    aria-label="Conoce Premium para acceder a esta guía"
                    style={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: 12,
                      background: "linear-gradient(135deg, rgba(230,193,90,0.95) 0%, rgba(201,162,39,0.96) 55%, rgba(169,133,26,0.96) 100%)",
                      backdropFilter: "blur(2px)",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 6,
                      border: "1.5px solid #f0d97a",
                      boxShadow: "0 2px 12px rgba(201,162,39,0.45)",
                      cursor: "pointer",
                    }}
                  >
                    <span style={{ fontSize: 24 }}>👑</span>
                    <span style={{ color: "#3d2f06", fontWeight: 800, fontSize: 14.5, letterSpacing: 0.3 }}>
                      Guía Premium
                    </span>
                    <span style={{ color: "#5b4708", fontSize: 11.5, fontWeight: 700 }}>
                      🔒 Toca para desbloquear
                    </span>
                  </button>
                )}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}
