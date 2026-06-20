import Link from "next/link";

export const metadata = {
  title: "Aviso legal | Leyes de Chile",
  description: "Condiciones de uso de Leyes de Chile: orientación general con fuentes oficiales, no asesoría legal.",
};

export default function AvisoLegal() {
  return (
    <main>
      <header className="header"><span className="marca"><span className="azul">Aviso</span> <span className="rojo">legal</span></span></header>
      <article className="tarjeta" style={{ fontSize: 14.5, lineHeight: 1.7 }}>
        <h2 style={{ fontSize: 16 }}>Orientación general, no asesoría legal</h2>
        <p>
          Leyes de Chile es un servicio de información jurídica para ciudadanos. Los textos
          legales provienen de la fuente oficial (Biblioteca del Congreso Nacional —
          leychile.cl) y cada respuesta del asistente cita los artículos en que se basa.
          Sin embargo, <strong>nada en este sitio constituye asesoría legal profesional</strong>:
          cada caso tiene particularidades que solo un abogado puede evaluar. El uso del sitio
          <strong> no crea una relación abogado-cliente</strong> y no nos hace responsables de
          decisiones tomadas a partir de esta información.
        </p>
        <h2 style={{ fontSize: 16 }}>El asistente usa inteligencia artificial</h2>
        <p>
          AbogaBot responde con un modelo de IA (Gemini, de Google). Está diseñado para citar
          solo artículos reales que existen en nuestra base, pero <strong>puede equivocarse o
          quedar incompleto</strong>. Verifica siempre la fuente citada (te enlazamos al
          artículo en la Biblioteca) antes de actuar, y ante cualquier duda consulta a un
          profesional.
        </p>
        <h2 style={{ fontSize: 16 }}>Si necesitas un abogado</h2>
        <p>
          La <strong>Corporación de Asistencia Judicial</strong> entrega asesoría gratuita
          (cajmetro.cl y sedes regionales), y las clínicas jurídicas universitarias también
          atienden sin costo. Para urgencias: 133 Carabineros · 1455 violencia contra la
          mujer · *4141 prevención del suicidio.
        </p>
        <h2 style={{ fontSize: 16 }}>Exactitud y vigencia</h2>
        <p>
          Las normas se sincronizan periódicamente con la BCN y cada ley muestra su fecha de
          versión. Aun así pueden existir desfases entre una reforma publicada y su
          actualización aquí; el texto auténtico es siempre el del Diario Oficial y leychile.cl.
        </p>
        <p className="nota">Los cálculos (como el finiquito) son estimaciones referenciales con fórmulas del Código del Trabajo y deben verificarse antes de firmar cualquier documento.</p>
        <p><Link href="/" style={{ color: "var(--azul)", fontWeight: 700 }}>← Volver al inicio</Link></p>
      </article>
    </main>
  );
}
