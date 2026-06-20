import Link from "next/link";

// Columna derecha SOLO en escritorio ancho (≥1280px), estilo gob.cl/Fonasa: accesos
// rápidos útiles. Aquí también irán los anuncios (AdSense) cuando se aprueben. En móvil
// y tablet no se muestra (CSS).
export default function RielEscritorio() {
  return (
    <aside className="riel" aria-label="Accesos rápidos">
      <Link href="/chat" className="riel-card riel-bot">
        <span className="riel-bot-tit">¿Tienes una duda legal?</span>
        <span className="riel-bot-sub">Pregúntale gratis a <strong>AbogaBot</strong>, te orienta con la ley en la mano.</span>
        <span className="riel-bot-cta">Abrir AbogaBot →</span>
      </Link>

      <div className="riel-card">
        <span className="riel-tit">Herramientas</span>
        <Link href="/calculadora" className="riel-link">🧮 Calculadora de finiquito</Link>
        <Link href="/facturacion" className="riel-link">🧾 Calculadora de facturación</Link>
      </div>

      <div className="riel-card">
        <span className="riel-tit">Explora</span>
        <Link href="/leyes" className="riel-link">📚 Biblioteca de leyes</Link>
        <Link href="/guias" className="riel-link">💡 Guías ciudadanas</Link>
        <Link href="/premium" className="riel-link">👑 Hazte Premium</Link>
      </div>

      {/* Espacio reservado para anuncios (AdSense) cuando se apruebe la cuenta. */}
    </aside>
  );
}
