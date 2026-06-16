"use client";

import { useEffect, useState } from "react";

interface GuiaGuardada { slug: string; titulo: string; fecha: string; }

function leer(): GuiaGuardada[] {
  try { return JSON.parse(localStorage.getItem("guias_guardadas") || "[]"); } catch { return []; }
}

// Guarda/quita una guía en localStorage (clave "guias_guardadas"), igual que el guardar
// de leyes. Las guías guardadas se ven en la pestaña ❤️ Guardadas de la Biblioteca.
export default function GuardarGuiaBtn({ slug, titulo }: { slug: string; titulo: string }) {
  const [guardada, setGuardada] = useState(false);

  useEffect(() => { setGuardada(leer().some((g) => g.slug === slug)); }, [slug]);

  function alternar() {
    const lista = leer();
    const nueva = guardada
      ? lista.filter((g) => g.slug !== slug)
      : [{ slug, titulo, fecha: new Date().toISOString() }, ...lista];
    localStorage.setItem("guias_guardadas", JSON.stringify(nueva.slice(0, 100)));
    setGuardada(!guardada);
    window.dispatchEvent(new Event("storage_favoritos"));
  }

  return (
    <button
      className="boton secundario"
      onClick={alternar}
      style={{ padding: "8px 14px", fontSize: 13, display: "inline-flex", alignItems: "center", gap: 6 }}
      aria-label={guardada ? "Quitar guía de guardadas" : "Guardar guía"}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill={guardada ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" aria-hidden>
        <path d="M19 21 12 16 5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
      </svg>
      {guardada ? "Guía guardada ✓" : "Guardar guía"}
    </button>
  );
}
