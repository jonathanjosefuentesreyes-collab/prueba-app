"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export interface CardGuia {
  slug: string;
  titulo: string;
  descripcion: string;
  fecha: string;
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
            style={{
              display: "flex",
              gap: 12,
              overflowX: "auto",
              scrollSnapType: "x mandatory",
              paddingBottom: 8,
              marginBottom: 22,
            }}
          >
            {destacadas.map((g) => (
              <Link
                key={g.slug}
                href={`/guias/${g.slug}`}
                style={{
                  scrollSnapAlign: "start",
                  flex: "0 0 82%",
                  maxWidth: 300,
                  textDecoration: "none",
                  background: "linear-gradient(135deg, var(--azul), var(--azul-oscuro))",
                  color: "#fff",
                  borderRadius: 14,
                  padding: 16,
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  boxShadow: "var(--sombra)",
                }}
              >
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.5, opacity: 0.85, textTransform: "uppercase" }}>
                  ⭐ Destacada
                </span>
                <span style={{ fontSize: 15.5, fontWeight: 800, lineHeight: 1.3, fontFamily: "var(--font-titulo), serif" }}>
                  {g.titulo}
                </span>
                <span style={{ fontSize: 12.5, opacity: 0.9, lineHeight: 1.45 }}>
                  {g.descripcion.length > 90 ? g.descripcion.slice(0, 90) + "…" : g.descripcion}
                </span>
                <span style={{ marginTop: "auto", fontSize: 12.5, fontWeight: 700 }}>Leer guía →</span>
              </Link>
            ))}
          </div>
        </>
      )}

      {/* Pestañas por macro-grupo */}
      <h2 className="seccion-titulo-compendio" style={{ margin: "0 0 10px" }}>
        Explora por tema
      </h2>
      <div role="tablist" aria-label="Temas de guías" style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 8, marginBottom: 14 }}>
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
                      borderRadius: "var(--radio-tarjeta, 12px)",
                      background: "rgba(10, 30, 80, 0.62)",
                      backdropFilter: "blur(2px)",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                      border: "1.5px solid #C9A227",
                      cursor: "pointer",
                    }}
                  >
                    <span style={{ fontSize: 22 }}>👑</span>
                    <span style={{ color: "#FFE27A", fontWeight: 800, fontSize: 14, letterSpacing: 0.3, textShadow: "0 1px 4px rgba(0,0,0,0.6)" }}>
                      Conoce Premium
                    </span>
                    <span style={{ color: "rgba(255,255,255,0.82)", fontSize: 11.5, fontWeight: 600 }}>
                      Toca para desbloquear
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
