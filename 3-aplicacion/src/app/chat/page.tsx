import { Suspense } from "react";
import ChatClient from "@/components/ChatClient";

// La interfaz del chat es una app cliente: para el rastreador es una página vacía (sin
// contenido único). Va noindex; su valor se captura desde las guías y leyes que enlazan aquí.
export const metadata = {
  title: "AbogaBot — tu asistente legal | Leyes de Chile",
  robots: { index: false, follow: true },
};

export default function Chat() {
  return (
    <Suspense>
      <ChatClient />
    </Suspense>
  );
}
