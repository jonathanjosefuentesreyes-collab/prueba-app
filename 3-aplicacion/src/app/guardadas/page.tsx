"use client";

import React, { useEffect, useState } from "react";
import BibliotecaHeader from "@/components/BibliotecaHeader";
import ArticuloItem from "@/components/ArticuloItem";
import ChatBar from "@/components/ChatBar";

interface ArticuloFavorito {
  id: number;
  norma_id: number;
  orden: number;
  encabezado: string;
  texto: string;
  transitorio: number;
  nombre_ley: string;
  titulo_ley: string;
}

interface ConsultaGuardada {
  id: number;
  pregunta: string;
  respuesta: string;
  fuentes: { articulo_id: number; norma_id: number; ley: string; numero: string }[];
  fecha: string;
}

export default function Guardadas() {
  const [lista, setLista] = useState<ArticuloFavorito[] | null>(null);
  const [consultas, setConsultas] = useState<ConsultaGuardada[]>([]);

  useEffect(() => {
    try { setConsultas(JSON.parse(localStorage.getItem("consultas_guardadas") || "[]")); } catch { setConsultas([]); }
  }, []);

  function quitarConsulta(id: number) {
    const nuevas = consultas.filter((c) => c.id !== id);
    localStorage.setItem("consultas_guardadas", JSON.stringify(nuevas));
    setConsultas(nuevas);
  }

  function cargarFavoritos() {
    try {
      setLista(JSON.parse(localStorage.getItem("favoritos_articulos") || "[]"));
    } catch {
      setLista([]);
    }
  }

  useEffect(() => {
    cargarFavoritos();
    // Suscribirse al evento para reaccionar cuando se desmarca un corazón
    window.addEventListener("storage_favoritos", cargarFavoritos);
    return () => {
      window.removeEventListener("storage_favoritos", cargarFavoritos);
    };
  }, []);

  return (
    <main style={{ paddingBottom: 230 }}>
      <BibliotecaHeader activeTab="guardadas" />
      
      <div style={{ padding: "0 2px 20px" }}>
        {lista === null ? (
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <span style={{ fontSize: "14px", color: "var(--texto-suave)" }}>Cargando tus guardados...</span>
          </div>
        ) : lista.length === 0 ? (
          <div 
            style={{ 
              display: "flex", 
              flexDirection: "column", 
              alignItems: "center", 
              textAlign: "center", 
              padding: "48px 16px" 
            }}
          >
            <span style={{ fontSize: "56px", marginBottom: "16px", display: "block" }} role="img" aria-label="Estrella">
              ⭐
            </span>
            <h3 style={{ fontSize: "calc(16px * var(--escala-letra, 1))", fontWeight: "bold", color: "#475569", margin: "0 0 6px 0" }}>
              Aún no tienes artículos guardados
            </h3>
            <p style={{ fontSize: "calc(13px * var(--escala-letra, 1))", color: "#64748B", lineHeight: "1.5", margin: 0 }}>
              Presiona el ícono del corazón en los artículos de cualquier ley para guardarlos aquí. ¡Te servirá para encontrarlos rápido!
            </p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <h2 className="seccion-titulo-compendio" style={{ margin: "0 0 12px 0" }}>
              Artículos Guardados ({lista.length})
            </h2>
            <div className="lista" style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {lista.map((fav) => (
                <ArticuloItem
                  key={fav.id}
                  articulo={{
                    id: fav.id,
                    norma_id: fav.norma_id,
                    orden: fav.orden,
                    encabezado: fav.encabezado,
                    texto: fav.texto,
                    transitorio: fav.transitorio
                  }}
                  showParentLawInfo={true}
                  nombreLey={fav.nombre_ley}
                  tituloLey={fav.titulo_ley}
                />
              ))}
            </div>
          </div>
        )}

        {consultas.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: 24 }}>
            <h2 className="seccion-titulo-compendio" style={{ margin: "0 0 4px 0" }}>
              💬 Consultas al Asistente ({consultas.length})
            </h2>
            {consultas.map((c) => (
              <details key={c.id} className="grupo">
                <summary>
                  <span style={{ minWidth: 0 }}>
                    <strong style={{ display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontSize: "calc(14.5px * var(--escala-letra, 1))" }}>{c.pregunta || "Consulta"}</strong>
                    <span className="nota">{new Date(c.fecha).toLocaleDateString("es-CL", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })}</span>
                  </span>
                  <svg className="flecha" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="m6 9 6 6 6-6" /></svg>
                </summary>
                <div className="contenido">
                  <p style={{ margin: 0, fontSize: "calc(14px * var(--escala-letra, 1))", lineHeight: 1.6, whiteSpace: "pre-line", background: "var(--superficie)", border: "1px solid var(--borde)", borderRadius: 10, padding: "10px 12px" }}>{c.respuesta}</p>
                  {c.fuentes?.length > 0 && (
                    <span className="chips">
                      {c.fuentes.map((f) => (
                        <a key={f.articulo_id} href={`/leyes/${f.norma_id}?art=${f.articulo_id}`} className="chip">{f.ley} · art. {f.numero}</a>
                      ))}
                    </span>
                  )}
                  <button className="accion-msg" onClick={() => quitarConsulta(c.id)} style={{ alignSelf: "flex-start" }}>Quitar</button>
                </div>
              </details>
            ))}
          </div>
        )}
      </div>
      <ChatBar />
    </main>
  );
}
