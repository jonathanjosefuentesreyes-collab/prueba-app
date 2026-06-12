import Link from "next/link";

export const metadata = {
  title: "Política de privacidad | Leyes de Chile",
  description: "Qué datos trata Leyes de Chile y cómo: sin cuentas, guardados solo en tu dispositivo, consultas procesadas para responder.",
};

export default function Privacidad() {
  return (
    <main>
      <header className="header"><span className="marca"><span className="azul">Privacidad</span></span></header>
      <article className="tarjeta" style={{ fontSize: 14.5, lineHeight: 1.7 }}>
        <h2 style={{ fontSize: 16 }}>Sin cuentas ni registro</h2>
        <p>
          No pedimos nombre, correo ni datos personales para usar el sitio. Tus leyes y
          consultas guardadas se almacenan <strong>solo en tu propio navegador</strong>
          (localStorage) y puedes borrarlas cuando quieras desde la pestaña Guardadas.
        </p>
        <h2 style={{ fontSize: 16 }}>El chat</h2>
        <p>
          Para generar cada respuesta, el texto de tu consulta se procesa en nuestros
          servidores y mediante la API de Gemini (Google). Te recomendamos no incluir datos
          personales identificables (RUT, nombres completos, direcciones) en tus preguntas.
          No vendemos ni compartimos tus consultas con terceros para otros fines.
        </p>
        <h2 style={{ fontSize: 16 }}>Cookies y publicidad</h2>
        <p>
          El sitio se financia con publicidad. Cuando los anuncios estén activos, Google
          AdSense podrá usar cookies para mostrar avisos relevantes; podrás gestionar tu
          consentimiento conforme a las políticas de Google y a la ley chilena (Ley 19.628
          sobre protección de la vida privada y sus actualizaciones).
        </p>
        <h2 style={{ fontSize: 16 }}>Contacto</h2>
        <p>Escríbenos a <strong>jonathanjosefuentesreyes@gmail.com</strong> para cualquier solicitud sobre tus datos.</p>
        <p><Link href="/" style={{ color: "var(--azul)", fontWeight: 700 }}>← Volver al inicio</Link></p>
      </article>
    </main>
  );
}
