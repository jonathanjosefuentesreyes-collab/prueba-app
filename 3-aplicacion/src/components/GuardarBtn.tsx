"use client";

import { useEffect, useState } from "react";

interface Guardada { id: number; nombre: string; }

function leer(): Guardada[] {
  try { return JSON.parse(localStorage.getItem("guardadas") || "[]"); } catch { return []; }
}

export default function GuardarBtn({ id, nombre }: { id: number; nombre: string }) {
  const [guardada, setGuardada] = useState(false);

  useEffect(() => { setGuardada(leer().some((g) => g.id === id)); }, [id]);

  function alternar() {
    const lista = leer();
    const nueva = guardada ? lista.filter((g) => g.id !== id) : [...lista, { id, nombre }];
    localStorage.setItem("guardadas", JSON.stringify(nueva));
    setGuardada(!guardada);
  }

  return (
    <button className="boton secundario" onClick={alternar} style={{ padding: "8px 12px", fontSize: 13 }}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill={guardada ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" aria-hidden>
        <path d="M19 21 12 16 5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
      </svg>
      {guardada ? "Guardada" : "Guardar"}
    </button>
  );
}
