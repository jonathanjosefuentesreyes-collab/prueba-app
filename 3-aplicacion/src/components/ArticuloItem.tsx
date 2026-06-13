"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSettings } from "@/contexts/SettingsContext";

interface Articulo {
  id: number;
  norma_id: number;
  orden: number;
  encabezado: string;
  texto: string;
  transitorio: number;
}

interface ArticuloItemProps {
  articulo: Articulo;
  destacado?: boolean;
  showParentLawInfo?: boolean;
  nombreLey?: string;
  tituloLey?: string;
}

const cacheSimplificaciones: Record<number, string> = {};

export default function ArticuloItem({
  articulo,
  destacado = false,
  showParentLawInfo = false,
  nombreLey = "",
  tituloLey = ""
}: ArticuloItemProps) {
  const { plainLanguage } = useSettings();
  const [explicacion, setExplicacion] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);
  const [reproduciendo, setReproduciendo] = useState(false);
  const [esFavorito, setEsFavorito] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Cargar estado de favorito desde localStorage
  useEffect(() => {
    try {
      const favs = JSON.parse(localStorage.getItem("favoritos_articulos") || "[]");
      setEsFavorito(favs.some((f: any) => f.id === articulo.id));
    } catch {
      setEsFavorito(false);
    }
  }, [articulo.id]);

  // Suscribirse a cambios en los favoritos (útil si se desmarca en la lista de guardados)
  useEffect(() => {
    function actualizarFavorito() {
      try {
        const favs = JSON.parse(localStorage.getItem("favoritos_articulos") || "[]");
        setEsFavorito(favs.some((f: any) => f.id === articulo.id));
      } catch {}
    }
    window.addEventListener("storage_favoritos", actualizarFavorito);
    return () => {
      window.removeEventListener("storage_favoritos", actualizarFavorito);
    };
  }, [articulo.id]);

  function alternarFavorito() {
    try {
      const favs = JSON.parse(localStorage.getItem("favoritos_articulos") || "[]");
      const yaFavorito = favs.some((f: any) => f.id === articulo.id);
      let nuevosFavs;
      if (yaFavorito) {
        nuevosFavs = favs.filter((f: any) => f.id !== articulo.id);
      } else {
        nuevosFavs = [
          ...favs,
          {
            id: articulo.id,
            norma_id: articulo.norma_id,
            orden: articulo.orden,
            encabezado: articulo.encabezado,
            texto: articulo.texto,
            transitorio: articulo.transitorio,
            nombre_ley: nombreLey,
            titulo_ley: tituloLey
          }
        ];
      }
      localStorage.setItem("favoritos_articulos", JSON.stringify(nuevosFavs));
      setEsFavorito(!yaFavorito);
      window.dispatchEvent(new Event("storage_favoritos"));
    } catch (e) {
      console.error("Error al guardar favorito:", e);
    }
  }

  // Limpiar el sintetizador si el componente se desmonta
  useEffect(() => {
    return () => {
      if (reproduciendo) {
        window.speechSynthesis.cancel();
      }
    };
  }, [reproduciendo]);

  // Cargar explicación simple cuando está activo
  useEffect(() => {
    if (!plainLanguage) return;

    if (cacheSimplificaciones[articulo.id]) {
      setExplicacion(cacheSimplificaciones[articulo.id]);
      return;
    }

    async function cargarSimplificacion() {
      setCargando(true);
      try {
        const res = await fetch(`/api/simplificar?id=${articulo.id}`);
        const data = await res.json();
        if (data.resumen) {
          cacheSimplificaciones[articulo.id] = data.resumen;
          setExplicacion(data.resumen);
        }
      } catch (err) {
        console.error("Error cargando simplificación", err);
      } finally {
        setCargando(false);
      }
    }

    cargarSimplificacion();
  }, [plainLanguage, articulo.id]);

  // Manejar reproducción de voz
  function toggleVoz() {
    if (reproduciendo) {
      window.speechSynthesis.cancel();
      setReproduciendo(false);
      return;
    }

    window.speechSynthesis.cancel();

    const textoALeer = plainLanguage && explicacion
      ? `${articulo.encabezado}. Explicación simple: ${explicacion}`
      : `${articulo.encabezado}. ${articulo.texto}`;

    const utterance = new SpeechSynthesisUtterance(textoALeer);
    const voces = window.speechSynthesis.getVoices();
    const vozCl = voces.find(v => v.lang.includes("es-CL")) || 
                voces.find(v => v.lang.includes("es-ES")) || 
                voces.find(v => v.lang.includes("es"));
    if (vozCl) {
      utterance.voice = vozCl;
    }
    
    utterance.lang = "es-CL";
    utterance.rate = 0.95;

    utterance.onend = () => {
      setReproduciendo(false);
    };

    utterance.onerror = () => {
      setReproduciendo(false);
    };

    utteranceRef.current = utterance;
    setReproduciendo(true);
    window.speechSynthesis.speak(utterance);
  }

  const tituloArticulo = articulo.encabezado.replace(/^art[ií]culo\s*/i, "Artículo ").trim();

  // Estilo reactivo si está reproduciéndose
  const playingStyle = reproduciendo ? {
    border: "2px solid #22c55e",
    backgroundColor: "#f0fdf4"
  } : {};

  return (
    <article 
      className={`articulo ${destacado ? "destacado" : ""}`}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        position: "relative",
        borderRadius: "16px",
        padding: "16px",
        backgroundColor: "#ffffff",
        boxShadow: "var(--sombra)",
        transition: "all 0.2s ease",
        ...playingStyle
      }}
    >
      {/* Información de la ley madre opcional */}
      {showParentLawInfo && (nombreLey || tituloLey) && (
        <>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", gap: "8px", marginBottom: "4px" }}>
            <span style={{ color: "#D52B1E", fontSize: "calc(11.5px * var(--escala-letra, 1))", fontWeight: "bold", whiteSpace: "nowrap" }}>
              {nombreLey}
            </span>
            <span style={{ color: "#64748B", fontSize: "calc(11.5px * var(--escala-letra, 1))", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap", textAlign: "right", flex: 1 }}>
              {tituloLey}
            </span>
          </div>
          <hr style={{ border: 0, borderTop: "1px solid #f1f5f9", margin: "0 0 8px 0", width: "100%" }} />
        </>
      )}

      {/* Cabecera del Artículo */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", gap: "8px" }}>
        <h3 style={{ margin: 0, display: "flex", alignItems: "center", gap: "8px", fontSize: "calc(15.5px * var(--escala-letra, 1))", fontWeight: "bold" }}>
          <span style={{ backgroundColor: "#E0F2FE", color: "#0369A1", borderRadius: "6px", padding: "3px 8px", fontSize: "calc(12px * var(--escala-letra, 1))", fontWeight: "bold" }}>
            {tituloArticulo.split(" ")[0]} {tituloArticulo.split(" ")[1]}
          </span>
          {tituloArticulo.split(" ").slice(2).join(" ") && (
            <span style={{ color: "#0f172a" }}>{tituloArticulo.split(" ").slice(2).join(" ")}</span>
          )}
          {articulo.transitorio ? <span className="badge" style={{ fontSize: "calc(11px * var(--escala-letra, 1))" }}>transitorio</span> : null}
        </h3>
        
        {/* Botón de Favorito (Corazón) */}
        <button
          type="button"
          onClick={alternarFavorito}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "4px",
            color: esFavorito ? "#D52B1E" : "#94A3B8",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "transform 0.15s ease"
          }}
          title={esFavorito ? "Quitar de favoritos" : "Guardar en favoritos"}
          aria-label={esFavorito ? "Quitar de favoritos" : "Guardar en favoritos"}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill={esFavorito ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
        </button>
      </div>

      {/* Renderizado de Texto Legal vs. Lenguaje Simple */}
      {plainLanguage ? (
        <div className="bloque-explicacion-simple" style={{ margin: "4px 0" }}>
          <div className="etiqueta-explicacion">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            <span>Explicación en Lenguaje Simple:</span>
          </div>
          {cargando ? (
            <div className="cargador-explicacion">
              <span className="punto-cargador"></span>
              <span className="punto-cargador"></span>
              <span className="punto-cargador"></span>
            </div>
          ) : (
            <p className="texto-explicacion" style={{ fontSize: "calc(14px * var(--escala-letra, 1))" }}>
              {explicacion || "No hay explicación disponible para este artículo."}
            </p>
          )}
        </div>
      ) : (
        <p className="texto-legal" style={{ margin: "4px 0", fontSize: "calc(14.5px * var(--escala-letra, 1))", lineHeight: "1.6", color: "#334155" }}>
          {articulo.texto}
        </p>
      )}

      {/* Fila Inferior con Badges e Icono Reproductor TTS */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", marginTop: "8px" }}>
        {/* Badge de tipo de texto */}
        <span 
          style={{
            backgroundColor: plainLanguage ? "#F0FDF4" : "#F1F5F9",
            color: plainLanguage ? "#166534" : "#475569",
            borderRadius: "8px",
            padding: "4px 10px",
            fontSize: "calc(10.5px * var(--escala-letra, 1))",
            fontWeight: "bold",
            display: "inline-flex",
            alignItems: "center"
          }}
        >
          {plainLanguage ? "💡 Explicación Sencilla" : "📜 Texto Legal Técnico"}
        </span>

        {/* Botón TTS (Escuchar / Detener) */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {reproduciendo && (
            <span style={{ color: "#15803D", backgroundColor: "#DDFDDF", borderRadius: "12px", padding: "3px 8px", fontSize: "10px", fontWeight: "bold" }}>
              Leyendo...
            </span>
          )}
          <button
            type="button"
            onClick={toggleVoz}
            style={{
              backgroundColor: reproduciendo ? "#D52B1E" : "#0038A8",
              color: "#ffffff",
              border: "none",
              borderRadius: "50%",
              width: "36px",
              height: "36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow: "0 2px 5px rgba(0,0,0,0.15)",
              transition: "transform 0.15s ease"
            }}
            title={reproduciendo ? "Detener lectura" : "Escuchar lectura de voz"}
            aria-label={reproduciendo ? "Detener lectura" : "Escuchar artículo"}
          >
            {reproduciendo ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <rect x="4" y="4" width="16" height="16" rx="2" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
