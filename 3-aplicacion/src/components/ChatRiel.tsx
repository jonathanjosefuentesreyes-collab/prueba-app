"use client";

// Chat de AbogaBot DOCKED en el riel derecho (solo escritorio ancho ≥1280px):
// cabecera arriba, conversación al medio (scroll) e input abajo. Usa el ChatContext
// global, así comparte la misma conversación con la página /chat.
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useChat } from "@/contexts/ChatContext";
import { formatearRespuesta } from "@/lib/formato-chat";

export default function ChatRiel() {
  const { mensajes, pensando, enviar, limpiar } = useChat();
  const [texto, setTexto] = useState("");
  const finRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    finRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensajes, pensando]);

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
          placeholder="Escribe tu consulta…"
          aria-label="Tu consulta a AbogaBot"
        />
        <button type="submit" disabled={pensando} aria-label="Enviar consulta">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M3 11.5 21 3l-8.5 18-2.4-7.1z" />
          </svg>
        </button>
      </form>
    </div>
  );
}
