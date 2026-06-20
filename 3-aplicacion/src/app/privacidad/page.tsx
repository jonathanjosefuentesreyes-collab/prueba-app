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
          servidores y mediante la API de Gemini (Google). <strong>No incluyas datos
          personales identificables</strong> (RUT, nombres completos, direcciones, datos de
          tu caso) en tus preguntas: en el plan gratuito de la API, Google puede usar el
          contenido enviado para mejorar sus modelos. No vendemos ni compartimos tus
          consultas con terceros para otros fines.
        </p>
        <h2 style={{ fontSize: 16 }}>Cookies y publicidad</h2>
        <p>
          El sitio se financia con publicidad. Cuando los anuncios estén activos, Google
          AdSense podrá usar cookies para mostrar avisos relevantes; podrás aceptar o
          rechazar su uso desde el aviso de cookies y gestionar tu consentimiento conforme a
          las políticas de Google.
        </p>
        <h2 style={{ fontSize: 16 }}>Tus derechos sobre tus datos</h2>
        <p>
          De acuerdo con la ley chilena de protección de datos personales (Ley 19.628 y la
          Ley 21.719, que la moderniza y rige desde el 1 de diciembre de 2026), tienes
          derecho a <strong>acceder, rectificar, cancelar (eliminar), oponerte al tratamiento
          y solicitar la portabilidad</strong> de tus datos. Como el sitio funciona sin
          cuentas y tus guardados viven solo en tu navegador, en la práctica controlas tú
          mismo esa información desde la pestaña Guardadas; para cualquier otra solicitud,
          escríbenos al contacto de más abajo.
        </p>
        <h2 style={{ fontSize: 16 }}>Contacto</h2>
        <p>Escríbenos a <strong>jonathanjosefuentesreyes@gmail.com</strong> para ejercer tus derechos o cualquier solicitud sobre tus datos.</p>
        <p><Link href="/" style={{ color: "var(--azul)", fontWeight: 700 }}>← Volver al inicio</Link></p>
      </article>
    </main>
  );
}
