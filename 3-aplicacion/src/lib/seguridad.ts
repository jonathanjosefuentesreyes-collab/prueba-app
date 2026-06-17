// Utilidades de seguridad compartidas por las rutas API: identificación de IP
// resistente a spoofing, rate-limit en memoria y verificación de mismo origen.
//
// NOTA de escala: el rate-limit vive EN MEMORIA (por instancia). En el plan free de
// Render hay una sola instancia, así que basta. Si algún día hay varias instancias o
// autoescalado, mover esto a un store compartido (Upstash/Redis) por la misma interfaz.

// El proxy de Render agrega la IP real del cliente al FINAL de x-forwarded-for. Tomar
// el último valor (no el primero) evita que el cliente falsee su IP para saltarse la cuota.
export function ipDe(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) {
    const partes = xff.split(",").map((s) => s.trim()).filter(Boolean);
    if (partes.length) return partes[partes.length - 1];
  }
  return req.headers.get("x-real-ip") || req.headers.get("fly-client-ip") || "anon";
}

const buckets = new Map<string, { inicio: number; n: number }>();

// Ventana móvil simple por (clave + IP). Devuelve si la solicitud está dentro del límite.
export function limitar(
  req: Request,
  clave: string,
  max: number,
  ventanaMs: number
): { ok: boolean; restantes: number } {
  const k = `${clave}:${ipDe(req)}`;
  const ahora = Date.now();
  let b = buckets.get(k);
  if (!b || ahora - b.inicio >= ventanaMs) {
    b = { inicio: ahora, n: 0 };
    buckets.set(k, b);
    if (buckets.size > 20000) {
      for (const [kk, vv] of buckets) if (ahora - vv.inicio >= ventanaMs) buckets.delete(kk);
    }
  }
  b.n += 1;
  return { ok: b.n <= max, restantes: Math.max(0, max - b.n) };
}

// Evita que OTROS sitios usen nuestras APIs (y nuestro Gemini) desde el navegador de sus
// visitantes. Si llega cabecera Origin y no es de nuestro host, se rechaza. Cuando no hay
// Origin (navegación propia del sitio o llamada server-to-server) no se bloquea aquí.
export function mismoOrigen(req: Request): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return true;
  try {
    return new URL(origin).host === req.headers.get("host");
  } catch {
    return false;
  }
}
