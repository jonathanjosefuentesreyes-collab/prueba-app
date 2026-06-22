import { describe, it, expect } from "vitest";
import { formatearRespuesta } from "./formato-chat";

// El texto del bot se inserta con dangerouslySetInnerHTML, así que ESCAPAR el HTML
// es la barrera anti-XSS. Si alguien rompe el escape, el modelo (o un texto pegado)
// podría inyectar HTML/JS. Estos tests son el guardián de esa barrera.
describe("formatearRespuesta — escape anti-XSS", () => {
  it("no deja pasar una etiqueta <script>", () => {
    const out = formatearRespuesta("<script>alert(1)</script>");
    expect(out).not.toContain("<script>");
    expect(out).toContain("&lt;script&gt;");
  });

  it("neutraliza un <img onerror> (no sobrevive como etiqueta real)", () => {
    const out = formatearRespuesta("<img src=x onerror=alert(1)>");
    expect(out).not.toContain("<img");
    expect(out).toContain("&lt;img");
  });

  it("escapa el ampersand", () => {
    expect(formatearRespuesta("Tom & Jerry")).toContain("Tom &amp; Jerry");
  });

  it("aunque venga dentro de **negrita**, el HTML queda escapado", () => {
    const out = formatearRespuesta("ojo **<b>hola</b>**");
    expect(out).toContain("<strong>");
    expect(out).not.toContain("<b>hola</b>");
    expect(out).toContain("&lt;b&gt;");
  });
});

describe("formatearRespuesta — formato de salida", () => {
  it("convierte **texto** en <strong>", () => {
    expect(formatearRespuesta("esto es **importante**")).toContain("<strong>importante</strong>");
  });

  it("convierte una línea con viñeta en item de lista", () => {
    const out = formatearRespuesta("- primer punto");
    expect(out).toContain("cf-vinieta");
    expect(out).toContain("primer punto");
  });

  it("acepta •, * y - como viñeta", () => {
    for (const m of ["• uno", "* dos", "- tres"]) {
      expect(formatearRespuesta(m)).toContain("cf-vinieta");
    }
  });

  it("envuelve una línea normal en cf-linea", () => {
    expect(formatearRespuesta("hola")).toContain('class="cf-linea"');
  });

  it("descarta líneas vacías (no genera divs vacíos)", () => {
    expect(formatearRespuesta("a\n\nb")).not.toContain('class="cf-linea"></div><div class="cf-linea">');
  });
});
