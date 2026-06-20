// Formateo compartido de las respuestas del bot (usado por ChatClient y ChatRiel):
// escapa HTML (seguro), aplica **negritas** y convierte líneas con *, - o • en viñetas.
function negrita(s: string): string {
  return s.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
}

export function formatearRespuesta(texto: string): string {
  const esc = texto.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  return esc.split("\n").map((linea) => {
    const t = linea.trim();
    if (!t) return "";
    const v = t.match(/^[*\-•]\s+(.*)$/);
    if (v) return `<div class="cf-vinieta"><span class="cf-punto">•</span><span>${negrita(v[1])}</span></div>`;
    return `<div class="cf-linea">${negrita(t)}</div>`;
  }).join("");
}
