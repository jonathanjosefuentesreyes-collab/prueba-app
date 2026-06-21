"use client";

// Hook reutilizable: convierte cualquier contenedor con scroll horizontal en uno que
// también se ARRASTRA con el mouse (drag-to-scroll), como deslizar en el celular.
// Devuelve un ref y los handlers para esparcir sobre el contenedor. Si el gesto fue un
// arrastre (no un click), cancela el click para no abrir el enlace que quedó debajo.
import { useRef } from "react";

export function useArrastrarScroll<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const st = useRef({ abajo: false, inicioX: 0, scroll: 0, arrastro: false });

  function onMouseDown(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    st.current = { abajo: true, inicioX: e.pageX, scroll: el.scrollLeft, arrastro: false };
    el.classList.add("arrastrando");
  }
  function onMouseMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el || !st.current.abajo) return;
    const dx = e.pageX - st.current.inicioX;
    if (Math.abs(dx) > 4) st.current.arrastro = true;
    el.scrollLeft = st.current.scroll - dx;
  }
  function finalizar() {
    const el = ref.current;
    if (!el) return;
    st.current.abajo = false;
    el.classList.remove("arrastrando");
  }
  function onClickCapture(e: React.MouseEvent) {
    if (st.current.arrastro) {
      e.preventDefault();
      e.stopPropagation();
      st.current.arrastro = false;
    }
  }

  return { ref, onMouseDown, onMouseMove, onMouseUp: finalizar, onMouseLeave: finalizar, onClickCapture };
}
