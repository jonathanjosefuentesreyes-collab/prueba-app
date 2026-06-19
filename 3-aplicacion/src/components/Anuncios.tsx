"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { ADSENSE_CLIENT } from "@/lib/adsense";
import { consintioCookies } from "./ConsentimientoCookies";

// Carga el script de AdSense SOLO si (1) hay un ID configurado y (2) el usuario aceptó las
// cookies. Si falta cualquiera de las dos, no inyecta nada. Reacciona al evento de consentimiento.
export default function Anuncios() {
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (consintioCookies()) setOk(true);
    const al = (e: Event) => { if ((e as CustomEvent).detail === "aceptado") setOk(true); };
    window.addEventListener("consentimiento", al);
    return () => window.removeEventListener("consentimiento", al);
  }, []);

  if (!ADSENSE_CLIENT || !ok) return null;

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
