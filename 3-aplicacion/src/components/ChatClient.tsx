"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface Fuente { articulo_id: number | null; norma_id: number; ley: string; numero: string; }
interface Mensaje { rol: "usuario" | "bot"; texto: string; fuentes?: Fuente[]; disclaimer?: string; premium?: boolean; }

// Formatea la respuesta del bot: escapa HTML (seguro), aplica **negritas** y
// convierte líneas con *, - o • en viñetas. Evita mostrar markdown en crudo.
function negrita(s: string): string {
  return s.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
}
function formatearRespuesta(texto: string): string {
  const esc = texto.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  return esc
    .split("\n")
    .map((linea) => {
      const t = linea.trim();
      if (!t) return "";
      const v = t.match(/^[*\-•]\s+(.*)$/);
      if (v) return `<div class="cf-vinieta"><span class="cf-punto">•</span><span>${negrita(v[1])}</span></div>`;
      return `<div class="cf-linea">${negrita(t)}</div>`;
    })
    .join("");
}
export interface ConsultaGuardada {
  id: number;
  pregunta: string;
  respuesta: string;
  fuentes: Fuente[];
  fecha: string;
}

// Tipado mínimo de la Web Speech API (no viene en lib.dom estándar)
interface ReconocimientoVoz {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  start: () => void;
  stop: () => void;
  onresult: ((e: { results: { [i: number]: { [j: number]: { transcript: string } } } }) => void) | null;
  onend: (() => void) | null;
  onerror: (() => void) | null;
}

function leerConsultas(): ConsultaGuardada[] {
  try { return JSON.parse(localStorage.getItem("consultas_guardadas") || "[]"); } catch { return []; }
}

export default function ChatClient() {
  const params = useSearchParams();
  const inicial = params.get("q") || "";
  const [mensajes, setMensajes] = useState<Mensaje[]>([]);
  const [texto, setTexto] = useState("");
  const [pensando, setPensando] = useState(false);
  const [escuchando, setEscuchando] = useState(false);
  const [hayVoz, setHayVoz] = useState(false);
  const [guardadas, setGuardadas] = useState<Set<number>>(new Set());
  const [restantes, setRestantes] = useState<number | null>(null);
  const [notaPremium, setNotaPremium] = useState(false);
  const enviadoInicial = useRef(false);
  const reconocedor = useRef<ReconocimientoVoz | null>(null);
  const fondo = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const w = window as unknown as { SpeechRecognition?: new () => ReconocimientoVoz; webkitSpeechRecognition?: new () => ReconocimientoVoz };
    setHayVoz(Boolean(w.SpeechRecognition || w.webkitSpeechRecognition));
  }, []);

  async function enviar(contenido: string) {
    const limpio = contenido.trim();
    if (!limpio || pensando) return;
    setMensajes((m) => [...m, { rol: "usuario", texto: limpio }]);
    setTexto("");
    setPensando(true);
    try {
      const r = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mensaje: limpio }),
      });
      const j = await r.json();
      if (typeof j.restantes === "number") setRestantes(j.restantes);
      setMensajes((m) => [...m, { rol: "bot", texto: j.respuesta, fuentes: j.fuentes, disclaimer: j.disclaimer, premium: j.premium }]);
    } catch {
      setMensajes((m) => [...m, { rol: "bot", texto: "No pude conectarme. Revisa tu conexión e intenta de nuevo." }]);
    } finally {
      setPensando(false);
    }
  }

  function alternarMicrofono() {
    if (escuchando) {
      reconocedor.current?.stop();
      return;
    }
    const w = window as unknown as { SpeechRecognition?: new () => ReconocimientoVoz; webkitSpeechRecognition?: new () => ReconocimientoVoz };
    const Ctor = w.SpeechRecognition || w.webkitSpeechRecognition;
    if (!Ctor) return;
    const rec = new Ctor();
    rec.lang = "es-CL";
    rec.interimResults = false;
    rec.maxAlternatives = 1;
    rec.onresult = (e) => {
      const dicho = e.results[0]?.[0]?.transcript || "";
      if (dicho) setTexto(dicho);
    };
    rec.onend = () => setEscuchando(false);
    rec.onerror = () => setEscuchando(false);
    reconocedor.current = rec;
    setEscuchando(true);
    rec.start();
  }

  function leerEnVozAlta(textoMsg: string) {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(textoMsg);
    u.lang = "es-CL";
    u.rate = 1;
    window.speechSynthesis.speak(u);
  }

  function guardarConsulta(indiceBot: number) {
    const msg = mensajes[indiceBot];
    if (!msg || msg.rol !== "bot") return;
    let pregunta = "";
    for (let i = indiceBot - 1; i >= 0; i--) {
      if (mensajes[i].rol === "usuario") { pregunta = mensajes[i].texto; break; }
    }
    const lista = leerConsultas();
    lista.unshift({
      id: Date.now(),
      pregunta,
      respuesta: msg.texto,
      fuentes: msg.fuentes || [],
      fecha: new Date().toISOString(),
    });
    localStorage.setItem("consultas_guardadas", JSON.stringify(lista.slice(0, 100)));
    setGuardadas((g) => new Set(g).add(indiceBot));
  }

  useEffect(() => {
    if (inicial && !enviadoInicial.current) {
      enviadoInicial.current = true;
      enviar(inicial);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inicial]);

  useEffect(() => {
    fondo.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [mensajes, pensando]);

  return (
    <main style={{ display: "flex", flexDirection: "column", minHeight: "calc(100dvh - 96px)" }}>
      <header className="header" style={{ gap: 10 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/huasito.png" alt="" style={{ borderRadius: 0 }} />
        <span className="marca" style={{ fontSize: 19 }}>
          <span className="azul">Aboga</span><span className="rojo">Bot</span>
        </span>
        <span className="fecha" style={{ color: "#21b35a", fontWeight: 700 }}>● en línea</span>
      </header>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10, paddingBottom: 12 }}>
        {mensajes.length === 0 && !pensando && (
          <p className="vacio">
            Hola 👋 Soy AbogaBot.<br />Cuéntame tu problema legal con tus palabras
            {hayVoz ? <><br />— escribe o toca el micrófono y háblame —</> : null}<br />
            y te explico qué dice la ley y qué hacer ahora.
          </p>
        )}
        {mensajes.map((m, i) => (
          <div key={i} className={`burbuja ${m.rol}`}>
            {m.rol === "bot"
              ? <div className="bot-texto" dangerouslySetInnerHTML={{ __html: formatearRespuesta(m.texto) }} />
              : m.texto}
            {m.rol === "bot" && m.fuentes && m.fuentes.length > 0 && (
              <span className="chips">
                {m.fuentes.map((f) => (
                  <Link
                    key={`${f.norma_id}-${f.articulo_id ?? "ley"}`}
                    href={f.articulo_id ? `/leyes/${f.norma_id}?art=${f.articulo_id}` : `/leyes/${f.norma_id}`}
                    className="chip"
                  >
                    {f.articulo_id ? `${f.ley} · art. ${f.numero}` : f.ley}
                  </Link>
                ))}
              </span>
            )}
            {m.rol === "bot" && (
              <span style={{ display: "flex", gap: 8, marginTop: 8 }}>
                <button className="accion-msg" onClick={() => leerEnVozAlta(m.texto)} aria-label="Escuchar respuesta">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M11 5 6 9H2v6h4l5 4zM15.5 8.5a5 5 0 0 1 0 7M19 5a9 9 0 0 1 0 14" /></svg>
                  Escuchar
                </button>
                <button className="accion-msg" onClick={() => guardarConsulta(i)} disabled={guardadas.has(i)} aria-label="Guardar consulta">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill={guardadas.has(i) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinejoin="round" aria-hidden><path d="M19 21 12 16 5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" /></svg>
                  {guardadas.has(i) ? "Guardada ✓" : "Guardar"}
                </button>
              </span>
            )}
            {m.rol === "bot" && m.premium && (
              <span style={{ display: "block", marginTop: 10 }}>
                <button className="boton-premium" onClick={() => setNotaPremium(true)}>✨ Actualizar a Premium</button>
                {notaPremium && (
                  <span style={{ display: "block", marginTop: 8, fontSize: 12.5, color: "var(--texto-suave)" }}>
                    🚧 Los planes Premium están en preparación. ¡Gracias por tu interés y por apoyar el proyecto!
                  </span>
                )}
              </span>
            )}
            {m.rol === "bot" && m.disclaimer && (
              <span style={{ display: "block", marginTop: 8, fontSize: 11.5, color: "var(--texto-suave)" }}>{m.disclaimer}</span>
            )}
          </div>
        ))}
        {pensando && <div className="burbuja bot">Escribiendo…</div>}
        <div ref={fondo} />
      </div>

      {restantes !== null && (
        <p
          style={{
            position: "sticky", bottom: 120, margin: 0, textAlign: "center",
            fontSize: 11.5, fontWeight: 600,
            color: restantes > 0 ? "var(--texto-suave)" : "var(--rojo)",
          }}
        >
          {restantes > 0
            ? `Te ${restantes === 1 ? "queda" : "quedan"} ${restantes} ${restantes === 1 ? "consulta gratis hoy" : "consultas gratis hoy"}`
            : "Sin consultas gratis hoy · ✨ Actualiza a Premium para más"}
        </p>
      )}
      <form
        onSubmit={(e) => { e.preventDefault(); enviar(texto); }}
        style={{ position: "sticky", bottom: 76, display: "flex", gap: 8, background: "var(--fondo)", paddingTop: 6 }}
      >
        {hayVoz && (
          <button
            type="button"
            onClick={alternarMicrofono}
            className="boton-enviar"
            style={{ flex: "none", background: escuchando ? "var(--rojo)" : "var(--azul)", animation: escuchando ? "pulso 1s infinite" : undefined }}
            aria-label={escuchando ? "Detener micrófono" : "Hablar la consulta"}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <rect x="9" y="2" width="6" height="12" rx="3" /><path d="M5 10a7 7 0 0 0 14 0M12 19v3" />
            </svg>
          </button>
        )}
        <input
          className="campo"
          style={{ borderRadius: 999 }}
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder={escuchando ? "Te escucho…" : "Escribe tu consulta…"}
          aria-label="Mensaje para AbogaBot"
        />
        <button className="boton" style={{ borderRadius: 999 }} type="submit" disabled={pensando}>Enviar</button>
      </form>
    </main>
  );
}
