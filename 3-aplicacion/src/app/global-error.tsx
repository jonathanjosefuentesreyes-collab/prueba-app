"use client";

// Definir nuestro propio global-error evita el bug de Turbopack/Next 16 que no
// resuelve su módulo built-in "global-error.js" en el manifest de RSC cuando la
// ruta del proyecto tiene espacios ("vs and claude/Leyes chilenas"). Además es
// buena práctica para producción: pantalla de error con la marca.
export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="es">
      <body style={{ fontFamily: "system-ui, sans-serif", margin: 0, background: "#eef1f7", color: "#19233a" }}>
        <main style={{ maxWidth: 420, margin: "0 auto", padding: "64px 24px", textAlign: "center" }}>
          <p style={{ fontSize: 22, fontWeight: 800 }}>
            <span style={{ color: "#0039a6" }}>Ley</span> <span style={{ color: "#ce1126" }}>Chilena</span>
          </p>
          <h1 style={{ fontSize: 18, marginTop: 24 }}>Algo salió mal</h1>
          <p style={{ color: "#5a6478", fontSize: 15, lineHeight: 1.6 }}>
            Tuvimos un problema al cargar esta página. Inténtalo de nuevo.
          </p>
          <button
            onClick={() => reset()}
            style={{ marginTop: 16, background: "#0039a6", color: "#fff", border: 0, borderRadius: 10, padding: "11px 20px", fontSize: 15, fontWeight: 700, cursor: "pointer" }}
          >
            Reintentar
          </button>
        </main>
      </body>
    </html>
  );
}
