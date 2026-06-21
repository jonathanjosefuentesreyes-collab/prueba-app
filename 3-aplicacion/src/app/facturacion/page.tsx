"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  boletaHonorarios,
  calcularIVA,
  retencionDefault,
  RETENCION_POR_ANIO,
  IVA,
} from "@/lib/facturacion";
import GuiasRelacionadas from "@/components/GuiasRelacionadas";

const clp = (n: number) => "$" + Math.round(n).toLocaleString("es-CL");
const ANIOS = Object.keys(RETENCION_POR_ANIO).map(Number).sort();
const ANIO_DEF = Math.min(Math.max(new Date().getFullYear(), ANIOS[0]), ANIOS[ANIOS.length - 1]);

// Límite freemium: 1 cálculo gratis por día (localStorage), igual que las demás herramientas.
const MAX_CALC_DIA = 1;
const CLAVE_USOS = "calc_facturacion_usos";
function leerUsosHoy(): number {
  try {
    const raw = JSON.parse(localStorage.getItem(CLAVE_USOS) || "{}");
    return raw.dia === new Date().toISOString().slice(0, 10) ? raw.n || 0 : 0;
  } catch {
    return 0;
  }
}
function registrarUso(): number {
  const dia = new Date().toISOString().slice(0, 10);
  const n = leerUsosHoy() + 1;
  try {
    localStorage.setItem(CLAVE_USOS, JSON.stringify({ dia, n }));
  } catch {}
  return n;
}

type ResHon = ReturnType<typeof boletaHonorarios> & { tasa: number };
type ResIva = ReturnType<typeof calcularIVA>;

export default function Facturacion() {
  const [tab, setTab] = useState<"honorarios" | "iva">("honorarios");

  const [anio, setAnio] = useState(ANIO_DEF);
  const [tasa, setTasa] = useState(retencionDefault(ANIO_DEF));
  const [modoH, setModoH] = useState<"bruto" | "liquido">("bruto");
  const [montoH, setMontoH] = useState(500000);

  const [modoI, setModoI] = useState<"neto" | "total">("neto");
  const [montoI, setMontoI] = useState(100000);

  const [usados, setUsados] = useState(0);
  const [premium, setPremium] = useState(false);
  const [notaPremium, setNotaPremium] = useState(false);
  const [resH, setResH] = useState<ResHon | null>(null);
  const [resI, setResI] = useState<ResIva | null>(null);

  useEffect(() => { setUsados(leerUsosHoy()); }, []);
  const sinCalculosHoy = usados >= MAX_CALC_DIA;

  function calcularHon() {
    if (sinCalculosHoy) { setPremium(true); return; }
    setResH({ ...boletaHonorarios(montoH, tasa, modoH), tasa });
    setUsados(registrarUso());
  }
  function calcularIva() {
    if (sinCalculosHoy) { setPremium(true); return; }
    setResI(calcularIVA(montoI, modoI));
    setUsados(registrarUso());
  }

  const avisoUso = (
    <p style={{ margin: "10px 0 0", textAlign: "center", fontSize: 12, fontWeight: 600, color: sinCalculosHoy ? "var(--rojo)" : "var(--texto-suave)" }}>
      {sinCalculosHoy ? "Usaste tu cálculo gratis de hoy · ✨ Premium para más" : "Tienes 1 cálculo gratis hoy"}
    </p>
  );

  const bloquePremium = premium && (
    <div className="tarjeta" style={{ marginTop: 14, textAlign: "center" }}>
      <p style={{ margin: "0 0 4px", fontWeight: 700 }}>Llegaste a tu cálculo gratis de hoy 🙂</p>
      <p className="nota" style={{ margin: "0 0 12px" }}>Con <strong>Premium</strong> calculas boletas e IVA sin límite. Tu cálculo gratis se renueva mañana.</p>
      <button className="boton-premium" onClick={() => setNotaPremium(true)}>✨ Actualizar a Premium</button>
      {notaPremium && <p className="nota" style={{ marginTop: 10 }}>🚧 Los planes Premium están en preparación. ¡Gracias por tu interés!</p>}
    </div>
  );

  return (
    <main style={{ paddingBottom: 80 }}>
      <header className="header" style={{ justifyContent: "flex-start", gap: 12 }}>
        <Link href="/premium" aria-label="Volver a Premium" style={{ display: "flex" }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M15 18l-6-6 6-6" /></svg>
        </Link>
        <span className="marca" style={{ fontSize: 17 }}><span className="azul">Calculadora</span> <span className="rojo">de Facturación</span></span>
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
            <button className="boton" type="button" onClick={calcularHon}>Calcular boleta</button>
            {avisoUso}
          </div>
          {resH && (
            <div className="tarjeta" style={{ marginTop: 12 }}>
              <Fila etiqueta="Monto bruto (boleta)" valor={clp(resH.bruto)} />
              <Fila etiqueta={`Retención (${resH.tasa}%)`} valor={"– " + clp(resH.retencion)} />
              <Total etiqueta="Líquido a recibir" valor={clp(resH.liquido)} />
            </div>
          )}
          {bloquePremium}
          <p className="nota" style={{ marginTop: 10, lineHeight: 1.5 }}>
            La retención es un <strong>pago provisional</strong> de impuesto (PPM) que la empresa entera al SII; suele
            devolverse o abonarse en tu <strong>declaración de renta anual</strong> (abril). Verifica la tasa vigente en{" "}
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
            <button className="boton" type="button" onClick={calcularIva}>Calcular IVA</button>
            {avisoUso}
          </div>
          {resI && (
            <div className="tarjeta" style={{ marginTop: 12 }}>
              <Fila etiqueta="Neto" valor={clp(resI.neto)} />
              <Fila etiqueta={`IVA (${IVA}%)`} valor={clp(resI.iva)} />
              <Total etiqueta="Total con IVA" valor={clp(resI.total)} />
            </div>
          )}
          {bloquePremium}
          <p className="nota" style={{ marginTop: 10, lineHeight: 1.5 }}>
            El IVA general en Chile es <strong>19%</strong> (DL 825). Lo agregas al neto en tus facturas afectas. Casos
            especiales en <a href="https://www.sii.cl" target="_blank" rel="noopener noreferrer" style={{ color: "var(--azul)" }}>sii.cl</a>.
          </p>
        </>
      )}

      <GuiasRelacionadas guias={[
        ["honorarios-pero-trabajo-como-dependiente", "Boletas de honorarios pero trabajo como dependiente"],
      ]} />
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
function Total({ etiqueta, valor }: { etiqueta: string; valor: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", paddingTop: 12 }}>
      <strong>{etiqueta}</strong>
      <span style={{ fontSize: 24, fontWeight: 800, color: "var(--azul)" }}>{valor}</span>
    </div>
  );
}
