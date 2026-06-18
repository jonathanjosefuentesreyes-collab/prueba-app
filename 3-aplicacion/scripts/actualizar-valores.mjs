// Refresca valores objetivos (UF, UTM) desde mindicador.cl y los guarda como valores por
// defecto de las calculadoras. Lo corre un cron semanal (GitHub Actions) y también puede
// correrse a mano. Si una fuente falla, conserva el valor anterior (nunca rompe el build).
//
// Uso: node 3-aplicacion/scripts/actualizar-valores.mjs   (desde la raíz del repo)
import { writeFileSync, readFileSync } from "node:fs";

const RUTA = new URL("../src/lib/valores.json", import.meta.url);

async function indicador(nombre) {
  const r = await fetch(`https://mindicador.cl/api/${nombre}`, { headers: { "User-Agent": "leyes-de-chile" } });
  if (!r.ok) throw new Error(`${nombre} HTTP ${r.status}`);
  const j = await r.json();
  const v = j?.serie?.[0]?.valor;
  if (!(v > 0)) throw new Error(`${nombre} sin valor`);
  return v;
}

let prev = {};
try { prev = JSON.parse(readFileSync(RUTA, "utf8")); } catch { /* primera vez */ }

const out = { ...prev };
try { out.uf = Math.round(await indicador("uf")); } catch (e) { console.error("UF:", e.message); }
try { out.utm = Math.round(await indicador("utm")); } catch (e) { console.error("UTM:", e.message); }
out.anioActual = new Date().getFullYear();
out.actualizado = new Date().toISOString().slice(0, 10);

writeFileSync(RUTA, JSON.stringify(out, null, 2) + "\n");
console.log("valores actualizados:", JSON.stringify(out));
