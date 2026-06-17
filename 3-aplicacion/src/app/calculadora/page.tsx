"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { calcularFiniquito, type Causal, type ResultadoFiniquito } from "@/lib/finiquito";

// Cada fundamento legal se enlaza al artículo real en la Biblioteca (Código del Trabajo,
// norma 207436). IDs verificados contra la base. Así el número que calcula la app queda
// respaldado por su fuente oficial, clicable.
const ART_FINIQUITO: Record<number, number> = {
  32: 3054, 54: 3087, 55: 3089, 67: 3108, 69: 3110, 73: 3114,
  159: 3293, 160: 3294, 161: 3295, 162: 3297, 163: 3298, 168: 3304, 172: 3308,
};
function hrefFundamento(fundamento: string): string | null {
  const m = fundamento.match(/arts?\.\s*(\d+)/i);
  if (!m) return null;
  const id = ART_FINIQUITO[Number(m[1])];
  return id ? `/leyes/207436?art=${id}` : null;
}

// Límite freemium: 1 cálculo gratis por día por persona (localStorage). El motor es
// determinista y corre en el navegador, así que el límite es una barrera suave que
// engancha a Premium —no un control estricto—, en la misma línea que la cuota del chat.
const MAX_CALC_DIA = 1;
const CLAVE_USOS = "calc_finiquito_usos";
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
  const [usados, setUsados] = useState(0);
  const [premium, setPremium] = useState(false);
  const [notaPremium, setNotaPremium] = useState(false);

  useEffect(() => { setUsados(leerUsosHoy()); }, []);
  const sinCalculosHoy = usados >= MAX_CALC_DIA;

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
    // Ya usó su cálculo gratis de hoy → gancho Premium (no recalcula; deja ver el anterior).
    if (sinCalculosHoy) {
      setPremium(true);
      return;
    }
    try {
      const r = calcularFiniquito({
        causal,
        fechaInicio: inicio,
        fechaTermino: termino,
        remuneracionMensual: sueldo,
        valorUF: uf,
        avisoPrevio30Dias: aviso,
        diasFeriadoAcumuladosHabiles: vacaciones,
        diasTrabajadosImpagos: impagos,
      });
      setResultado(r);
      setUsados(registrarUso());
    } catch (err) {
      setResultado(null);
      setError(err instanceof Error ? err.message : "Revisa los datos ingresados.");
    }
  }

  const preguntaChat = resultado
    ? `AbogaBot, explícame en simple este finiquito que calculó la app (no recalcules, solo explica y cita los artículos): causal ${causal}; ${resultado.lineas.map((l) => `${l.concepto}: ${clp(l.monto)}`).join("; ")}; total estimado ${clp(resultado.total)}.`
    : "";

  return (
    <main style={{ paddingBottom: 80 }}>
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
        <p style={{ margin: "2px 0 0", textAlign: "center", fontSize: 12, fontWeight: 600, color: sinCalculosHoy ? "var(--rojo)" : "var(--texto-suave)" }}>
          {sinCalculosHoy ? "Usaste tu cálculo gratis de hoy · ✨ Premium para más" : "Tienes 1 cálculo de finiquito gratis hoy"}
        </p>
      </form>

      {premium && (
        <div className="tarjeta" style={{ marginTop: 14, textAlign: "center" }}>
          <p style={{ margin: "0 0 4px", fontWeight: 700 }}>Llegaste a tu cálculo gratis de hoy 🙂</p>
          <p className="nota" style={{ margin: "0 0 12px" }}>
            Con <strong>Premium</strong> calculas finiquitos sin límite. Tu cálculo gratis se renueva mañana.
          </p>
          <button className="boton-premium" onClick={() => setNotaPremium(true)}>✨ Actualizar a Premium</button>
          {notaPremium && (
            <p className="nota" style={{ marginTop: 10 }}>
              🚧 Los planes Premium están en preparación. ¡Gracias por tu interés!
            </p>
          )}
        </div>
      )}

      {resultado && (
        <div style={{ marginTop: 14 }}>
          <div className="tarjeta">
            {resultado.lineas.map((l, i) => (
              <div key={i} style={{ padding: "10px 0", borderBottom: "1px solid var(--borde)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 10, fontSize: 14 }}>
                  <span>{l.concepto}</span>
                  <strong style={{ whiteSpace: "nowrap" }}>{clp(l.monto)}</strong>
                </div>
                <div className="nota" style={{ marginTop: 3 }}>
                  {l.formula} ·{" "}
                  {hrefFundamento(l.fundamento)
                    ? <Link href={hrefFundamento(l.fundamento)!} className="chip" style={{ padding: "1px 8px" }}>{l.fundamento} ↗</Link>
                    : <span className="chip" style={{ padding: "1px 8px" }}>{l.fundamento}</span>}
                </div>
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
