"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// Íconos line-art (mismo estilo trazo que el resto de la app)
const ic = {
  leyes: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  ),
  guardados: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  ),
  inicio: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="m3 10 9-7 9 7" /><path d="M5 9v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9" /><path d="M9 21v-6h6v6" />
    </svg>
  ),
  guias: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M2 5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v15a1.5 1.5 0 0 0-1.5-1.5H4A2 2 0 0 1 2 17z" /><path d="M22 5a2 2 0 0 0-2-2h-6a2 2 0 0 0-2 2v15a1.5 1.5 0 0 1 1.5-1.5H20a2 2 0 0 0 2-2z" />
    </svg>
  ),
  premium: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 16 3 7l5.5 4.5L12 5l3.5 6.5L21 7l-2 9z" /><path d="M5 19.5h14" />
    </svg>
  ),
};

// 5 pestañas independientes, de izq. a der.: Leyes · Guías · Inicio · Guardados · Premium
// (Inicio al centro). Las 3 antes agrupadas en la Biblioteca (Biblioteca/Guardados/Guía)
// ahora son destinos propios. La Calculadora de finiquito vive dentro de /premium.
const items = [
  { href: "/leyes", etiqueta: "Leyes", icono: ic.leyes, activo: (r: string) => r.startsWith("/leyes") },
  { href: "/guias", etiqueta: "Guías", icono: ic.guias, activo: (r: string) => r.startsWith("/guias") },
  { href: "/", etiqueta: "Inicio", icono: ic.inicio, activo: (r: string) => r === "/" },
  { href: "/guardadas", etiqueta: "Guardados", icono: ic.guardados, activo: (r: string) => r.startsWith("/guardadas") },
  { href: "/premium", etiqueta: "Premium", icono: ic.premium, activo: (r: string) => r.startsWith("/premium") },
];

export default function BottomNav() {
  const ruta = usePathname();
  return (
    <nav className="nav-inferior" aria-label="Navegación principal">
      {items.map((i) => (
        <Link key={i.href} href={i.href} className={i.activo(ruta) ? "activo" : ""}>
          {i.icono}
          {i.etiqueta}
        </Link>
      ))}
    </nav>
  );
}
