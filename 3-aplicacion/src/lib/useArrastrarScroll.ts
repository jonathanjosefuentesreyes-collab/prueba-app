"use client";

// Hook reutilizable: convierte cualquier contenedor con scroll horizontal en uno que
// también se ARRASTRA con el mouse (drag-to-scroll), como deslizar en el celular.
//
// El arrastre vive SOLO entre apretar y soltar el botón: al hacer mousedown se enganchan
// listeners en la ventana (mousemove + mouseup) y al soltar (en cualquier parte) se quitan.
// Así nunca queda "activo" sin tener el click presionado. Si el gesto fue un arrastre (no
// un click), se cancela el click para no abrir el enlace que quedó debajo.
import { useRef } from "react";

export function useArrastrarScroll<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const st = useRef({ inicioX: 0, scroll: 0, arrastro: false });

  function onMouseDown(e: React.MouseEvent) {
    const el = ref.current;
    if (!el || e.button !== 0) return; // solo botón izquierdo
    st.current = { inicioX: e.pageX, scroll: el.scrollLeft, arrastro: false };
    el.classList.add("arrastrando");

    const mover = (ev: MouseEvent) => {
      const dx = ev.pageX - st.current.inicioX;
      if (Math.abs(dx) > 4) st.current.arrastro = true;
      el.scrollLeft = st.current.scroll - dx;
    };
    const soltar = () => {
      el.classList.remove("arrastrando");
      window.removeEventListener("mousemove", mover);
      window.removeEventListener("mouseup", soltar);
    };
    window.addEventListener("mousemove", mover);
    window.addEventListener("mouseup", soltar);
  }

  function onClickCapture(e: React.MouseEvent) {
    if (st.current.arrastro) {
      e.preventDefault();
      e.stopPropagation();
      st.current.arrastro = false;
    }
  }

  return { ref, onMouseDown, onClickCapture };
}
