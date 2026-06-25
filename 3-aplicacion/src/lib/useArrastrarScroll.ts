"use client";

// Hook reutilizable: convierte cualquier contenedor con scroll horizontal en uno que
// también se ARRASTRA con el mouse (drag-to-scroll), como deslizar en el celular.
//
// Distinción CLIC vs ARRASTRE (clave en escritorio): un clic normal —aunque la mano
// tiemble un poco— NO debe contar como arrastre ni cancelar el enlace de la tarjeta. Por eso
// solo se considera arrastre cuando el movimiento horizontal supera un umbral claro (8px);
// recién ahí se activa el modo "arrastrando" (quita el snap, cursor de agarre, sin
// selección) y se cancela el clic. Si el gesto fue un clic limpio, la navegación pasa normal.
import { useRef } from "react";

export function useArrastrarScroll<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const st = useRef({ inicioX: 0, scroll: 0, arrastro: false, presionado: false });

  function onMouseDown(e: React.MouseEvent) {
    const el = ref.current;
    if (!el || e.button !== 0) return; // solo botón izquierdo
    st.current = { inicioX: e.pageX, scroll: el.scrollLeft, arrastro: false, presionado: true };

    const mover = (ev: MouseEvent) => {
      if (!st.current.presionado) return;
      const dx = ev.pageX - st.current.inicioX;
      // Recién al superar el umbral se trata como arrastre real.
      if (!st.current.arrastro && Math.abs(dx) > 8) {
        st.current.arrastro = true;
        el.classList.add("arrastrando");
      }
      if (st.current.arrastro) {
        ev.preventDefault(); // evita seleccionar texto mientras se arrastra
        el.scrollLeft = st.current.scroll - dx;
      }
    };
    const soltar = () => {
      st.current.presionado = false;
      el.classList.remove("arrastrando");
      window.removeEventListener("mousemove", mover);
      window.removeEventListener("mouseup", soltar);
    };
    window.addEventListener("mousemove", mover);
    window.addEventListener("mouseup", soltar);
  }

  // Fase de captura: si el gesto fue un ARRASTRE real, cancela el clic para no abrir el
  // enlace que quedó debajo. Un clic limpio (sin arrastre) deja pasar la navegación.
  function onClickCapture(e: React.MouseEvent) {
    if (st.current.arrastro) {
      e.preventDefault();
      e.stopPropagation();
      st.current.arrastro = false;
    }
  }

  return { ref, onMouseDown, onClickCapture };
}
