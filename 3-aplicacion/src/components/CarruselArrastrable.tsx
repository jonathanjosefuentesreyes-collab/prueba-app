"use client";

// Envuelve un carrusel horizontal y permite ARRASTRARLO con el mouse (drag-to-scroll)
// en escritorio, además del scroll táctil en móvil.
import { useArrastrarScroll } from "@/lib/useArrastrarScroll";

export default function CarruselArrastrable({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const arrastrar = useArrastrarScroll<HTMLDivElement>();
  return (
    <div className={className} {...arrastrar}>
      {children}
    </div>
  );
}
