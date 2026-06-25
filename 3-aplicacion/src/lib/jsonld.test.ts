import { describe, it, expect } from "vitest";
import { jsonLdSafe } from "./jsonld";

// Por qué: el JSON-LD se incrusta con dangerouslySetInnerHTML dentro de <script>. Si un
// texto trajera "</script>", cerraría la etiqueta e inyectaría HTML. jsonLdSafe lo impide.
describe("jsonLdSafe", () => {
  it("no deja pasar < ni > (no se puede romper la etiqueta <script>)", () => {
    const out = jsonLdSafe({ name: "malicioso</script><img src=x onerror=alert(1)>" });
    expect(out).not.toContain("<");
    expect(out).not.toContain(">");
    expect(out).not.toContain("</script>");
    expect(out).toContain("\\u003c");
    expect(out).toContain("\\u003e");
  });

  it("sigue siendo JSON válido y reversible (mismo objeto al parsear)", () => {
    const obj = { name: "Ley <19.496> & otras", desc: "1 > 0 y 0 < 1", n: 1 };
    expect(JSON.parse(jsonLdSafe(obj))).toEqual(obj);
  });
});
