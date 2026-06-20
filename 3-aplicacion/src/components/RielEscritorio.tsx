import ChatRiel from "./ChatRiel";

// Columna derecha SOLO en escritorio ancho (≥1280px): aloja el chat de AbogaBot
// docked (conversación arriba, input abajo). En móvil y tablet no se muestra (CSS),
// donde el chat se abre desde la barra flotante.
export default function RielEscritorio() {
  return (
    <aside className="riel" aria-label="AbogaBot — asistente legal">
      <ChatRiel />
    </aside>
  );
}
