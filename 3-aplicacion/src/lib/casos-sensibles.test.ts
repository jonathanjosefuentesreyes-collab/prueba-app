import { describe, it, expect } from "vitest";
import { respuestaSensible, CASOS_SENSIBLES } from "./casos-sensibles";

// Por qué estos tests: estas frases las escribe una persona en crisis. Si una deja
// de detectarse, recibiría una respuesta legal fría en vez de un teléfono de ayuda.
// Es el código más delicado del proyecto; aquí lo blindamos contra regresiones.

describe("respuestaSensible — crisis de salud mental → *4141", () => {
  const frases = [
    "me quiero morir",
    "ya no quiero seguir viviendo",
    "estoy pensando en suicidarme",
    "quiero quitarme la vida",
    "a veces pienso en matarme",
    "quiero hacerme daño",
    "no quiero vivir más",
  ];
  for (const f of frases) {
    it(`detecta: "${f}"`, () => {
      const r = respuestaSensible(f);
      expect(r).not.toBeNull();
      expect(r).toContain("*4141");
    });
  }
});

describe("respuestaSensible — violencia intrafamiliar → 1455", () => {
  const frases = [
    "mi marido me pega",
    "mi pareja me golpea",
    "mi conviviente me amenaza",
    "sufro violencia intrafamiliar",
    "tengo miedo de mi marido",
    "él me maltrata todos los días",
  ];
  for (const f of frases) {
    it(`detecta: "${f}"`, () => {
      const r = respuestaSensible(f);
      expect(r).not.toBeNull();
      expect(r).toContain("1455");
    });
  }
});

describe("respuestaSensible — niño en peligro / maltrato infantil → 147", () => {
  const frases = [
    "maltratan a mi hijo",
    "abusan de una niña en mi barrio",
    "le pega a mi hija todos los días",
    "están abusando de un menor",
    "mi hija sufre abuso",
    "hay maltrato infantil en la casa de al lado",
    "abuso sexual a un menor",
    "violan a un niño",
  ];
  for (const f of frases) {
    it(`detecta: "${f}"`, () => {
      const r = respuestaSensible(f);
      expect(r).not.toBeNull();
      expect(r).toContain("147");
    });
  }
});

describe("respuestaSensible — emergencia en curso → 133/134", () => {
  const frases = ["me están asaltando", "están robando en mi casa", "es una emergencia ahora"];
  for (const f of frases) {
    it(`detecta: "${f}"`, () => {
      const r = respuestaSensible(f);
      expect(r).not.toBeNull();
      expect(r).toContain("133");
    });
  }
});

describe("respuestaSensible — consultas legales normales NO se desvían", () => {
  // Estas deben seguir su curso normal hacia Gemini (devuelven null), aunque
  // contengan palabras cercanas a los patrones (matar, robo en pasado, miedo genérico).
  const benignas = [
    "me despidieron sin aviso, ¿qué me corresponde?",
    "cuánto es la pensión de alimentos por un hijo",
    "quiero arrendar una casa sin contrato",
    "estoy en dicom, ¿pueden cobrarme igual?",
    "qué pena hay por matar a una persona", // homicidio: pregunta legal, no crisis personal
    "me robaron el celular la semana pasada", // robo en pasado, no emergencia en curso
    "tengo miedo de perder mi trabajo",
    "puedo pedir la tuición de mi hijo", // tema de familia, no maltrato
    "cómo inscribo a mi hijo en el colegio",
    "quiero pedir pensión de alimentos por mi hija",
  ];
  for (const f of benignas) {
    it(`NO desvía: "${f}"`, () => {
      expect(respuestaSensible(f)).toBeNull();
    });
  }
});

describe("respuestaSensible — robustez", () => {
  it("no falla con mensaje vacío", () => {
    expect(respuestaSensible("")).toBeNull();
  });
  it("ignora mayúsculas y acentos del patrón", () => {
    expect(respuestaSensible("ME QUIERO MORIR")).toContain("*4141");
    expect(respuestaSensible("me estan asaltando")).toContain("133");
  });
  it("toda respuesta sensible trae un teléfono de ayuda", () => {
    for (const caso of CASOS_SENSIBLES) {
      expect(/\b(\*4141|1455|149|147|134|133|600\s?360)/.test(caso.respuesta)).toBe(true);
    }
  });
});
