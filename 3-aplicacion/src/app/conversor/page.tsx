"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import valores from "@/lib/valores.json";

const clp = (n: number) => "$" + Math.round(n).toLocaleString("es-CL");
const num = (n: number) => Math.round(n).toLocaleString("es-CL");

export default function Conversor() {
  const [vals, setVals] = useState<{ uf: number; utm: number; dolar: number | null; euro: number | null }>({
    uf: valores.uf, utm: valores.utm, dolar: valores.dolar ?? null, euro: valores.euro ?? null,
  });
  const [cargando, setCargando] = useState(false);
  const [monto, setMonto] = useState(1);
  const [unidad, setUnidad] = useState<"UF" | "UTM" | "USD" | "EUR" | "CLP">("UF");

  // Refresca en vivo al entrar (el precarga del cron semanal se muestra al instante).
  useEffect(() => { actualizar(); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, []);

  async function actualizar() {
    setCargando(true);
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
      /* conserva el precarga */
    } finally {
      setCargando(false);
    }
  }

  const unidadCLP: Record<string, number> = {
    CLP: 1, UF: vals.uf, UTM: vals.utm, USD: vals.dolar ?? 0, EUR: vals.euro ?? 0,
  };
  const enCLP = monto * (unidadCLP[unidad] || 0);

  return (
    <main style={{ paddingBottom: 80 }}>
      <header className="header" style={{ justifyContent: "flex-start", gap: 12 }}>
        <Link href="/premium" aria-label="Volver a Premium" style={{ display: "flex" }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M15 18l-6-6 6-6" /></svg>
        </Link>
        <span className="marca" style={{ fontSize: 17 }}><span className="azul">Conversor</span> <span className="rojo">UF · UTM · $</span></span>
      </header>

      <div className="tarjeta">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <strong style={{ fontSize: 14 }}>Valores de hoy</strong>
          <button className="chip" style={{ padding: "5px 12px", background: "var(--azul)", color: "#fff" }} onClick={actualizar} disabled={cargando}>
            {cargando ? "Actualizando…" : "Actualizar"}
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
            <label className="etiqueta" htmlFor="monto">Cantidad</label>
            <input id="monto" className="campo" type="number" min={0} step="any" value={monto} onChange={(e) => setMonto(+e.target.value)} />
          </div>
          <div>
            <label className="etiqueta" htmlFor="unidad">Unidad</label>
            <select id="unidad" className="campo" value={unidad} onChange={(e) => setUnidad(e.target.value as typeof unidad)}>
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
            <strong style={{ fontSize: 22, color: "var(--azul)" }}>{clp(enCLP)}</strong>
          </div>
        </div>
        {unidad !== "CLP" ? (
          <p className="nota" style={{ margin: 0 }}>{num(monto)} {unidad} equivale a {clp(enCLP)} pesos.</p>
        ) : (
          <div style={{ fontSize: 13, lineHeight: 1.7 }}>
            {num(monto)} pesos equivalen a:{" "}
            <strong>{(monto / vals.uf).toFixed(4)} UF</strong> ·{" "}
            <strong>{(monto / vals.utm).toFixed(4)} UTM</strong>
            {vals.dolar && <> · <strong>US${(monto / vals.dolar).toFixed(2)}</strong></>}
            {vals.euro && <> · <strong>€{(monto / vals.euro).toFixed(2)}</strong></>}
          </div>
        )}
      </div>

      <p className="nota" style={{ marginTop: 10, lineHeight: 1.5 }}>
        Valores referenciales del Banco Central vía mindicador.cl. La UF se reajusta a diario.
      </p>
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
