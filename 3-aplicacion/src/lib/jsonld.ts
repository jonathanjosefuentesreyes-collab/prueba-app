// Serializa un objeto para incrustarlo de forma SEGURA dentro de
// <script type="application/ld+json">…</script>.
//
// JSON.stringify NO escapa "<" ni ">", asi que un texto (nombre de ley, explicacion, etc.)
// que contuviera "</script>" o "<!--" cerraria la etiqueta y permitiria inyeccion de HTML.
// Escapamos "<" y ">" a su forma \uXXXX: sigue siendo JSON valido y el navegador lo
// interpreta igual, pero ya no puede romper la etiqueta <script>.
export function jsonLdSafe(obj: unknown): string {
  return JSON.stringify(obj)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e");
}
