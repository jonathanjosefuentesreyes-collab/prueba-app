"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ic = {
  leyes: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="m14 13-8.5 8.5a2.12 2.12 0 1 1-3-3L11 10" /><path d="m16 16 6 6" /><path d="m8 8 6-6 6 6-6 6z" />
    </svg>
  ),
  inicio: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="m3 10 9-7 9 7" /><path d="M5 9v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9" /><path d="M9 21v-6h6v6" />
    </svg>
  ),
  calc: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="4" y="2" width="16" height="20" rx="2" /><path d="M8 6h8" /><path d="M8 11h.01M12 11h.01M16 11h.01M8 15h.01M12 15h.01M16 15h.01M8 19h.01M12 19h.01M16 19h.01" />
    </svg>
  ),
  guardadas: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M19 21 12 16 5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
  ),
};

// "Guardadas" se quitó del menú: ya vive como pestaña ❤️ dentro de la Biblioteca
// (BibliotecaHeader) y el corazón está en cada artículo. Quedan 3 botones.
const items = [
  { href: "/leyes", etiqueta: "Todas las Leyes", icono: ic.leyes },
  { href: "/", etiqueta: "Inicio", icono: ic.inicio },
  { href: "/calculadora", etiqueta: "Calculadora", icono: ic.calc },
];

export default function BottomNav() {
  const ruta = usePathname();
  return (
    <nav className="nav-inferior" aria-label="Navegación principal">
      {items.map((i) => {
        const activo = i.href === "/"
          ? ruta === "/"
          : i.href === "/leyes"
            ? (ruta.startsWith("/leyes") || ruta.startsWith("/guias") || ruta.startsWith("/guardadas"))
            : ruta.startsWith(i.href);
        return (
          <Link key={i.href} href={i.href} className={activo ? "activo" : ""}>
            {i.icono}
            {i.etiqueta}
          </Link>
        );
      })}
    </nav>
  );
}
