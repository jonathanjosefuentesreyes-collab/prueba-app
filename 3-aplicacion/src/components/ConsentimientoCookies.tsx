"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

// Banner de consentimiento de cookies (requisito de AdSense y buena práctica de privacidad).
// Guarda la elección en localStorage. Los scripts de anuncios solo se cargan si el usuario
// ACEPTA (ver lib/adsense + componente Anuncios, que leen este consentimiento).
const CLAVE = "consentimiento_cookies"; // "aceptado" | "rechazado"

export function consintioCookies(): boolean {
  try { return localStorage.getItem(CLAVE) === "aceptado"; } catch { return false; }
}

export default function ConsentimientoCookies() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try { if (!localStorage.getItem(CLAVE)) setVisible(true); } catch { /* sin storage */ }
  }, []);

  function elegir(valor: "aceptado" | "rechazado") {
    try { localStorage.setItem(CLAVE, valor); } catch {}
    setVisible(false);
    // Avisa al resto de la app (los anuncios escuchan este evento para cargarse al aceptar).
    window.dispatchEvent(new CustomEvent("consentimiento", { detail: valor }));
  }

  if (!visible) return null;

  return (
    <div className="cookie-banner" role="dialog" aria-label="Consentimiento de cookies">
      <p className="cookie-texto">
        Usamos cookies propias y de terceros (Google) para mejorar tu experiencia y mostrar
        anuncios. Puedes aceptar o rechazar. Más info en{" "}
        <Link href="/privacidad" style={{ color: "#fff", textDecoration: "underline" }}>Privacidad</Link>.
      </p>
      <div className="cookie-acciones">
        <button className="cookie-btn cookie-rechazar" onClick={() => elegir("rechazado")}>Rechazar</button>
        <button className="cookie-btn cookie-aceptar" onClick={() => elegir("aceptado")}>Aceptar</button>
      </div>
    </div>
  );
}
