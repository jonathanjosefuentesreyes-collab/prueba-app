import { getGuiaBySlug, guias } from "@/lib/guias";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import AccessibilityBar from "@/components/AccessibilityBar";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const guia = getGuiaBySlug(resolvedParams.slug);
  if (!guia) return { title: "No encontrado" };
  return {
    title: `${guia.titulo} | Guías Ley Chilena`,
    description: guia.descripcion,
  };
}

export async function generateStaticParams() {
  return guias.map((guia) => ({
    slug: guia.slug,
  }));
}

export default async function GuiaDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const guia = getGuiaBySlug(resolvedParams.slug);
  
  if (!guia) {
    notFound();
  }

  // A very simple markdown-to-html renderer just for headers, bold, and paragraphs
  const renderContent = (content: string) => {
    let html = content
      .replace(/^### (.*$)/gim, '<h3 style="font-size:calc(18px * var(--escala-letra, 1)); margin-top:1.5rem; margin-bottom:0.5rem; color:var(--azul)">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 style="font-size:calc(20px * var(--escala-letra, 1)); margin-top:1.5rem; margin-bottom:0.5rem; color:var(--azul)">$1</h2>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n\n/g, '</p><p style="margin-bottom:1rem; line-height:1.6">')
      .replace(/\n(\d+\.) (.*)/g, '<br/><strong>$1</strong> $2');
    return `<p style="margin-bottom:1rem; line-height:1.6">${html}</p>`;
  };

  return (
    <main>
      <header className="header" style={{ justifyContent: "flex-start", gap: 12 }}>
        <Link href="/guias" aria-label="Volver a guías" style={{ display: "flex" }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M15 18l-6-6 6-6" /></svg>
        </Link>
        <span style={{ fontWeight: 800, fontSize: 16, lineHeight: 1.2 }}>Guía Ciudadana</span>
      </header>

      <AccessibilityBar />

      <div style={{ padding: "0 2px 20px" }}>
        <article className="tarjeta" style={{ marginBottom: 14 }}>
          <h2 style={{ fontSize: "calc(18px * var(--escala-letra, 1))", margin: "0 0 8px", color: "var(--azul)", lineHeight: 1.35 }}>{guia.titulo}</h2>
          <p style={{ fontSize: "calc(13.5px * var(--escala-letra, 1))", margin: 0 }}>{guia.descripcion}</p>
          <p className="nota" style={{ marginTop: 8 }}>Última actualización: {guia.fecha}</p>
        </article>

        <div 
          className="tarjeta guia-content" 
          style={{ fontSize: "calc(14.5px * var(--escala-letra, 1))", color: "var(--texto)", background: "#ffffff", lineHeight: 1.6 }}
          dangerouslySetInnerHTML={{ __html: renderContent(guia.contenido) }} 
        />

        <div className="tarjeta" style={{ marginTop: 14, background: "#e8effc", borderColor: "#cbd5e1" }}>
          <h3 style={{ margin: "0 0 6px", color: "var(--azul)" }}>¿Tienes un caso similar?</h3>
          <p style={{ margin: "0 0 12px", fontSize: 13.5 }}>Consulta gratis con AbogaBot, nuestro asistente legal de inteligencia artificial.</p>
          <Link href="/chat" className="boton" style={{ width: "100%", display: "inline-flex", textDecoration: "none" }}>
            Preguntar a AbogaBot
          </Link>
        </div>
      </div>
    </main>
  );
}
