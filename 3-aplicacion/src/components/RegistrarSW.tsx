"use client";

import { useEffect } from "react";

// Registra el service worker (público en /sw.js) para que la app sea instalable como PWA
// y abra offline con lo último visto. Falla en silencio si el navegador no lo soporta.
export default function RegistrarSW() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }
  }, []);
  return null;
}
