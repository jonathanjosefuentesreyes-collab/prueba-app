"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  sueldoDesdeBruto,
  sueldoDesdeLiquido,
  AFP_COMISION_DEF,
  SALUD_DEF,
  type ResultadoSueldo,
} from "@/lib/sueldo";
import valores from "@/lib/valores.json";

const clp = (n: number) => "$" + Math.round(n).toLocaleString("es-CL");

// Límite freemium: 1 cálculo gratis por día (localStorage propio), igual que las demás.
const MAX_CALC_DIA = 1;
const CLAVE_USOS = "calc_sueldo_usos";
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

export default function SueldoLiquido() {
  const [modo, setModo] = useState<"bruto" | "liquido">("bruto");
  const [monto, setMonto] = useState(1000000);
  const [afpCom, setAfpCom] = useState(AFP_COMISION_DEF);
  const [saludPct, setSaludPct] = useState(SALUD_DEF);

  const [usados, setUsados] = useState(0);
  const [premium, setPremium] = useState(false);
  const [notaPremium, setNotaPremium] = useState(false);
  const [res, setRes] = useState<ResultadoSueldo | null>(null);

  useEffect(() => { setUsados(leerUsosHoy()); }, []);
  const sinCalculosHoy = usados >= MAX_CALC_DIA;

  function calcular() {
    if (sinCalculosHoy) { setPremium(true); return; }
    const p = { afpComision: afpCom, salud: saludPct, valorUF: valores.uf, valorUTM: valores.utm };
    setRes(modo === "bruto" ? sueldoDesdeBruto(monto, p) : sueldoDesdeLiquido(monto, p));
    setUsados(registrarUso());
  }

  return (
    <main style={{ paddingBottom: 80 }}>
      <header className="header" style={{ justifyContent: "flex-start", gap: 12 }}>
        <Link href="/premium" aria-label="Volver a Premium" style={{ display: "flex" }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M15 18l-6-6 6-6" /></svg>
        </Link>
        <span className="marca" style={{ fontSize: 17 }}><span className="azul">Sueldo</span> <span className="rojo">líquido</span></span>
      </header>

      <div className="tarjeta" style={{ display: "grid", gap: 12 }}>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => setModo("bruto")} className="chip" style={{ flex: 1, padding: "8px", background: modo === "bruto" ? "var(--azul)" : "#eef", color: modo === "bruto" ? "#fff" : "var(--azul)", fontWeight: 700 }}>Tengo el bruto</button>
          <button onClick={() => setModo("liquido")} className="chip" style={{ flex: 1, padding: "8px", background: modo === "liquido" ? "var(--azul)" : "#eef", color: modo === "liquido" ? "#fff" : "var(--azul)", fontWeight: 700 }}>Quiero recibir (líquido)</button>
        </div>
        <div>
          <label className="etiqueta" htmlFor="monto">{modo === "bruto" ? "Sueldo bruto imponible (CLP)" : "Líquido que quieres recibir (CLP)"}</label>
          <input id="monto" className="campo" type="number" min={0} step={10000} value={monto} onChange={(e) => setMonto(+e.target.value)} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <div>
            <label className="etiqueta" htmlFor="afp">Comisión AFP (%)</label>
            <input id="afp" className="campo" type="number" min={0} max={3} step={0.01} value={afpCom} onChange={(e) => setAfpCom(+e.target.value)} />
          </div>
          <div>
            <label className="etiqueta" htmlFor="salud">Salud (%)</label>
            <input id="salud" className="campo" type="number" min={7} max={20} step={0.1} value={saludPct} onChange={(e) => setSaludPct(+e.target.value)} />
          </div>
        </div>
        <button className="boton" type="button" onClick={calcular}>Calcular sueldo líquido</button>
        <p style={{ margin: "2px 0 0", textAlign: "center", fontSize: 12, fontWeight: 600, color: sinCalculosHoy ? "var(--rojo)" : "var(--texto-suave)" }}>
          {sinCalculosHoy ? "Usaste tu cálculo gratis de hoy · ✨ Premium para más" : "Tienes 1 cálculo gratis hoy"}
        </p>
      </div>

      {res && (
        <div className="tarjeta" style={{ marginTop: 12 }}>
          <Fila etiqueta="Sueldo bruto" valor={clp(res.bruto)} />
          <Fila etiqueta={`AFP (10% + comisión = ${res.afpPct.toFixed(2)}%)`} valor={"– " + clp(res.afp)} />
          <Fila etiqueta={`Salud (${res.saludPct}%)`} valor={"– " + clp(res.salud)} />
          <Fila etiqueta="Seguro de cesantía (0,6%)" valor={"– " + clp(res.cesantia)} />
          {res.impuesto > 0 && <Fila etiqueta="Impuesto único 2ª categoría" valor={"– " + clp(res.impuesto)} />}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", paddingTop: 12 }}>
            <strong>Líquido a recibir</strong>
            <span style={{ fontSize: 24, fontWeight: 800, color: "var(--azul)" }}>{clp(res.liquido)}</span>
          </div>
        </div>
      )}

      {premium && (
        <div className="tarjeta" style={{ marginTop: 14, textAlign: "center" }}>
          <p style={{ margin: "0 0 4px", fontWeight: 700 }}>Llegaste a tu cálculo gratis de hoy 🙂</p>
          <p className="nota" style={{ margin: "0 0 12px" }}>Con <strong>Premium</strong> calculas sin límite. Tu cálculo gratis se renueva mañana.</p>
          <button className="boton-premium" onClick={() => setNotaPremium(true)}>✨ Actualizar a Premium</button>
          {notaPremium && <p className="nota" style={{ marginTop: 10 }}>🚧 Los planes Premium están en preparación. ¡Gracias por tu interés!</p>}
        </div>
      )}

      <p className="nota" style={{ marginTop: 10, lineHeight: 1.5 }}>
        <strong>Estimación.</strong> Asume contrato indefinido (cesantía 0,6%) y AFP 10% + comisión. La comisión real
        de tu AFP y el valor de tu plan de <strong>Isapre</strong> pueden cambiar el resultado. Verifica en{" "}
        <a href="https://www.previred.com" target="_blank" rel="noopener noreferrer" style={{ color: "var(--azul)" }}>previred.com</a>.
      </p>
      <Link className="boton" style={{ width: "100%", marginTop: 12 }} href="/chat?q=AbogaBot,%20expl%C3%ADcame%20c%C3%B3mo%20se%20calcula%20el%20sueldo%20l%C3%ADquido%20en%20Chile%20(AFP%2C%20salud%2C%20cesant%C3%ADa%20e%20impuesto)">
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
