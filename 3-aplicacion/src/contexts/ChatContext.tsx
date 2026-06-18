"use client";

// ChatContext: estado y lógica del chat viven en el layout (nunca se desmontan),
// así la respuesta de Gemini llega aunque el usuario cambie de pestaña mientras espera.
import { createContext, useContext, useEffect, useRef, useState, useCallback } from "react";

export interface Fuente { articulo_id: number | null; norma_id: number; ley: string; numero: string; }
export interface Mensaje { rol: "usuario" | "bot"; texto: string; fuentes?: Fuente[]; disclaimer?: string; premium?: boolean; }

interface ChatCtx {
  mensajes: Mensaje[];
  pensando: boolean;
  restantes: number | null;
  respondioMientrasAfuera: boolean;
  enviar: (texto: string) => Promise<void>;
  limpiar: () => void;
  marcarVisto: () => void;
}

const Ctx = createContext<ChatCtx | null>(null);

const CLAVE = "chat_historial";
const MAX_MSG = 60;

function leerLocal(): { mensajes: Mensaje[]; restantes: number | null } | null {
  try {
    const raw = JSON.parse(localStorage.getItem(CLAVE) || "null");
    if (!raw || !Array.isArray(raw.mensajes) || !raw.mensajes.length) return null;
    return { mensajes: raw.mensajes, restantes: raw.restantes ?? null };
  } catch { return null; }
}

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [mensajes, setMensajes] = useState<Mensaje[]>([]);
  const [pensando, setPensando] = useState(false);
  const [restantes, setRestantes] = useState<number | null>(null);
  // true cuando llegó una respuesta mientras el usuario estaba en otra pestaña
  const [respondioMientrasAfuera, setRespondioMientrasAfuera] = useState(false);
  const enChat = useRef(false); // el ChatClient avisa si está montado
  const cargado = useRef(false);

  useEffect(() => {
    const h = leerLocal();
    if (h) { setMensajes(h.mensajes); if (h.restantes !== null) setRestantes(h.restantes); }
    cargado.current = true;
  }, []);

  useEffect(() => {
    if (!cargado.current || mensajes.length === 0) return;
    try {
      localStorage.setItem(CLAVE, JSON.stringify({ mensajes: mensajes.slice(-MAX_MSG), restantes, ts: Date.now() }));
    } catch { /* lleno */ }
  }, [mensajes, restantes]);

  const enviar = useCallback(async (contenido: string) => {
    const limpio = contenido.trim();
    if (!limpio || pensando) return;
    setMensajes((m) => [...m, { rol: "usuario", texto: limpio }]);
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
      // Si el usuario se fue a otra pestaña mientras esperaba, marcamos el aviso
      if (!enChat.current) setRespondioMientrasAfuera(true);
    } catch {
      setMensajes((m) => [...m, { rol: "bot", texto: "No pude conectarme. Revisa tu conexión e intenta de nuevo." }]);
    } finally {
      setPensando(false);
    }
  }, [pensando]);

  const limpiar = useCallback(() => {
    setMensajes([]);
    setRestantes(null);
    setRespondioMientrasAfuera(false);
    try { localStorage.removeItem(CLAVE); } catch {}
  }, []);

  const marcarVisto = useCallback(() => {
    setRespondioMientrasAfuera(false);
    enChat.current = true;
  }, []);

  // Exponer el ref para que ChatClient lo controle
  const ctx: ChatCtx & { _setEnChat: (v: boolean) => void } = {
    mensajes, pensando, restantes, respondioMientrasAfuera,
    enviar, limpiar, marcarVisto,
    _setEnChat: (v) => { enChat.current = v; },
  };

  return <Ctx.Provider value={ctx}>{children}</Ctx.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useChat() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useChat debe usarse dentro de ChatProvider");
  return ctx;
}

// Permite que ChatClient marque si está activo sin re-render
export function useChatRef() {
  return useContext(Ctx) as (ChatCtx & { _setEnChat: (v: boolean) => void }) | null;
}
