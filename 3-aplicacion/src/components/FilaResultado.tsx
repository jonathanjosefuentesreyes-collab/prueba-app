// Filas de resultado compartidas por las calculadoras (finiquito, sueldo, facturación):
// `Fila` es una línea normal con borde inferior; `Total` es el monto destacado del final.
// Antes estaban duplicadas en cada página (violación DRY que esto corrige). Son puramente
// presentacionales (sin hooks), así que sirven dentro de cualquier página cliente.

export function Fila({ etiqueta, valor }: { etiqueta: string; valor: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", gap: 10, padding: "8px 0", borderBottom: "1px solid var(--borde)", fontSize: 14 }}>
      <span>{etiqueta}</span>
      <strong style={{ whiteSpace: "nowrap" }}>{valor}</strong>
    </div>
  );
}

export function Total({ etiqueta, valor }: { etiqueta: string; valor: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", paddingTop: 12 }}>
      <strong>{etiqueta}</strong>
      <span style={{ fontSize: 24, fontWeight: 800, color: "var(--azul)" }}>{valor}</span>
    </div>
  );
}
