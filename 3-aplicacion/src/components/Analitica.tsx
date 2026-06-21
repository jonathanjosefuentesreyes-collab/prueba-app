"use client";

import Script from "next/script";
import { GA_MEASUREMENT_ID } from "@/lib/analitica";

// Carga Google Analytics 4 SOLO si hay un Measurement ID configurado. Es consent-aware:
// el Consent Mode v2 niega analytics_storage por defecto, así que GA no usa cookies hasta
// que el usuario acepta en el banner.
export default function Analitica() {
  if (!GA_MEASUREMENT_ID) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = window.gtag || gtag;
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  );
}
