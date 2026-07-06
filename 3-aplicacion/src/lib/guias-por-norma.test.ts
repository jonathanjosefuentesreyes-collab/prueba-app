import { describe, it, expect } from "vitest";
import { guiasQueCitan } from "./guias-por-norma";
import { guias } from "./guias";

// El enlazado triangular depende de este mapa inverso (ley → guías que la citan).
// Si un refactor de guias.ts cambiara el formato de los enlaces /leyes/{id}, el mapa
// quedaría vacío EN SILENCIO y las páginas de ley perderían sus guías relacionadas:
// estos tests lo hacen ruido de CI.
describe("guiasQueCitan — mapa inverso ley → guías", () => {
  it("el Código del Trabajo (207436) tiene guías que lo citan", () => {
    expect(guiasQueCitan(207436).length).toBeGreaterThan(0);
  });

  it("cada par devuelto es [slug real de guias.ts, título no vacío]", () => {
    const slugs = new Set(guias.map((g) => g.slug));
    for (const [slug, titulo] of guiasQueCitan(207436, 100)) {
      expect(slugs.has(slug)).toBe(true);
      expect(titulo.length).toBeGreaterThan(0);
    }
  });

  it("respeta el máximo pedido", () => {
    expect(guiasQueCitan(207436, 2).length).toBeLessThanOrEqual(2);
  });

  it("una norma que ninguna guía cita devuelve lista vacía (no revienta)", () => {
    expect(guiasQueCitan(999999999)).toEqual([]);
  });
});
