"use client";

import { useState } from "react";
import Link from "next/link";
import { calcularFiniquito, type Causal, type ResultadoFiniquito } from "@/lib/finiquito";

const CAUSALES: { valor: Causal; etiqueta: string }[] = [
  { valor: "necesidades_empresa", etiqueta: "Necesidades de la empresa (art. 161)" },
  { valor: "desahucio", etiqueta: "Desahucio (art. 161 inc. 2°)" },
  { valor: "renuncia", etiqueta: "Renuncia voluntaria (art. 159 N°2)" },
  { valor: "mutuo_acuerdo", etiqueta: "Mutuo acuerdo (art. 159 N°1)" },
  { valor: "vencimiento_plazo", etiqueta: "Vencimiento del plazo (art. 159 N°4)" },
  { valor: "art160", etiqueta: "Causal del art. 160" },
];

const clp = (n: number) => "$" + Math.round(n).toLocaleString("es-CL");

export default function Calculadora() {
  const [causal, setCausal] = useState<Causal>("necesidades_empresa");
  const [inicio, setInicio] = useState("2021-03-01");
  const [termino, setTermino] = useState(new Date().toISOString().slice(0, 10));
  const [sueldo, setSueldo] = useState(850000);
  const [uf, setUf] = useState(40768.69);
  const [aviso, setAviso] = useState(false);
  const [vacaciones, setVacaciones] = useState(0);
  const [impagos, setImpagos] = useState(0);
  const [resultado, setResultado] = useState<ResultadoFiniquito | null>(null);
  const [error, setError] = useState("");
  const [buscandoUf, setBuscandoUf] = useState(false);

  async function ufDeHoy() {
    setBuscandoUf(true);
    try {
      const r = await fetch("https://mindicador.cl/api/uf");
      const j = await r.json();
      const valor = j?.serie?.[0]?.valor;
      if (valor) setUf(valor);
    } catch {
      setError("No se pudo obtener la UF automáticamente — ingrésala a mano (sii.cl).");
    } finally {
      setBuscandoUf(false);
    }
  }

  function calcular(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    try {
      setResultado(
        calcularFiniquito({
          causal,
          fechaInicio: inicio,
          fechaTermino: termino,
          remuneracionMensual: sueldo,
          valorUF: uf,
          avisoPrevio30Dias: aviso,
          diasFeriadoAcumuladosHabiles: vacaciones,
          diasTrabajadosImpagos: impagos,
        })
      );
    } catch (err) {
      setResultado(null);
      setError(err instanceof Error ? err.message : "Revisa los datos ingresados.");
    }
  }

  const preguntaChat = resultado
    ? `AbogaBot, explícame en simple este finiquito que calculó la app (no recalcules, solo explica y cita los artículos): causal ${causal}; ${resultado.lineas.map((l) => `${l.concepto}: ${clp(l.monto)}`).join("; ")}; total estimado ${clp(resultado.total)}.`
    : "";

  return (
    <main>
      <header className="header">
        <span className="marca"><span className="azul">Calculadora</span> <span className="rojo">de Finiquito</span></span>
      </header>

      <form onSubmit={calcular} className="tarjeta" style={{ display: "grid", gap: 12 }}>
        <div>
          <label className="etiqueta" htmlFor="causal">Causal de término</label>
          <select id="causal" className="campo" value={causal} onChange={(e) => setCausal(e.target.value as Causal)}>
            {CAUSALES.map((c) => <option key={c.valor} value={c.valor}>{c.etiqueta}</option>)}
          </select>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <div>
            <label className="etiqueta" htmlFor="inicio">Fecha de inicio</label>
            <input id="inicio" className="campo" type="date" value={inicio} onChange={(e) => setInicio(e.target.value)} />
          </div>
          <div>
            <label className="etiqueta" htmlFor="termino">Fecha de término</label>
            <input id="termino" className="campo" type="date" value={termino} onChange={(e) => setTermino(e.target.value)} />
          </div>
          <div>
            <label className="etiqueta" htmlFor="sueldo">Última remuneración (CLP)</label>
            <input id="sueldo" className="campo" type="number" min={0} step={1000} value={sueldo} onChange={(e) => setSueldo(+e.target.value)} />
          </div>
          <div>
            <label className="etiqueta" htmlFor="uf">Valor UF</label>
            <input id="uf" className="campo" type="number" min={0} step={0.01} value={uf} onChange={(e) => setUf(+e.target.value)} />
          </div>
          <div>
            <label className="etiqueta" htmlFor="vac">Vacaciones acumuladas (días hábiles)</label>
            <input id="vac" className="campo" type="number" min={0} step={1} value={vacaciones} onChange={(e) => setVacaciones(+e.target.value)} />
          </div>
          <div>
            <label className="etiqueta" htmlFor="imp">Días del mes sin pagar</label>
            <input id="imp" className="campo" type="number" min={0} max={30} step={1} value={impagos} onChange={(e) => setImpagos(+e.target.value)} />
          </div>
        </div>
        <label style={{ fontSize: 14, display: "flex", gap: 8, alignItems: "center" }}>
          <input type="checkbox" checked={aviso} onChange={(e) => setAviso(e.target.checked)} />
          El empleador avisó con 30 días (solo art. 161)
        </label>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="boton" type="submit" style={{ flex: 1 }}>Calcular finiquito</button>
          <button className="boton secundario" type="button" onClick={ufDeHoy} disabled={buscandoUf}>
            {buscandoUf ? "Buscando…" : "UF de hoy"}
          </button>
        </div>
        {error && <p className="aviso">{error}</p>}
      </form>

      {resultado && (
        <div style={{ marginTop: 14 }}>
          <div className="tarjeta">
            {resultado.lineas.map((l, i) => (
              <div key={i} style={{ padding: "10px 0", borderBottom: "1px solid var(--borde)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 10, fontSize: 14 }}>
                  <span>{l.concepto}</span>
                  <strong style={{ whiteSpace: "nowrap" }}>{clp(l.monto)}</strong>
                </div>
                <div className="nota" style={{ marginTop: 3 }}>{l.formula} · <span className="chip" style={{ padding: "1px 8px" }}>{l.fundamento}</span></div>
              </div>
            ))}
            {resultado.lineas.length === 0 && <p className="nota">Con esta causal y datos no se generan haberes.</p>}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", paddingTop: 12 }}>
              <strong>Total estimado</strong>
              <span style={{ fontSize: 24, fontWeight: 800, color: "var(--azul)" }}>{clp(resultado.total)}</span>
            </div>
          </div>
          <div className="lista" style={{ marginTop: 10 }}>
            {resultado.advertencias.map((a, i) => <p key={i} className="aviso">⚠ {a}</p>)}
          </div>
          <Link className="boton" style={{ width: "100%", marginTop: 12 }} href={`/chat?q=${encodeURIComponent(preguntaChat)}`}>
            Explicar mi resultado con AbogaBot →
          </Link>
        </div>
      )}
    </main>
  );
}
