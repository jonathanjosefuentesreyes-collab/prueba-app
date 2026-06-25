import Link from "next/link";
import { ultimasPublicaciones, normasPopulares, nombreDe } from "@/lib/db";
import ChatBar from "@/components/ChatBar";
import CarruselArrastrable from "@/components/CarruselArrastrable";
import { jsonLdSafe } from "@/lib/jsonld";
import { guias, CATEGORIAS, type CategoriaGuia } from "@/lib/guias";

const COLORES: Record<string, string> = {
  fundamentales: "#1E40AF",
  laboral: "#0039A6",
  familia: "#CE1126",
  civil: "#0E7A4E",
  penal: "#6B2FA8",
  comercial: "#C2630F",
  tributario: "#0B7C86",
  estado: "#9D174D",
  "dfl-dl": "#475569",
  otras: "#0F766E",
};

// Los 10 macrogrupos de la Biblioteca (mismo orden que gruposBiblioteca()).
const GRUPOS: { clave: string; etiqueta: string }[] = [
  { clave: "fundamentales", etiqueta: "Códigos" },
  { clave: "laboral", etiqueta: "Laboral" },
  { clave: "familia", etiqueta: "Familia" },
  { clave: "civil", etiqueta: "Civil" },
  { clave: "penal", etiqueta: "Penal" },
  { clave: "comercial", etiqueta: "Comercial" },
  { clave: "tributario", etiqueta: "Tributario" },
  { clave: "estado", etiqueta: "Estado" },
  { clave: "dfl-dl", etiqueta: "Decretos" },
  { clave: "otras", etiqueta: "Otras" },
];

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
  fundamentales: (
    <>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </>
  ),
  estado: (
    <>
      <path d="M3 22h18M6 18v-7M10 18v-7M14 18v-7M18 18v-7" />
      <path d="M12 2 20 7H4z" />
    </>
  ),
  "dfl-dl": (
    <>
      <path d="M8 21h11a2 2 0 0 0 2-2v-2H10v2a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v3h4" />
      <path d="M19 17V5a2 2 0 0 0-2-2H6" />
    </>
  ),
  otras: <path d="m16 6 4 14M12 6v14M8 8v12M4 4v16" />,
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

const BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://leyesdechile.com";

// Identidad del sitio para Google: WebSite habilita el cuadro de búsqueda en los
// resultados (sitelinks searchbox) y Organization define la marca como entidad.
const LD_SITIO = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Leyes de Chile",
  alternateName: "Leyes de Chile",
  url: BASE,
  inLanguage: "es-CL",
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: `${BASE}/leyes?q={search_term_string}` },
    "query-input": "required name=search_term_string",
  },
};
const LD_ORG = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Leyes de Chile",
  url: BASE,
  logo: `${BASE}/logo-medallon.png`,
  description:
    "Plataforma ciudadana para consultar las leyes de Chile explicadas en simple, con fuente oficial de la Biblioteca del Congreso Nacional (BCN).",
};

// Mejor guía (destacada) de cada categoría: los hooks más fuertes para enganchar en
// escritorio. Una por materia para dar variedad ("las mejores de cada una").
const ORDEN_GUIAS: CategoriaGuia[] = ["laboral", "familia", "vivienda", "consumidor", "deudas", "tránsito"];
const GUIAS_WEB = ORDEN_GUIAS
  .map((cat) => guias.find((g) => g.destacada && g.categoria === cat))
  .filter((g): g is NonNullable<typeof g> => Boolean(g));

export default function Inicio() {
  const ultimas = ultimasPublicaciones(6);
  const populares = normasPopulares();

  return (
    <main style={{ paddingBottom: 20 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdSafe(LD_SITIO) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdSafe(LD_ORG) }} />
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

      <h2 className="seccion-titulo">Acceso por materia legal</h2>
      <div className="materias">
        {GRUPOS.map((g) => (
          <Link key={g.clave} href={`/leyes?grupo=${g.clave}`} className="materia" style={{ color: COLORES[g.clave] }}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              {ICONOS[g.clave]}
            </svg>
            <span style={{ color: "var(--texto)" }}>{g.etiqueta.toUpperCase()}</span>
          </Link>
        ))}
      </div>

      <Link href="/guias" className="banner-guias">
        <span className="banner-guias-ico" aria-hidden>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18h6M10 22h4" />
            <path d="M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.3h6c0-1 .4-1.8 1-2.3A7 7 0 0 0 12 2z" fill="#FFC93C" stroke="#FFC93C" />
          </svg>
        </span>
        <span className="banner-guias-txt">
          <strong>Conoce las guías ciudadanas</strong>
          <span>Tus derechos explicados en simple, con los artículos oficiales.</span>
        </span>
        <svg className="banner-guias-flecha" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 12h14M12 5l7 7-7 7" /></svg>
      </Link>

      {/* Guías destacadas: SOLO en la versión web (oculto en móvil/app vía CSS .guias-web).
          Una guía por materia, con el mejor hook, para enganchar al visitante de escritorio. */}
      <div className="guias-web">
        <h2 className="seccion-titulo">
          Guías para tu problema
          <Link href="/guias">Ver todas</Link>
        </h2>
        <CarruselArrastrable className="carrusel-leyes">
          {GUIAS_WEB.map((g, i) => (
            <Link key={g.slug} href={`/guias/${g.slug}`} className={`carrusel-card carrusel-card-guia ${["azul", "blanco", "rojo"][i % 3]}`}>
              <span className="carrusel-badge">{CATEGORIAS[g.categoria].emoji} {CATEGORIAS[g.categoria].etiqueta}</span>
              <span className="carrusel-nombre">{g.titulo}</span>
              <span className="carrusel-fecha">
                Leer guía
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </span>
            </Link>
          ))}
        </CarruselArrastrable>
      </div>

      <h2 className="seccion-titulo">
        Nuevas leyes
        <Link href="/leyes">Ver Diario Oficial</Link>
      </h2>
      <CarruselArrastrable className="carrusel-leyes">
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
      </CarruselArrastrable>

      <h2 className="seccion-titulo">
        Leyes más buscadas
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

      <ChatBar />
    </main>
  );
}
