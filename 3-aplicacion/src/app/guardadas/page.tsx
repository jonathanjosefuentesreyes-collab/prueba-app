"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { ConsultaGuardada } from "@/components/ChatClient";

interface LeyGuardada { id: number; nombre: string; }

export default function Guardadas() {
  const [leyes, setLeyes] = useState<LeyGuardada[] | null>(null);
  const [consultas, setConsultas] = useState<ConsultaGuardada[] | null>(null);

  useEffect(() => {
    try { setLeyes(JSON.parse(localStorage.getItem("guardadas") || "[]")); } catch { setLeyes([]); }
    try { setConsultas(JSON.parse(localStorage.getItem("consultas_guardadas") || "[]")); } catch { setConsultas([]); }
  }, []);

  function quitarLey(id: number) {
    const nueva = (leyes || []).filter((g) => g.id !== id);
    localStorage.setItem("guardadas", JSON.stringify(nueva));
    setLeyes(nueva);
  }

  function quitarConsulta(id: number) {
    const nueva = (consultas || []).filter((c) => c.id !== id);
    localStorage.setItem("consultas_guardadas", JSON.stringify(nueva));
    setConsultas(nueva);
  }

  function leerEnVozAlta(textoMsg: string) {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(textoMsg);
    u.lang = "es-CL";
    window.speechSynthesis.speak(u);
  }

  const fecha = (iso: string) =>
    new Date(iso).toLocaleDateString("es-CL", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });

  const vacioTotal = leyes && consultas && leyes.length === 0 && consultas.length === 0;

  return (
    <main>
      <header className="header">
        <span className="marca"><span className="azul">Mis</span> <span className="rojo">Guardadas</span></span>
      </header>

      {vacioTotal && (
        <p className="vacio">
          Aún no guardas nada.<br /><br />
          💬 En el <Link href="/chat" style={{ color: "var(--azul)", fontWeight: 700 }}>chat</Link>, toca “Guardar” bajo una respuesta para conservar la consulta.<br /><br />
          ⚖️ En una <Link href="/leyes" style={{ color: "var(--azul)", fontWeight: 700 }}>ley</Link>, toca “Guardar” para tenerla siempre a mano.
        </p>
      )}

      {consultas && consultas.length > 0 && (
        <>
          <h2 className="seccion-titulo">Consultas guardadas ({consultas.length})</h2>
          <div className="lista">
            {consultas.map((c) => (
              <details key={c.id} className="grupo">
                <summary>
                  <span style={{ minWidth: 0 }}>
                    <strong style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.pregunta || "Consulta"}</strong>
                    <span className="nota">{fecha(c.fecha)}</span>
                  </span>
                  <svg className="flecha" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="m6 9 6 6 6-6" /></svg>
                </summary>
                <div className="contenido">
                  <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, whiteSpace: "pre-line", background: "var(--superficie)", border: "1px solid var(--borde)", borderRadius: 10, padding: "10px 12px" }}>{c.respuesta}</p>
                  {c.fuentes.length > 0 && (
                    <span className="chips">
                      {c.fuentes.map((f) => (
                        <Link key={f.articulo_id} href={`/leyes/${f.norma_id}?art=${f.articulo_id}`} className="chip">
                          {f.ley} · art. {f.numero}
                        </Link>
                      ))}
                    </span>
                  )}
                  <span style={{ display: "flex", gap: 8 }}>
                    <button className="accion-msg" onClick={() => leerEnVozAlta(c.respuesta)}>🔊 Escuchar</button>
                    <button className="accion-msg" onClick={() => quitarConsulta(c.id)}>Quitar</button>
                  </span>
                </div>
              </details>
            ))}
          </div>
        </>
      )}

      {leyes && leyes.length > 0 && (
        <>
          <h2 className="seccion-titulo">Leyes guardadas ({leyes.length})</h2>
          <div className="lista">
            {leyes.map((g) => (
              <div key={g.id} className="tarjeta" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
                <Link href={`/leyes/${g.id}`} style={{ fontWeight: 700, fontSize: 15 }}>{g.nombre}</Link>
                <button className="boton secundario" style={{ padding: "6px 10px", fontSize: 12.5 }} onClick={() => quitarLey(g.id)}>Quitar</button>
              </div>
            ))}
          </div>
        </>
      )}
    </main>
  );
}
