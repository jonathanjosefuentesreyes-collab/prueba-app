import Link from "next/link";
import type { Metadata } from "next";

const BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://leyesdechile.com";

export const metadata: Metadata = {
  title: "Estándar editorial y de calidad | Ley Chilena",
  description:
    "Cómo elaboramos y verificamos el contenido legal de Ley Chilena: fuentes oficiales de la BCN, citas verificadas artículo por artículo, fechas de revisión y límites del asistente con IA.",
  alternates: { canonical: `${BASE}/estandar-editorial` },
};

export default function EstandarEditorial() {
  const hoy = new Date().toLocaleDateString("es-CL", { day: "2-digit", month: "long", year: "numeric" });
  return (
    <main style={{ paddingBottom: 80 }}>
      <header className="header" style={{ justifyContent: "flex-start", gap: 12 }}>
        <Link href="/" aria-label="Volver al inicio" style={{ display: "flex" }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M15 18l-6-6 6-6" /></svg>
        </Link>
        <span className="marca" style={{ fontSize: 17 }}><span className="azul">Estándar</span> <span className="rojo">editorial</span></span>
      </header>

      <nav className="migas" aria-label="Ruta de navegación">
        <Link href="/">Inicio</Link>
        <span aria-hidden>›</span>
        <span className="migas-actual">Estándar editorial</span>
      </nav>

      <article className="tarjeta guia-content" style={{ lineHeight: 1.6 }}>
        <h1 style={{ fontSize: "calc(20px * var(--escala-letra, 1))", margin: "0 0 6px", color: "var(--azul)", fontFamily: "var(--font-titulo), serif" }}>
          Cómo hacemos y verificamos el contenido
        </h1>
        <p className="nota" style={{ margin: "0 0 16px" }}>Última revisión de esta política: {hoy}.</p>

        <h2 style={{ fontSize: 17, color: "var(--azul)", margin: "18px 0 6px", fontFamily: "var(--font-titulo), serif" }}>Fuente oficial</h2>
        <p>
          Los textos de las leyes provienen de la <strong>Biblioteca del Congreso Nacional de Chile (BCN)</strong>,
          la fuente oficial de la legislación chilena. Atribuimos cada norma a la BCN y enlazamos de vuelta a
          leychile.cl. No alteramos el texto de la ley: el modo <strong>Lenguaje Simple</strong> genera una
          explicación separada y marcada, nunca reemplaza el artículo oficial.
        </p>

        <h2 style={{ fontSize: 17, color: "var(--azul)", margin: "18px 0 6px", fontFamily: "var(--font-titulo), serif" }}>Citas verificadas</h2>
        <p>
          Cada artículo que citamos en una guía o que entrega el asistente se <strong>verifica contra nuestra base
          de datos</strong> antes de mostrarse: el enlace apunta al artículo exacto y su texto respalda lo que se
          afirma. No publicamos referencias a normas o artículos que no existan en la fuente.
        </p>

        <h2 style={{ fontSize: 17, color: "var(--azul)", margin: "18px 0 6px", fontFamily: "var(--font-titulo), serif" }}>Fechas y actualización</h2>
        <p>
          Cada guía muestra su <strong>fecha de actualización</strong>. Los valores que cambian con el tiempo
          (UF, UTM, dólar, euro) se refrescan automáticamente cada semana desde el Banco Central. Aun así, las
          leyes cambian: ante cualquier trámite, confirma la versión vigente en la fuente oficial.
        </p>

        <h2 style={{ fontSize: 17, color: "var(--azul)", margin: "18px 0 6px", fontFamily: "var(--font-titulo), serif" }}>El asistente es IA</h2>
        <p>
          <strong>AbogaBot</strong> es un asistente con inteligencia artificial (Google Gemini). Puede equivocarse;
          por eso cita los artículos oficiales para que verifiques, y cada respuesta incluye un aviso de que es
          orientación general. No escribas datos personales sensibles en el chat.
        </p>

        <h2 style={{ fontSize: 17, color: "var(--azul)", margin: "18px 0 6px", fontFamily: "var(--font-titulo), serif" }}>Orientación, no asesoría</h2>
        <p>
          Ley Chilena entrega <strong>información y orientación general</strong>, no asesoría jurídica para tu caso
          particular, y no genera una relación abogado-cliente. Para decisiones concretas, consulta a un abogado o
          a la <a href="https://www.cajmetropolitana.cl" target="_blank" rel="noopener noreferrer" style={{ color: "var(--azul)" }}>Corporación de Asistencia Judicial</a> (gratis).
        </p>

        <h2 style={{ fontSize: 17, color: "var(--azul)", margin: "18px 0 6px", fontFamily: "var(--font-titulo), serif" }}>Correcciones</h2>
        <p>
          ¿Viste un error o una norma desactualizada? Escríbenos desde{" "}
          <Link href="/quienes-somos" style={{ color: "var(--azul)" }}>Quiénes somos</Link> y lo corregimos. La
          exactitud está por sobre el volumen.
        </p>
      </article>

      <p className="nota" style={{ marginTop: 14, textAlign: "center", fontSize: 12 }}>
        <Link href="/quienes-somos" style={{ color: "var(--azul)" }}>Quiénes somos</Link>{" · "}
        <Link href="/privacidad" style={{ color: "var(--azul)" }}>Privacidad</Link>{" · "}
        <Link href="/aviso-legal" style={{ color: "var(--azul)" }}>Aviso legal</Link>
      </p>
    </main>
  );
}
