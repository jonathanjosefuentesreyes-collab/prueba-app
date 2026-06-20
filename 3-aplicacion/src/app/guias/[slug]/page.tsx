import { getGuiaBySlug, guias } from "@/lib/guias";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import AccessibilityBar from "@/components/AccessibilityBar";
import GuardarGuiaBtn from "@/components/GuardarGuiaBtn";

const BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://www.leyesdechile.com";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guia = getGuiaBySlug(slug);
  if (!guia) return { title: "No encontrado" };
  return {
    title: guia.metaTitle || `${guia.titulo} | Ley Chilena`,
    description: guia.descripcion,
    alternates: { canonical: `${BASE}/guias/${guia.slug}` },
    openGraph: {
      type: "article",
      title: guia.titulo,
      description: guia.descripcion,
      url: `${BASE}/guias/${guia.slug}`,
    },
  };
}

export async function generateStaticParams() {
  return guias.map((guia) => ({ slug: guia.slug }));
}

// ─── Renderizador de markdown acotado (encabezados, negritas, enlaces, listas) ──
// El contenido lo escribimos nosotros (no es entrada de usuario), pero igual se
// escapa el HTML antes de aplicar el formato, por seguridad y para que los signos
// se muestren literales.
function escaparHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function inline(s: string): string {
  let out = escaparHtml(s.trim());
  out = out.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  // Enlaces [texto](url). Internos → navegación normal; el crawler sigue el href.
  out = out.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" style="color:var(--azul);font-weight:600;text-decoration:underline">$1</a>'
  );
  return out;
}

function renderContent(content: string): string {
  const bloques = content.trim().split(/\n{2,}/);
  const html: string[] = [];
  const hStyle = (px: number) =>
    `font-size:calc(${px}px * var(--escala-letra, 1));margin:1.5rem 0 0.5rem;color:var(--azul);font-family:var(--font-titulo),serif`;
  for (const crudo of bloques) {
    const bloque = crudo.trim();
    if (!bloque) continue;
    if (bloque.startsWith("### ")) { html.push(`<h3 style="${hStyle(17)}">${inline(bloque.slice(4))}</h3>`); continue; }
    if (bloque.startsWith("## ")) { html.push(`<h2 style="${hStyle(19)}">${inline(bloque.slice(3))}</h2>`); continue; }
    const lineas = bloque.split("\n").map((l) => l.trim()).filter(Boolean);
    if (lineas.length && lineas.every((l) => l.startsWith("- "))) {
      const items = lineas.map((l) => `<li style="margin-bottom:6px">${inline(l.slice(2))}</li>`).join("");
      html.push(`<ul style="margin:0 0 1rem;padding-left:1.2rem;line-height:1.6">${items}</ul>`);
      continue;
    }
    if (lineas.length && lineas.every((l) => /^\d+\.\s/.test(l))) {
      const items = lineas.map((l) => `<li style="margin-bottom:6px">${inline(l.replace(/^\d+\.\s/, ""))}</li>`).join("");
      html.push(`<ol style="margin:0 0 1rem;padding-left:1.3rem;line-height:1.6">${items}</ol>`);
      continue;
    }
    html.push(`<p style="margin-bottom:1rem;line-height:1.6">${inline(lineas.join(" "))}</p>`);
  }
  return html.join("");
}

export default async function GuiaDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guia = getGuiaBySlug(slug);
  if (!guia) notFound();

  const url = `${BASE}/guias/${guia.slug}`;
  const jsonLd: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: guia.titulo,
      description: guia.descripcion,
      datePublished: guia.fecha,
      dateModified: guia.fecha,
      inLanguage: "es-CL",
      author: { "@type": "Organization", name: "Ley Chilena" },
      publisher: { "@type": "Organization", name: "Ley Chilena" },
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: `${BASE}/` },
        { "@type": "ListItem", position: 2, name: "Guías", item: `${BASE}/guias` },
        { "@type": "ListItem", position: 3, name: guia.titulo, item: url },
      ],
    },
  ];
  if (guia.faq?.length) {
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: guia.faq.map((f) => ({
        "@type": "Question",
        name: f.pregunta,
        acceptedAnswer: { "@type": "Answer", text: f.respuesta },
      })),
    });
  }

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className="header" style={{ justifyContent: "flex-start", gap: 12 }}>
        <Link href="/guias" aria-label="Volver a guías" style={{ display: "flex" }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M15 18l-6-6 6-6" /></svg>
        </Link>
        <span style={{ fontWeight: 800, fontSize: 16, lineHeight: 1.2 }}>Guía Ciudadana</span>
      </header>

      <nav className="migas" aria-label="Ruta de navegación">
        <Link href="/">Inicio</Link>
        <span aria-hidden>›</span>
        <Link href="/guias">Guías</Link>
        <span aria-hidden>›</span>
        <span className="migas-actual">{guia.titulo}</span>
      </nav>

      <AccessibilityBar />

      <div style={{ padding: "0 2px 20px" }}>
        <article className="tarjeta" style={{ marginBottom: 14 }}>
          <h1 style={{ fontSize: "calc(20px * var(--escala-letra, 1))", margin: "0 0 8px", color: "var(--azul)", lineHeight: 1.3, fontFamily: "var(--font-titulo), serif" }}>{guia.titulo}</h1>
          <p style={{ fontSize: "calc(13.5px * var(--escala-letra, 1))", margin: 0, color: "var(--texto-suave)" }}>{guia.descripcion}</p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, marginTop: 10, flexWrap: "wrap" }}>
            <span className="nota">Última actualización: {guia.fecha}</span>
            <GuardarGuiaBtn slug={guia.slug} titulo={guia.titulo} />
          </div>
        </article>

        {guia.respuestaCorta && (
          <div
            className="tarjeta"
            style={{ marginBottom: 14, background: "#eef4ff", borderLeft: "4px solid var(--azul)", fontSize: "calc(14.5px * var(--escala-letra, 1))", lineHeight: 1.6 }}
            dangerouslySetInnerHTML={{ __html: `<p style="margin:0">${inline(guia.respuestaCorta)}</p>` }}
          />
        )}

        <div
          className="tarjeta guia-content"
          style={{ fontSize: "calc(14.5px * var(--escala-letra, 1))", color: "var(--texto)", background: "#ffffff", lineHeight: 1.6 }}
          dangerouslySetInnerHTML={{ __html: renderContent(guia.contenido) }}
        />

        {guia.herramienta && (
          <div className="tarjeta" style={{ marginTop: 14, background: "#fff7ed", borderColor: "#fdba74" }}>
            <h2 style={{ margin: "0 0 6px", fontSize: "calc(16px * var(--escala-letra, 1))", color: "#b45309", fontFamily: "var(--font-titulo), serif" }}>{guia.herramienta.titulo}</h2>
            <p style={{ margin: "0 0 12px", fontSize: 13.5 }}>{guia.herramienta.descripcion}</p>
            <Link href={guia.herramienta.href} className="boton" style={{ width: "100%", display: "inline-flex", textDecoration: "none" }}>
              {guia.herramienta.boton}
            </Link>
          </div>
        )}

        {guia.faq && guia.faq.length > 0 && (
          <section className="tarjeta" style={{ marginTop: 14 }}>
            <h2 style={{ margin: "0 0 10px", fontSize: "calc(17px * var(--escala-letra, 1))", color: "var(--azul)", fontFamily: "var(--font-titulo), serif" }}>Preguntas frecuentes</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {guia.faq.map((f, i) => (
                <div key={i}>
                  <h3 style={{ margin: "0 0 4px", fontSize: "calc(14.5px * var(--escala-letra, 1))", color: "var(--texto)" }}>{f.pregunta}</h3>
                  <p style={{ margin: 0, fontSize: "calc(13.5px * var(--escala-letra, 1))", lineHeight: 1.6, color: "var(--texto-suave)" }}>{f.respuesta}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="tarjeta" style={{ marginTop: 14, background: "#e8effc", borderColor: "#cbd5e1" }}>
          <h2 style={{ margin: "0 0 6px", fontSize: "calc(16px * var(--escala-letra, 1))", color: "var(--azul)", fontFamily: "var(--font-titulo), serif" }}>¿Tu caso es distinto?</h2>
          <p style={{ margin: "0 0 12px", fontSize: 13.5 }}>Consulta gratis con AbogaBot, nuestro asistente legal con inteligencia artificial que cita los artículos exactos.</p>
          <Link href="/chat" className="boton" style={{ width: "100%", display: "inline-flex", textDecoration: "none" }}>
            Preguntar a AbogaBot
          </Link>
        </div>

        <p className="nota" style={{ marginTop: 14, fontSize: 12, lineHeight: 1.5 }}>
          Esta guía es orientación general basada en la legislación chilena vigente (fuente: Biblioteca del Congreso Nacional) y no reemplaza la asesoría de un abogado para tu caso particular.
        </p>
      </div>
    </main>
  );
}
