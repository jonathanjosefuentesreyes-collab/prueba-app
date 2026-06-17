"use client";

import AccessibilityBar from "./AccessibilityBar";

interface BibliotecaHeaderProps {
  activeTab: "biblioteca" | "guardadas" | "guias";
  consulta?: string;
}

// Cada pestaña es ahora una página independiente (se navega desde la barra inferior),
// así que la cabecera muestra su propio título según la sección.
const TITULOS = {
  biblioteca: { h1: "Biblioteca de Leyes", sub: "Legislación chilena · Fuente oficial BCN" },
  guardadas: { h1: "Mis Guardados", sub: "Tus leyes y consultas favoritas" },
  guias: { h1: "Guías Ciudadanas", sub: "Tus derechos, explicados fácil" },
} as const;

export default function BibliotecaHeader({ activeTab, consulta = "" }: BibliotecaHeaderProps) {
  const titulo = TITULOS[activeTab];
  return (
    <div className="cabecera-seccion-bcn">
      {/* Patriotic Ribbon at the top matching mockup Row */}
      <div className="patriotic-ribbon">
        <span className="ribbon-white" />
        <span className="ribbon-blue" />
        <span className="ribbon-red" />
      </div>

      <div className="header-principal-bcn">
        <svg className="icono-balanza-header" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <line x1="12" y1="3" x2="12" y2="21" />
          <path d="M7 21h10" />
          <path d="M5 7h14" />
          <path d="M5 7l-2 6h4l-2-6" />
          <path d="M3 13a2 2 0 0 0 4 0H3" />
          <path d="M19 7l-2 6h4l-2-6" />
          <path d="M17 13a2 2 0 0 0 4 0H17" />
        </svg>
        <div>
          <h1 className="titulo-bcn">{titulo.h1}</h1>
          <p className="subtitulo-bcn">{titulo.sub}</p>
        </div>
      </div>

      {/* Configuración de Lectura Dinámica integrada en la cabecera */}
      <AccessibilityBar />

      {/* Formulario de Búsqueda de alta visibilidad */}
      <form method="GET" action="/leyes" className="form-busqueda-header">
        <span className="icono-busqueda">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </span>
        <input 
          className="campo-busqueda-header" 
          type="search" 
          name="q" 
          defaultValue={consulta} 
          placeholder="Buscar palabras (ej: vacaciones, velocidad, multa)..." 
          aria-label="Buscar en las leyes" 
        />
        <button style={{ display: "none" }} type="submit">Buscar</button>
      </form>
    </div>
  );
}
