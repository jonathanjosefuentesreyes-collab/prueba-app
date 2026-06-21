import Link from "next/link";
import type { Metadata } from "next";
import SuscribirseBtn from "@/components/SuscribirseBtn";
import ChatBar from "@/components/ChatBar";

export const metadata: Metadata = {
  title: "AbogaBot Premium — tu asesor legal sin límites | Ley Chilena",
  description: "Hazte Premium: consultas ilimitadas con AbogaBot, calculadora de finiquito sin límite, sin anuncios y soporte prioritario.",
};

const BENEFICIOS = [
  { t: "Consultas ilimitadas con AbogaBot", d: "Pregunta todo lo que necesites, sin el tope de 3 al día." },
  { t: "Calculadora de finiquito sin límite", d: "Calcula cuantos finiquitos quieras, cuando quieras." },
  { t: "Sin anuncios", d: "Una experiencia limpia, enfocada en tu problema legal." },
  { t: "Guarda y exporta tus consultas", d: "Ten a mano tus respuestas y compártelas." },
  { t: "Soporte prioritario", d: "Te ayudamos primero si tienes dudas con la app." },
];

export default function Premium() {
  return (
    <main style={{ paddingBottom: 20 }}>
      <header className="header">
        <span className="marca" style={{ fontSize: 19 }}>
          <span className="azul">Aboga</span><span className="rojo">Bot</span> Premium
        </span>
      </header>

      <div className="premium-hero">
        {/* AbogaBot dorado: versión Premium (piel gris recoloreada a oro), solo aquí. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/abogabot-premium.png" alt="AbogaBot Premium" className="premium-bot" />
        <h1 className="premium-titulo">Tu asesor legal, sin límites</h1>
        <p className="premium-sub">Desbloquea todo el poder de AbogaBot y resuelve tus dudas legales con calma.</p>
      </div>

      <div className="premium-plan">
        <div className="premium-precio">
          $2.990 <span>/ mes</span>
        </div>
        <ul className="premium-beneficios">
          {BENEFICIOS.map((b) => (
            <li key={b.t}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M20 6 9 17l-5-5" /></svg>
              <span><strong>{b.t}</strong><br /><span className="premium-bdesc">{b.d}</span></span>
            </li>
          ))}
        </ul>
        <SuscribirseBtn />
        <div className="premium-pagos">
          <span className="premium-pagos-label">Métodos de pago que aceptaremos</span>
          <div className="premium-pagos-badges">
            <span className="pago-badge">Webpay</span>
            <span className="pago-badge">Visa</span>
            <span className="pago-badge">Mastercard</span>
            <span className="pago-badge">Mercado Pago</span>
            <span className="pago-badge">Redcompra</span>
          </div>
        </div>
        <p className="nota" style={{ textAlign: "center", marginTop: 10 }}>Cancela cuando quieras · Pago seguro en Chile</p>
      </div>

      <h2 className="seccion-titulo">Herramientas Premium</h2>
      <Link href="/calculadora" className="tarjeta" style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ fontSize: 26 }}>🧮</span>
        <span style={{ flex: 1 }}>
          <strong style={{ fontSize: 15 }}>Calculadora de finiquito</strong><br />
          <span className="nota">Calcula lo que te corresponde según el Código del Trabajo.</span>
        </span>
        <span style={{ color: "var(--azul)", fontWeight: 800, fontSize: 18 }}>→</span>
      </Link>
      <Link href="/facturacion" className="tarjeta" style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 10 }}>
        <span style={{ fontSize: 26 }}>🧾</span>
        <span style={{ flex: 1 }}>
          <strong style={{ fontSize: 15 }}>Calculadora de facturación</strong><br />
          <span className="nota">Boleta de honorarios (retención) e IVA 19%, al instante.</span>
        </span>
        <span style={{ color: "var(--azul)", fontWeight: 800, fontSize: 18 }}>→</span>
      </Link>
      <Link href="/sueldo" className="tarjeta" style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 10 }}>
        <span style={{ fontSize: 26 }}>💰</span>
        <span style={{ flex: 1 }}>
          <strong style={{ fontSize: 15 }}>Calculadora de sueldo líquido</strong><br />
          <span className="nota">Del bruto al líquido: AFP, salud, cesantía e impuesto.</span>
        </span>
        <span style={{ color: "var(--azul)", fontWeight: 800, fontSize: 18 }}>→</span>
      </Link>
      <Link href="/conversor" className="tarjeta" style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 10 }}>
        <span style={{ fontSize: 26 }}>💱</span>
        <span style={{ flex: 1 }}>
          <strong style={{ fontSize: 15 }}>Conversor UF · UTM · Dólar · Euro</strong><br />
          <span className="nota">Valores del día y conversor a pesos, al instante.</span>
        </span>
        <span style={{ color: "var(--azul)", fontWeight: 800, fontSize: 18 }}>→</span>
      </Link>

      <p className="nota" style={{ margin: "18px 2px 0", textAlign: "center" }}>
        ¿Dudas? Escríbenos desde <Link href="/quienes-somos" style={{ color: "var(--azul)" }}>Quiénes somos</Link>.
      </p>
      <ChatBar />
    </main>
  );
}
