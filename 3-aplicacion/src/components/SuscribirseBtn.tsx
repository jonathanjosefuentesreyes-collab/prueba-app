"use client";

import { useState } from "react";

// Inicia el flujo de pago. Cuando haya pasarela configurada (Flow / Mercado Pago /
// Webpay), /api/checkout devuelve { url } y redirigimos. Mientras no exista proveedor,
// mostramos un estado "en preparación" para no prometer un pago que aún no funciona.
export default function SuscribirseBtn() {
  const [estado, setEstado] = useState<"idle" | "cargando" | "prox">("idle");

  async function suscribir() {
    setEstado("cargando");
    try {
      const r = await fetch("/api/checkout", { method: "POST" });
      const j = await r.json();
      if (j?.url) {
        window.location.href = j.url; // pasarela de pago
        return;
      }
      setEstado("prox");
    } catch {
      setEstado("prox");
    }
  }

  return (
    <div>
      <button
        className="boton-premium"
        style={{ width: "100%", justifyContent: "center", padding: "13px", fontSize: 15 }}
        onClick={suscribir}
        disabled={estado === "cargando"}
      >
        {estado === "cargando" ? "Conectando…" : "✨ Suscribirme a Premium"}
      </button>
      {estado === "prox" && (
        <p className="nota" style={{ marginTop: 10, textAlign: "center", lineHeight: 1.5 }}>
          🚧 Estamos habilitando los pagos (Webpay / Mercado Pago). Te avisaremos apenas esté
          listo. ¡Gracias por querer apoyar el proyecto!
        </p>
      )}
    </div>
  );
}
