"use client";

import { useState } from "react";

// Piezas del límite freemium compartidas por las calculadoras. Antes estaban
// copiadas en cada página (finiquito, sueldo, facturación): el aviso de cuántos
// cálculos gratis quedan y la tarjeta-gancho a Premium cuando se agotan.

// Aviso bajo el botón: cuántos cálculos gratis quedan hoy. `libre` es el texto cuando
// aún quedan; `margenTop` ajusta la separación (las páginas la usan distinta).
export function AvisoUsos({
  sinCalculosHoy,
  libre = "Tienes 1 cálculo gratis hoy",
  margenTop = 2,
}: {
  sinCalculosHoy: boolean;
  libre?: string;
  margenTop?: number;
}) {
  return (
    <p style={{ margin: `${margenTop}px 0 0`, textAlign: "center", fontSize: 12, fontWeight: 600, color: sinCalculosHoy ? "var(--rojo)" : "var(--texto-suave)" }}>
      {sinCalculosHoy ? "Usaste tu cálculo gratis de hoy · ✨ Premium para más" : libre}
    </p>
  );
}

// Tarjeta-gancho que aparece al agotar el cálculo gratis del día. `detalle` describe
// qué desbloquea Premium ("calculas finiquitos sin límite"). El aviso de "en preparación"
// es estado propio de este componente.
export function BloquePremium({ detalle }: { detalle: string }) {
  const [nota, setNota] = useState(false);
  return (
    <div className="tarjeta" style={{ marginTop: 14, textAlign: "center" }}>
      <p style={{ margin: "0 0 4px", fontWeight: 700 }}>Llegaste a tu cálculo gratis de hoy 🙂</p>
      <p className="nota" style={{ margin: "0 0 12px" }}>
        Con <strong>Premium</strong> {detalle}. Tu cálculo gratis se renueva mañana.
      </p>
      <button className="boton-premium" onClick={() => setNota(true)}>✨ Actualizar a Premium</button>
      {nota && <p className="nota" style={{ marginTop: 10 }}>🚧 Los planes Premium están en preparación. ¡Gracias por tu interés!</p>}
    </div>
  );
}
