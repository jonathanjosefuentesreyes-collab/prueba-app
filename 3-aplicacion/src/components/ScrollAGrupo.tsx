"use client";

import { useEffect } from "react";

// Al llegar a /leyes?grupo=X (desde el acceso rápido de la home), desplaza la vista
// hasta el acordeón de ese grupo (que ya viene abierto desde el servidor).
export default function ScrollAGrupo({ grupo }: { grupo?: string }) {
  useEffect(() => {
    if (!grupo) return;
    const el = document.getElementById(`grupo-${grupo}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [grupo]);
  return null;
}
