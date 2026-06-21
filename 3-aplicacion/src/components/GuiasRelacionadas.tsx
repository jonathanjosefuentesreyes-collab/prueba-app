import Link from "next/link";

// Tarjeta de "Guías relacionadas" para enlazar las herramientas con las guías (enlazado
// interno triangular: herramienta ↔ guía ↔ artículo). Recibe pares [slug, título].
export default function GuiasRelacionadas({ guias }: { guias: [string, string][] }) {
  if (!guias.length) return null;
  return (
    <div className="tarjeta" style={{ marginTop: 14 }}>
      <strong style={{ fontSize: 14, display: "block", marginBottom: 8 }}>Guías relacionadas</strong>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {guias.map(([slug, titulo]) => (
          <Link key={slug} href={`/guias/${slug}`} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, textDecoration: "none", color: "var(--texto)", fontSize: 13.5, fontWeight: 600, padding: "4px 0" }}>
            <span>💡 {titulo}</span>
            <span style={{ color: "var(--azul)", fontWeight: 800 }}>→</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
