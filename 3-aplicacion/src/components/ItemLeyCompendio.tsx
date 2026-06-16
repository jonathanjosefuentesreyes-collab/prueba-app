import Link from "next/link";
import { nombreDe, type Norma } from "@/lib/db";

// Una tarjeta de ley en la Biblioteca. Antes cada tarjeta llevaba ~15 estilos inline
// repetidos; con cientos de tarjetas, el HTML pesaba ~458 KB y la página se sentía
// trabada en el celular. Ahora los estilos viven en CSS (.item-ley-compendio y .ilc-*).
function insignia(n: Norma): string {
  const nom = (n.nombre_corto || n.titulo || "").toLowerCase();
  if (nom.includes("constituci")) return "Constitución";
  if (nom.includes("código") || nom.includes("codigo")) return "Código";
  if (n.tipo) return n.tipo;
  if (n.numero_norma) return n.numero_norma.split(" ")[0];
  return "Norma";
}

export default function ItemLeyCompendio({ n }: { n: Norma }) {
  return (
    <Link href={`/leyes/${n.id}`} className="item-ley-compendio">
      <span className="ilc-insignia">{insignia(n).toUpperCase()}</span>
      <span className="ilc-cuerpo">
        <span className="ilc-nombre">{nombreDe(n)}</span>
        <span className="ilc-meta">
          <span className="ilc-num">{n.numero_norma || n.tipo || "Norma"}</span>
          <span className="ilc-dato">· {n.fecha_version ? n.fecha_version.split("-")[0] : "s/i"}</span>
          <span className="ilc-dato">· {n.total_articulos} arts.</span>
        </span>
      </span>
      <svg className="ilc-flecha" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
      </svg>
    </Link>
  );
}
