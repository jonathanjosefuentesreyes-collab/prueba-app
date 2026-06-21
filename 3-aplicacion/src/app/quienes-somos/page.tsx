import Link from "next/link";

export const metadata = {
  title: "Quiénes somos | Leyes de Chile",
  description: "Por qué existe Leyes de Chile: hacer la ley entendible y verificable para cualquier persona.",
};

export default function QuienesSomos() {
  return (
    <main>
      <header className="header"><span className="marca"><span className="azul">Quiénes</span> <span className="rojo">somos</span></span></header>
      <article className="tarjeta" style={{ fontSize: 14.5, lineHeight: 1.7 }}>
        <h2 style={{ fontSize: 16 }}>La ley, entendible para todos</h2>
        <p>
          Leyes de Chile nació de una convicción simple: <strong>conocer tus derechos no
          debería requerir un abogado</strong>. Las leyes chilenas son públicas, pero están
          escritas para especialistas y dispersas en miles de textos.
        </p>
        <p>
          Por eso construimos una biblioteca con las normas vigentes descargadas de la
          fuente oficial (Biblioteca del Congreso Nacional), un buscador que entiende cómo
          habla la gente («me echaron sin aviso»), una calculadora de finiquito que muestra
          cada fórmula con su artículo, y AbogaBot: un asistente que responde en simple y
          <strong> siempre cita los artículos reales</strong> en que se basa — si no tiene
          la respuesta en la ley, te lo dice honestamente.
        </p>
        <h2 style={{ fontSize: 16 }}>Proyecto independiente</h2>
        <p>
          Somos un proyecto chileno independiente, sin afiliación con el Estado ni con
          estudios jurídicos. El sitio se financia con publicidad para mantenerse gratuito.
        </p>
        <p>Contacto: <strong>jonathanjosefuentesreyes@gmail.com</strong></p>
        <p><Link href="/" style={{ color: "var(--azul)", fontWeight: 700 }}>← Volver al inicio</Link></p>
      </article>
    </main>
  );
}
