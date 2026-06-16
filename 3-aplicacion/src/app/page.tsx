import Link from "next/link";
import { ultimasPublicaciones, normasPopulares, nombreDe, MATERIAS } from "@/lib/db";
import ChatBar from "@/components/ChatBar";

const COLORES: Record<string, string> = {
  laboral: "#0039A6",
  familia: "#CE1126",
  civil: "#0E7A4E",
  penal: "#6B2FA8",
  comercial: "#C2630F",
  tributario: "#0B7C86",
};

const ICONOS: Record<string, React.ReactNode> = {
  laboral: <path d="M4 8h16v12H4zM9 8V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M4 13h16" />,
  familia: <path d="M7 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Zm10 0a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM2.5 21v-5a3 3 0 0 1 3-3h3a3 3 0 0 1 3 3v5m1-8h3a3 3 0 0 1 3 3v5" />,
  civil: <path d="M3 21h18M4 9h16l-8-6zM6 9v9m4-9v9m4-9v9m4-9v9" />,
  penal: (
    <>
      <path d="m14.5 12.5-8 8a2.12 2.12 0 1 1-3-3l8-8" />
      <path d="m16 16 6-6" />
      <path d="m8 8 6-6" />
      <path d="m9 7 8 8" />
      <path d="m21 11-8-8" />
      <path d="M4 21h9" />
    </>
  ),
  comercial: <path d="M4 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16M4 21h16M9 7h2m-2 4h2m-2 4h2m5 6v-8h4v8" />,
  tributario: <path d="M6 2h9l5 5v15H6zM14 2v6h6M9 13h6m-6 4h6" />,
};

function fechaCorta(f: string | null): string {
  if (!f) return "";
  const d = new Date(f + "T12:00:00");
  return d.toLocaleDateString("es-CL", { day: "2-digit", month: "short", year: "numeric" });
}

// Nombre para la tarjeta del carrusel: si el nombre curado es solo el número crudo
// ("LEY 8572", "DFL 1"), mostramos el título descriptivo en formato oración.
function nombreCarrusel(n: { nombre_corto: string | null; titulo: string }): string {
  const nom = n.nombre_corto || n.titulo;
  if (/^(ley|dfl|dl|decreto)\s/i.test(nom) && n.titulo) {
    return n.titulo.charAt(0).toUpperCase() + n.titulo.slice(1).toLowerCase();
  }
  return nom;
}

export default function Inicio() {
  const ultimas = ultimasPublicaciones(6);
  const populares = normasPopulares();

  return (
    <main style={{ paddingBottom: 132 }}>
      <header className="header">
        <Link href="/leyes" aria-label="Ver todas las leyes de Chile" style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="logo-inicio" src="/logo-medallon.png" alt="Logo Leyes de Chile" />
          <span className="marca">
            <span className="azul">Leyes</span> <span className="rojo">de Chile</span>
          </span>
        </Link>
      </header>

      <Link href="/leyes" className="hero" aria-label="Ver todas las leyes">
        <span className="hero-bandera" />
        <span className="hero-canton"><span className="hero-estrella">★</span></span>
        <span className="hero-titulo">TODAS LAS LEYES</span>
      </Link>

      <h2 className="seccion-titulo">Acceso rápido por materia</h2>
      <div className="materias">
        {Object.entries(MATERIAS).map(([clave, m]) => (
          <Link key={clave} href={`/leyes?materia=${clave}`} className="materia" style={{ color: COLORES[clave] }}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              {ICONOS[clave]}
            </svg>
            <span style={{ color: "var(--texto)" }}>{m.etiqueta.toUpperCase()}</span>
          </Link>
        ))}
      </div>

      <h2 className="seccion-titulo">
        Leyes más recientes
        <Link href="/leyes">Ver Diario Oficial</Link>
      </h2>
      <div className="carrusel-leyes">
        {ultimas.map((n, i) => (
          <Link key={n.id} href={`/leyes/${n.id}`} className={`carrusel-card ${["azul", "blanco", "rojo"][i % 3]}`}>
            <span className="carrusel-badge">{n.numero_norma || n.tipo || "NORMA"}</span>
            <span className="carrusel-nombre">{nombreCarrusel(n)}</span>
            <span className="carrusel-fecha">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
              Aprobada el {fechaCorta(n.fecha_version)}
            </span>
          </Link>
        ))}
      </div>

      <h2 className="seccion-titulo">
        Las más consultadas
        <Link href="/leyes">Ver todas</Link>
      </h2>
      <div className="tarjeta" style={{ padding: "4px 16px" }}>
        {populares.map((n, i) => (
          <Link key={n.id} href={`/leyes/${n.id}`} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 0", borderBottom: i < populares.length - 1 ? "1px solid var(--borde)" : "none" }}>
            <span style={{ flex: "none", width: 26, height: 26, borderRadius: "50%", background: i < 3 ? "var(--azul)" : "#e8effc", color: i < 3 ? "#fff" : "var(--azul)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800 }}>{i + 1}</span>
            <span style={{ fontSize: 14.5, fontWeight: 600, flex: 1 }}>{nombreDe(n)}</span>
            <span className="fecha" style={{ flex: "none" }}>{n.total_articulos} arts.</span>
          </Link>
        ))}
      </div>

      <p className="nota" style={{ margin: "18px 2px 0", textAlign: "center" }}>
        Fuente oficial: Biblioteca del Congreso Nacional · Orientación general, no asesoría legal.
      </p>
      <p className="nota" style={{ margin: "8px 2px 0", textAlign: "center" }}>
        <Link href="/quienes-somos" style={{ color: "var(--azul)" }}>Quiénes somos</Link>
        {" · "}
        <Link href="/privacidad" style={{ color: "var(--azul)" }}>Privacidad</Link>
        {" · "}
        <Link href="/aviso-legal" style={{ color: "var(--azul)" }}>Aviso legal</Link>
      </p>

      <ChatBar />
    </main>
  );
}
