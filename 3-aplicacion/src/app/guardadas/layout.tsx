import type { Metadata } from "next";

// La página de guardados es un componente cliente (lee localStorage), así que no puede
// exportar metadata por sí misma. Este layout de segmento le fija el noindex: es contenido
// personal del usuario, vacío para el rastreador → no debe indexarse (señal de bajo valor).
export const metadata: Metadata = {
  title: "Tus guardados | Leyes de Chile",
  robots: { index: false, follow: true },
};

export default function GuardadasLayout({ children }: { children: React.ReactNode }) {
  return children;
}
