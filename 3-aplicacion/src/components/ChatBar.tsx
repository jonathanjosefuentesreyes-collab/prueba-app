"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ChatBar() {
  const router = useRouter();
  const [texto, setTexto] = useState("");

  function enviar(e: React.FormEvent) {
    e.preventDefault();
    const q = texto.trim();
    router.push(q ? `/chat?q=${encodeURIComponent(q)}` : "/chat");
  }

  return (
    <div className="barra-chat">
      <div className="globo">Recomendaciones ingeniosas sobre la ley chilena</div>
      <form onSubmit={enviar}>
        <input
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="Escribe tu consulta..."
          aria-label="Consulta legal"
        />
        <button type="submit" className="boton-enviar" aria-label="Enviar consulta">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M3 11.5 21 3l-8.5 18-2.4-7.1z" />
          </svg>
        </button>
        <div className="huasito">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/huasito.png" alt="AbogaBot, tu asistente legal" />
          <span className="punto" />
        </div>
      </form>
    </div>
  );
}
