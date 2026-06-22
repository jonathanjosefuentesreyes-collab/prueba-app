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
    <div className={`cabecera-seccion-bcn${activeTab === "guias" ? " cabecera-guias" : ""}`}>
      {/* Patriotic Ribbon at the top matching mockup Row */}
      <div className="patriotic-ribbon">
        <span className="ribbon-white" />
        <span className="ribbon-blue" />
        <span className="ribbon-red" />
      </div>

      <div className="header-principal-bcn">
        {/* Escudo: balanza con copihue (diseño propio). Más grande que el texto para que resalte. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="icono-balanza-header" src="/escudo-balanza.png" alt="Leyes de Chile" width={58} height={58} />
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
