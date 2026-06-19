"use client";

import Script from "next/script";
import { ADSENSE_CLIENT } from "@/lib/adsense";

// Carga el script de AdSense cuando hay un ID configurado. Debe estar presente sin gating
// para que Google pueda VERIFICAR y revisar el sitio. El cumplimiento por región (consentimiento
// EEA/GDPR) lo maneja el "mensaje de privacidad" que se activa en el panel de AdSense; el banner
// propio de la app informa y enlaza a /privacidad. Si no hay ID, no inyecta nada.
export default function Anuncios() {
  if (!ADSENSE_CLIENT) return null;
  return (
    <Script
      id="adsbygoogle-init"
      async
      strategy="afterInteractive"
      crossOrigin="anonymous"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
    />
  );
}
