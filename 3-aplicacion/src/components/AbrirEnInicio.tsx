"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// En la app INSTALADA (modo standalone), al abrir o recargar lleva a Inicio. En el
// navegador normal y para los crawlers de Google NO hace nada (SEO y deep-links intactos).
// Solo corre en la carga inicial del documento (este componente del layout no se vuelve a
// montar al navegar con <Link>), así que no interrumpe la navegación interna.
export default function AbrirEnInicio() {
  const router = useRouter();
  useEffect(() => {
    const nav = window.navigator as unknown as { standalone?: boolean };
    const standalone =
      window.matchMedia?.("(display-mode: standalone)").matches || nav.standalone === true;
    if (standalone && window.location.pathname !== "/") router.replace("/");
  }, [router]);
  return null;
}
