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
import {
  sueldoDesdeBruto,
  sueldoDesdeLiquido,
  AFP_COMISION_DEF,
  SALUD_DEF,
  type ResultadoSueldo,
} from "@/lib/sueldo";
import valores from "@/lib/valores.json";

const clp = (n: number) => "$" + Math.round(n).toLocaleString("es-CL");
const num = (n: number) => Math.round(n).toLocaleString("es-CL");
const ANIOS = Object.keys(RETENCION_POR_ANIO).map(Number).sort();
const ANIO_DEF = Math.min(Math.max(new Date().getFullYear(), ANIOS[0]), ANIOS[ANIOS.length - 1]);

// Límite freemium: 1 cálculo gratis por día (localStorage), igual que el finiquito. El
// resultado aparece al presionar "Calcular"; más cálculos quedan para Premium. (El
// conversor de valores queda libre: es una consulta rápida, no un cálculo gatillable.)
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

type Tab = "honorarios" | "iva" | "sueldo" | "conversor";
type ResHon = ReturnType<typeof boletaHonorarios> & { tasa: number };
type ResIva = ReturnType<typeof calcularIVA>;
const TABS: { id: Tab; label: string }[] = [
  { id: "honorarios", label: "Honorarios" },
  { id: "iva", label: "IVA 19%" },
  { id: "sueldo", label: "Sueldo líquido" },
  { id: "conversor", label: "Conversor" },
];

export default function Facturacion() {
  const [tab, setTab] = useState<Tab>("honorarios");

  // Boleta de honorarios
  const [anio, setAnio] = useState(ANIO_DEF);
  const [tasa, setTasa] = useState(retencionDefault(ANIO_DEF));
  const [modoH, setModoH] = useState<"bruto" | "liquido">("bruto");
  const [montoH, setMontoH] = useState(500000);

  // IVA
  const [modoI, setModoI] = useState<"neto" | "total">("neto");
  const [montoI, setMontoI] = useState(100000);

  // Sueldo líquido
  const [modoS, setModoS] = useState<"bruto" | "liquido">("bruto");
  const [montoS, setMontoS] = useState(1000000);
  const [afpCom, setAfpCom] = useState(AFP_COMISION_DEF);
  const [saludPct, setSaludPct] = useState(SALUD_DEF);

  // Conversor (valores del día): precarga desde valores.json (cron semanal) y refresca
  // en vivo al abrir la pestaña.
  const [vals, setVals] = useState<{ uf: number; utm: number; dolar: number | null; euro: number | null }>({
    uf: valores.uf, utm: valores.utm, dolar: valores.dolar ?? null, euro: valores.euro ?? null,
  });
  const [cargandoVals, setCargandoVals] = useState(false);
  const [valsFrescos, setValsFrescos] = useState(false);
  const [montoC, setMontoC] = useState(1);
  const [unidadC, setUnidadC] = useState<"UF" | "UTM" | "USD" | "EUR" | "CLP">("UF");

  // Freemium + resultados (snapshot tras "Calcular")
  const [usados, setUsados] = useState(0);
  const [premium, setPremium] = useState(false);
  const [notaPremium, setNotaPremium] = useState(false);
  const [resH, setResH] = useState<ResHon | null>(null);
  const [resI, setResI] = useState<ResIva | null>(null);
  const [resS, setResS] = useState<ResultadoSueldo | null>(null);

  useEffect(() => { setUsados(leerUsosHoy()); }, []);
  const sinCalculosHoy = usados >= MAX_CALC_DIA;

  // Refresca los valores en vivo la primera vez que se abre el conversor (el precarga ya
  // se muestra al instante mientras tanto).
  useEffect(() => {
    if (tab === "conversor" && !valsFrescos) {
      setValsFrescos(true);
      actualizarValores();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab, valsFrescos]);

  async function actualizarValores() {
    setCargandoVals(true);
    try {
      const r = await fetch("https://mindicador.cl/api");
      const j = await r.json();
      setVals({
        uf: j?.uf?.valor ?? valores.uf,
        utm: j?.utm?.valor ?? valores.utm,
        dolar: j?.dolar?.valor ?? null,
        euro: j?.euro?.valor ?? null,
      });
    } catch {
      // se queda con los valores precargados
    } finally {
      setCargandoVals(false);
    }
  }

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
  function calcularSueldo() {
    if (sinCalculosHoy) { setPremium(true); return; }
    const p = { afpComision: afpCom, salud: saludPct, valorUF: vals.uf, valorUTM: vals.utm };
    setResS(modoS === "bruto" ? sueldoDesdeBruto(montoS, p) : sueldoDesdeLiquido(montoS, p));
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
      <p className="nota" style={{ margin: "0 0 12px" }}>
        Con <strong>Premium</strong> usas todas las calculadoras sin límite. Tu cálculo gratis se renueva mañana.
      </p>
      <button className="boton-premium" onClick={() => setNotaPremium(true)}>✨ Actualizar a Premium</button>
      {notaPremium && <p className="nota" style={{ marginTop: 10 }}>🚧 Los planes Premium están en preparación. ¡Gracias por tu interés!</p>}
    </div>
  );

  // Valor en CLP de 1 unidad de cada tipo (para el conversor)
  const unidadCLP: Record<string, number> = {
    CLP: 1, UF: vals.uf, UTM: vals.utm, USD: vals.dolar ?? 0, EUR: vals.euro ?? 0,
  };
  const montoEnCLP = montoC * (unidadCLP[unidadC] || 0);

  return (
    <main style={{ paddingBottom: 80 }}>
      <header className="header">
        <span className="marca"><span className="azul">Calculadoras</span> <span className="rojo">de Facturación</span></span>
      </header>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 14 }}>
        {TABS.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)} className="boton" style={{ background: tab === t.id ? "var(--azul)" : "#fff", color: tab === t.id ? "#fff" : "var(--texto)", border: "1px solid var(--borde-fuerte)", fontSize: 14 }}>
            {t.label}
          </button>
        ))}
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

      {tab === "sueldo" && (
        <>
          <div className="tarjeta" style={{ display: "grid", gap: 12 }}>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => setModoS("bruto")} className="chip" style={{ flex: 1, padding: "8px", background: modoS === "bruto" ? "var(--azul)" : "#eef", color: modoS === "bruto" ? "#fff" : "var(--azul)", fontWeight: 700 }}>Tengo el bruto</button>
              <button onClick={() => setModoS("liquido")} className="chip" style={{ flex: 1, padding: "8px", background: modoS === "liquido" ? "var(--azul)" : "#eef", color: modoS === "liquido" ? "#fff" : "var(--azul)", fontWeight: 700 }}>Quiero recibir (líquido)</button>
            </div>
            <div>
              <label className="etiqueta" htmlFor="montoS">{modoS === "bruto" ? "Sueldo bruto imponible (CLP)" : "Líquido que quieres recibir (CLP)"}</label>
              <input id="montoS" className="campo" type="number" min={0} step={10000} value={montoS} onChange={(e) => setMontoS(+e.target.value)} />
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
            <button className="boton" type="button" onClick={calcularSueldo}>Calcular sueldo líquido</button>
            {avisoUso}
          </div>
          {resS && (
            <div className="tarjeta" style={{ marginTop: 12 }}>
              <Fila etiqueta="Sueldo bruto" valor={clp(resS.bruto)} />
              <Fila etiqueta={`AFP (10% + comisión = ${resS.afpPct.toFixed(2)}%)`} valor={"– " + clp(resS.afp)} />
              <Fila etiqueta={`Salud (${resS.saludPct}%)`} valor={"– " + clp(resS.salud)} />
              <Fila etiqueta="Seguro de cesantía (0,6%)" valor={"– " + clp(resS.cesantia)} />
              {resS.impuesto > 0 && <Fila etiqueta="Impuesto único 2ª categoría" valor={"– " + clp(resS.impuesto)} />}
              <Total etiqueta="Líquido a recibir" valor={clp(resS.liquido)} />
            </div>
          )}
          {bloquePremium}
          <p className="nota" style={{ marginTop: 10, lineHeight: 1.5 }}>
            <strong>Estimación.</strong> Asume contrato indefinido (cesantía 0,6%) y AFP 10% + comisión. La comisión real
            de tu AFP y el valor de tu plan de <strong>Isapre</strong> pueden cambiar el resultado. Verifica en{" "}
            <a href="https://www.previred.com" target="_blank" rel="noopener noreferrer" style={{ color: "var(--azul)" }}>previred.com</a>.
          </p>
        </>
      )}

      {tab === "conversor" && (
        <>
          <div className="tarjeta">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <strong style={{ fontSize: 14 }}>Valores de hoy</strong>
              <button className="chip" style={{ padding: "5px 12px", background: "var(--azul)", color: "#fff" }} onClick={actualizarValores} disabled={cargandoVals}>
                {cargandoVals ? "Actualizando…" : "Actualizar"}
              </button>
            </div>
            <Fila etiqueta="UF" valor={"$" + num(vals.uf)} />
            <Fila etiqueta="UTM" valor={"$" + num(vals.utm)} />
            <Fila etiqueta="Dólar (USD)" valor={vals.dolar ? "$" + num(vals.dolar) : "—"} />
            <Fila etiqueta="Euro (EUR)" valor={vals.euro ? "$" + num(vals.euro) : "—"} />
          </div>

          <div className="tarjeta" style={{ marginTop: 12, display: "grid", gap: 12 }}>
            <strong style={{ fontSize: 14 }}>Conversor</strong>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <div>
                <label className="etiqueta" htmlFor="montoC">Cantidad</label>
                <input id="montoC" className="campo" type="number" min={0} step="any" value={montoC} onChange={(e) => setMontoC(+e.target.value)} />
              </div>
              <div>
                <label className="etiqueta" htmlFor="unidadC">Unidad</label>
                <select id="unidadC" className="campo" value={unidadC} onChange={(e) => setUnidadC(e.target.value as typeof unidadC)}>
                  <option value="UF">UF</option>
                  <option value="UTM">UTM</option>
                  <option value="USD">Dólar (USD)</option>
                  <option value="EUR">Euro (EUR)</option>
                  <option value="CLP">Pesos (CLP)</option>
                </select>
              </div>
            </div>
            <div style={{ background: "var(--azul-claro)", borderRadius: 12, padding: "12px 14px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <span style={{ fontSize: 13, color: "var(--texto-suave)" }}>En pesos</span>
                <strong style={{ fontSize: 22, color: "var(--azul)" }}>{clp(montoEnCLP)}</strong>
              </div>
            </div>
            {unidadC !== "CLP" && (
              <p className="nota" style={{ margin: 0 }}>{num(montoC)} {unidadC} equivale a {clp(montoEnCLP)} pesos.</p>
            )}
            {unidadC === "CLP" && (
              <div style={{ fontSize: 13, lineHeight: 1.7 }}>
                {num(montoC)} pesos equivalen a:{" "}
                <strong>{(montoC / vals.uf).toFixed(4)} UF</strong> ·{" "}
                <strong>{(montoC / vals.utm).toFixed(4)} UTM</strong>
                {vals.dolar && <> · <strong>US${(montoC / vals.dolar).toFixed(2)}</strong></>}
                {vals.euro && <> · <strong>€{(montoC / vals.euro).toFixed(2)}</strong></>}
              </div>
            )}
          </div>
          <p className="nota" style={{ marginTop: 10, lineHeight: 1.5 }}>
            Valores referenciales del Banco Central vía mindicador.cl. La UF se reajusta a diario.
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
function Total({ etiqueta, valor }: { etiqueta: string; valor: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", paddingTop: 12 }}>
      <strong>{etiqueta}</strong>
      <span style={{ fontSize: 24, fontWeight: 800, color: "var(--azul)" }}>{valor}</span>
    </div>
  );
}
