"use client";

import { useState } from "react";
import Link from "next/link";
import {
  boletaHonorarios,
  calcularIVA,
  retencionDefault,
  RETENCION_POR_ANIO,
  IVA,
} from "@/lib/facturacion";

const clp = (n: number) => "$" + Math.round(n).toLocaleString("es-CL");
const ANIOS = Object.keys(RETENCION_POR_ANIO).map(Number).sort();

export default function Facturacion() {
  const [tab, setTab] = useState<"honorarios" | "iva">("honorarios");

  // Boleta de honorarios
  const [anio, setAnio] = useState(2026);
  const [tasa, setTasa] = useState(retencionDefault(2026));
  const [modoH, setModoH] = useState<"bruto" | "liquido">("bruto");
  const [montoH, setMontoH] = useState(500000);
  const h = boletaHonorarios(montoH, tasa, modoH);

  // IVA
  const [modoI, setModoI] = useState<"neto" | "total">("neto");
  const [montoI, setMontoI] = useState(100000);
  const iva = calcularIVA(montoI, modoI);

  return (
    <main style={{ paddingBottom: 80 }}>
      <header className="header">
        <span className="marca"><span className="azul">Calculadora</span> <span className="rojo">de Facturación</span></span>
      </header>

      <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
        <button onClick={() => setTab("honorarios")} className="boton" style={{ flex: 1, background: tab === "honorarios" ? "var(--azul)" : "#fff", color: tab === "honorarios" ? "#fff" : "var(--texto)", border: "1px solid var(--borde-fuerte)" }}>
          Boleta de honorarios
        </button>
        <button onClick={() => setTab("iva")} className="boton" style={{ flex: 1, background: tab === "iva" ? "var(--azul)" : "#fff", color: tab === "iva" ? "#fff" : "var(--texto)", border: "1px solid var(--borde-fuerte)" }}>
          Factura (IVA 19%)
        </button>
      </div>

      {tab === "honorarios" && (
        <>
          <div className="tarjeta" style={{ display: "grid", gap: 12 }}>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => setModoH("bruto")} className="chip" style={{ flex: 1, padding: "8px", background: modoH === "bruto" ? "var(--azul)" : "#eef", color: modoH === "bruto" ? "#fff" : "var(--azul)", fontWeight: 700 }}>Tengo el monto bruto</button>
              <button onClick={() => setModoH("liquido")} className="chip" style={{ flex: 1, padding: "8px", background: modoH === "liquido" ? "var(--azul)" : "#eef", color: modoH === "liquido" ? "#fff" : "var(--azul)", fontWeight: 700 }}>Quiero recibir (líquido)</button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <div>
                <label className="etiqueta" htmlFor="anio">Año de la boleta</label>
                <select id="anio" className="campo" value={anio} onChange={(e) => { const a = +e.target.value; setAnio(a); setTasa(retencionDefault(a)); }}>
                  {ANIOS.map((a) => <option key={a} value={a}>{a}</option>)}
                </select>
              </div>
              <div>
                <label className="etiqueta" htmlFor="tasa">Retención (%)</label>
                <input id="tasa" className="campo" type="number" min={0} max={30} step={0.25} value={tasa} onChange={(e) => setTasa(+e.target.value)} />
              </div>
            </div>
            <div>
              <label className="etiqueta" htmlFor="montoH">{modoH === "bruto" ? "Monto bruto de la boleta (CLP)" : "Líquido que quieres recibir (CLP)"}</label>
              <input id="montoH" className="campo" type="number" min={0} step={1000} value={montoH} onChange={(e) => setMontoH(+e.target.value)} />
            </div>
          </div>

          <div className="tarjeta" style={{ marginTop: 12 }}>
            <Fila etiqueta="Monto bruto (boleta)" valor={clp(h.bruto)} />
            <Fila etiqueta={`Retención (${tasa}%)`} valor={"– " + clp(h.retencion)} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", paddingTop: 12 }}>
              <strong>Líquido a recibir</strong>
              <span style={{ fontSize: 24, fontWeight: 800, color: "var(--azul)" }}>{clp(h.liquido)}</span>
            </div>
          </div>
          <p className="nota" style={{ marginTop: 10, lineHeight: 1.5 }}>
            La retención es un <strong>pago provisional</strong> de impuesto (PPM) que la empresa entera al SII; suele
            devolverse o abonarse en tu <strong>declaración de renta anual</strong> (abril). Verifica la tasa vigente de tu año en{" "}
            <a href="https://www.sii.cl" target="_blank" rel="noopener noreferrer" style={{ color: "var(--azul)" }}>sii.cl</a>.
          </p>
        </>
      )}

      {tab === "iva" && (
        <>
          <div className="tarjeta" style={{ display: "grid", gap: 12 }}>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => setModoI("neto")} className="chip" style={{ flex: 1, padding: "8px", background: modoI === "neto" ? "var(--azul)" : "#eef", color: modoI === "neto" ? "#fff" : "var(--azul)", fontWeight: 700 }}>Tengo el neto</button>
              <button onClick={() => setModoI("total")} className="chip" style={{ flex: 1, padding: "8px", background: modoI === "total" ? "var(--azul)" : "#eef", color: modoI === "total" ? "#fff" : "var(--azul)", fontWeight: 700 }}>Tengo el total</button>
            </div>
            <div>
              <label className="etiqueta" htmlFor="montoI">{modoI === "neto" ? "Monto neto (CLP)" : "Monto total con IVA (CLP)"}</label>
              <input id="montoI" className="campo" type="number" min={0} step={1000} value={montoI} onChange={(e) => setMontoI(+e.target.value)} />
            </div>
          </div>

          <div className="tarjeta" style={{ marginTop: 12 }}>
            <Fila etiqueta="Neto" valor={clp(iva.neto)} />
            <Fila etiqueta={`IVA (${IVA}%)`} valor={clp(iva.iva)} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", paddingTop: 12 }}>
              <strong>Total con IVA</strong>
              <span style={{ fontSize: 24, fontWeight: 800, color: "var(--azul)" }}>{clp(iva.total)}</span>
            </div>
          </div>
          <p className="nota" style={{ marginTop: 10, lineHeight: 1.5 }}>
            El IVA general en Chile es <strong>19%</strong> (DL 825). Lo agregas al neto en tus facturas afectas; si emites
            boleta/factura exenta no corresponde. Para casos especiales, consulta en{" "}
            <a href="https://www.sii.cl" target="_blank" rel="noopener noreferrer" style={{ color: "var(--azul)" }}>sii.cl</a>.
          </p>
        </>
      )}

      <p className="nota" style={{ marginTop: 14, textAlign: "center", fontSize: 12 }}>
        Estimación referencial. No reemplaza la asesoría de un contador para tu caso.
      </p>
      <Link className="boton" style={{ width: "100%", marginTop: 12 }} href="/chat?q=AbogaBot,%20expl%C3%ADcame%20c%C3%B3mo%20funciona%20la%20boleta%20de%20honorarios%20y%20la%20retenci%C3%B3n%20de%20impuesto%20en%20Chile">
      Preguntar a AbogaBot →
      </Link>
    </main>
  );
}

function Fila({ etiqueta, valor }: { etiqueta: string; valor: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", gap: 10, padding: "8px 0", borderBottom: "1px solid var(--borde)", fontSize: 14 }}>
      <span>{etiqueta}</span>
      <strong style={{ whiteSpace: "nowrap" }}>{valor}</strong>
    </div>
  );
}
