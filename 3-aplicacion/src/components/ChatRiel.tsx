"use client";

// Chat de AbogaBot DOCKED en el riel derecho (solo escritorio ancho ≥1280px):
// cabecera arriba, conversación al medio (scroll) e input abajo. Usa el ChatContext
// global, así comparte la misma conversación con la página /chat.
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useChat } from "@/contexts/ChatContext";
import { formatearRespuesta } from "@/lib/formato-chat";
import { hablar } from "@/lib/hablar";

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

export default function ChatRiel() {
  const { mensajes, pensando, enviar, limpiar } = useChat();
  const [texto, setTexto] = useState("");
  const [escuchando, setEscuchando] = useState(false);
  const [hayVoz, setHayVoz] = useState(false);
  const reconocedor = useRef<ReconocimientoVoz | null>(null);
  const finRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    finRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensajes, pensando]);

  useEffect(() => {
    const w = window as unknown as { SpeechRecognition?: new () => ReconocimientoVoz; webkitSpeechRecognition?: new () => ReconocimientoVoz };
    setHayVoz(Boolean(w.SpeechRecognition || w.webkitSpeechRecognition));
  }, []);

  // Micrófono: dicta la consulta y la deja escrita en el input (no autoenvía).
  function alternarMicrofono() {
    if (escuchando) { reconocedor.current?.stop(); return; }
    const w = window as unknown as { SpeechRecognition?: new () => ReconocimientoVoz; webkitSpeechRecognition?: new () => ReconocimientoVoz };
    const Ctor = w.SpeechRecognition || w.webkitSpeechRecognition;
    if (!Ctor) return;
    const rec = new Ctor();
    rec.lang = "es-CL";
    rec.interimResults = false;
    rec.maxAlternatives = 1;
    rec.onresult = (e) => { const d = e.results[0]?.[0]?.transcript || ""; if (d) setTexto(d); };
    rec.onend = () => setEscuchando(false);
    rec.onerror = () => setEscuchando(false);
    reconocedor.current = rec;
    setEscuchando(true);
    rec.start();
  }

  // Reporte de respuestas IA (política de Google Play; útil también en web).
  function reportarRespuesta(textoMsg: string) {
    const asunto = encodeURIComponent("Reporte de respuesta de AbogaBot");
    const cuerpo = encodeURIComponent(
      "Quiero reportar esta respuesta de AbogaBot por ser incorrecta, ofensiva o problemática:\n\n“" +
      textoMsg.slice(0, 1500) +
      "”\n\nMotivo del reporte (cuéntanos qué estuvo mal):\n"
    );
    window.location.href = `mailto:jonathanjosefuentesreyes@gmail.com?subject=${asunto}&body=${cuerpo}`;
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = texto.trim();
    if (!q || pensando) return;
    setTexto("");
    enviar(q);
  }

  return (
    <div className="riel-chat">
      <header className="riel-chat-head">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/abogabot-personaje.png" alt="" className="riel-chat-ava" />
        <span className="riel-chat-id">
          <strong>AbogaBot</strong>
          <span>en línea · asistente legal IA</span>
        </span>
        {mensajes.length > 0 && (
          <button type="button" className="riel-chat-limpiar" onClick={limpiar} aria-label="Borrar conversación">
            Limpiar
          </button>
        )}
      </header>

      <div className="riel-chat-msgs">
        {mensajes.length === 0 && (
          <div className="riel-chat-bienvenida">
            <p>👋 Hola, soy <strong>AbogaBot</strong>.</p>
            <p>Cuéntame tu problema legal y te explico qué dice la ley y qué hacer.</p>
            <p className="riel-chat-aviso">🔒 No escribas datos personales sensibles (RUT, nombre completo, dirección).</p>
          </div>
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
                <button className="accion-msg" onClick={() => hablar(m.texto)} aria-label="Escuchar respuesta">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M11 5 6 9H2v6h4l5 4zM15.5 8.5a5 5 0 0 1 0 7M19 5a9 9 0 0 1 0 14" /></svg>
                  Escuchar
                </button>
                <button className="accion-msg" onClick={() => reportarRespuesta(m.texto)} aria-label="Reportar respuesta">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1zM4 22v-7" /></svg>
                  Reportar
                </button>
              </span>
            )}
            {m.rol === "bot" && m.disclaimer && <span className="riel-disc">{m.disclaimer}</span>}
          </div>
        ))}
        {pensando && <div className="burbuja bot riel-pensando">AbogaBot está escribiendo…</div>}
        <div ref={finRef} />
      </div>

      <form className="riel-chat-form" onSubmit={onSubmit}>
        <input
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder={escuchando ? "Te escucho…" : "Escribe tu consulta…"}
          aria-label="Tu consulta a AbogaBot"
        />
        {hayVoz && (
          <button
            type="button"
            onClick={alternarMicrofono}
            className="riel-chat-mic"
            style={{ background: escuchando ? "var(--rojo)" : "var(--azul)", animation: escuchando ? "pulso 1s infinite" : undefined }}
            aria-label={escuchando ? "Detener micrófono" : "Hablar la consulta"}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <rect x="9" y="2" width="6" height="12" rx="3" /><path d="M5 10a7 7 0 0 0 14 0M12 19v3" />
            </svg>
          </button>
        )}
        <button type="submit" disabled={pensando} aria-label="Enviar consulta">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M3 11.5 21 3l-8.5 18-2.4-7.1z" />
          </svg>
        </button>
      </form>
    </div>
  );
}
