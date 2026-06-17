"use client";

import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";

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

export default function ChatBar() {
  const router = useRouter();
  const [texto, setTexto] = useState("");
  const [escuchando, setEscuchando] = useState(false);
  const [hayVoz, setHayVoz] = useState(false);
  const reconocedor = useRef<ReconocimientoVoz | null>(null);

  useEffect(() => {
    const w = window as unknown as { SpeechRecognition?: new () => ReconocimientoVoz; webkitSpeechRecognition?: new () => ReconocimientoVoz };
    setHayVoz(Boolean(w.SpeechRecognition || w.webkitSpeechRecognition));
  }, []);

  function enviar(e: React.FormEvent) {
    e.preventDefault();
    const q = texto.trim();
    router.push(q ? `/chat?q=${encodeURIComponent(q)}` : "/chat");
  }

  // Botón de voz: dicta la consulta y, al reconocerla, abre el chat con ella.
  function alternarVoz() {
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
      if (dicho) {
        setTexto(dicho);
        router.push(`/chat?q=${encodeURIComponent(dicho)}`);
      }
    };
    rec.onend = () => setEscuchando(false);
    rec.onerror = () => setEscuchando(false);
    reconocedor.current = rec;
    setEscuchando(true);
    rec.start();
  }

  return (
    <div className="barra-chat">
      {/* AbogaBot invita a consultar — círculo a la derecha, centrado sobre el botón
          Enviar, con la burbuja por encima de su cabeza. Al tocarlo abre el chat. */}
      <button
        type="button"
        className="abogabot-invita"
        onClick={() => router.push("/chat")}
        aria-label="Consultar gratis con AbogaBot"
      >
        <span className="abogabot-invita-burbuja">
          <strong>¡Hola! Soy AbogaBot</strong> 👋 Cuéntame tu duda legal y te oriento gratis
        </span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/abogabot.png" alt="AbogaBot" className="abogabot-invita-cara" />
      </button>
      <form onSubmit={enviar}>
        <input
          value={texto}
          readOnly
          onClick={() => router.push("/chat")}
          onFocus={() => router.push("/chat")}
          placeholder={escuchando ? "Te escucho…" : "Pregúntale a AbogaBot…"}
          aria-label="Abrir AbogaBot para escribir tu consulta"
          style={{ cursor: "pointer" }}
        />
        {hayVoz && (
          <button
            type="button"
            onClick={alternarVoz}
            className="boton-enviar"
            style={{ background: escuchando ? "var(--rojo)" : "var(--azul)", animation: escuchando ? "pulso 1s infinite" : undefined }}
            aria-label={escuchando ? "Detener micrófono" : "Hablar la consulta"}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <rect x="9" y="2" width="6" height="12" rx="3" /><path d="M5 10a7 7 0 0 0 14 0M12 19v3" />
            </svg>
          </button>
        )}
        <button type="submit" className="boton-enviar" aria-label="Enviar consulta">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M3 11.5 21 3l-8.5 18-2.4-7.1z" />
          </svg>
        </button>
      </form>
    </div>
  );
}
