"use client";

import Script from "next/script";

// Google Consent Mode v2. Por defecto NIEGA el consentimiento de anuncios y analítica
// (ad_storage, ad_user_data, ad_personalization, analytics_storage) hasta que el usuario
// acepte en el banner de cookies. Es la base técnica para servir AdSense de forma conforme
// a usuarios de la UE; se complementa con el mensaje GDPR certificado de Google ("Privacy &
// messaging" en el panel de AdSense). Debe correr ANTES de los scripts de Google.
export default function ConsentMode() {
  return (
    // beforeInteractive es OBLIGATORIO aquí: el consentimiento por defecto (denegado) debe
    // fijarse ANTES de que carguen los scripts de Google. En App Router este es el lugar
    // correcto, así que silenciamos la regla pensada para el pages router.
    // eslint-disable-next-line @next/next/no-before-interactive-script-outside-document
    <Script id="consent-mode-v2" strategy="beforeInteractive">
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        window.gtag = window.gtag || gtag;
        gtag('consent', 'default', {
          ad_storage: 'denied',
          ad_user_data: 'denied',
          ad_personalization: 'denied',
          analytics_storage: 'denied',
          wait_for_update: 500
        });
        try {
          if (localStorage.getItem('consentimiento_cookies') === 'aceptado') {
            gtag('consent', 'update', {
              ad_storage: 'granted',
              ad_user_data: 'granted',
              ad_personalization: 'granted',
              analytics_storage: 'granted'
            });
          }
        } catch (e) {}
      `}
    </Script>
  );
}
