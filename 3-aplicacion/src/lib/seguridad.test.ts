import { describe, it, expect } from "vitest";
import { ipDe, mismoOrigen } from "./seguridad";

// Doble de Request mínimo: ipDe y mismoOrigen solo leen req.headers.get(). Construir
// un Request real complica cabeceras "prohibidas" como host, así que usamos un fake.
function reqCon(headers: Record<string, string>): Request {
  const map = new Map(Object.entries(headers).map(([k, v]) => [k.toLowerCase(), v]));
  return { headers: { get: (k: string) => map.get(k.toLowerCase()) ?? null } } as unknown as Request;
}

// La identificación de IP sostiene la cuota anti-abuso. Si se tomara el PRIMER valor de
// x-forwarded-for, un cliente podría falsear su IP y saltarse el límite gratis infinitas
// veces. Estos tests blindan que se tome el valor correcto (el que agrega el proxy).
describe("ipDe — resistente a spoofing", () => {
  it("prioriza cf-connecting-ip (IP real tras Cloudflare)", () => {
    expect(ipDe(reqCon({ "cf-connecting-ip": "1.2.3.4", "x-forwarded-for": "9.9.9.9" }))).toBe("1.2.3.4");
  });

  it("toma el ÚLTIMO valor de x-forwarded-for, no el falseable primero", () => {
    expect(ipDe(reqCon({ "x-forwarded-for": "1.1.1.1, 2.2.2.2, 3.3.3.3" }))).toBe("3.3.3.3");
  });

  it("ignora espacios alrededor del valor", () => {
    expect(ipDe(reqCon({ "x-forwarded-for": "1.1.1.1 ,  2.2.2.2 " }))).toBe("2.2.2.2");
  });

  it("cae a x-real-ip cuando no hay XFF", () => {
    expect(ipDe(reqCon({ "x-real-ip": "5.5.5.5" }))).toBe("5.5.5.5");
  });

  it("devuelve 'anon' si no hay ninguna cabecera de IP", () => {
    expect(ipDe(reqCon({}))).toBe("anon");
  });
});

// Evita que OTROS sitios usen nuestras APIs (y nuestro Gemini) desde el navegador de sus
// visitantes. Sin Origin (navegación propia o server-to-server) se permite; con Origin
// ajeno se rechaza.
describe("mismoOrigen — solo nuestro propio sitio", () => {
  it("permite cuando no hay cabecera Origin", () => {
    expect(mismoOrigen(reqCon({ host: "leyesdechile.com" }))).toBe(true);
  });

  it("permite cuando el Origin coincide con el host", () => {
    expect(mismoOrigen(reqCon({ origin: "https://leyesdechile.com", host: "leyesdechile.com" }))).toBe(true);
  });

  it("rechaza cuando el Origin es otro sitio", () => {
    expect(mismoOrigen(reqCon({ origin: "https://malicioso.com", host: "leyesdechile.com" }))).toBe(false);
  });

  it("rechaza un Origin con formato inválido", () => {
    expect(mismoOrigen(reqCon({ origin: "no-es-una-url", host: "leyesdechile.com" }))).toBe(false);
  });
});
