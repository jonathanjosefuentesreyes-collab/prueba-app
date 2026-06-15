// Toma capturas de Leyes de Chile a tamaño de teléfono Android, para revisar
// el diseño con ojos propios. Uso: node capturar.mjs [baseURL]
import { chromium, devices } from "playwright";

const base = process.argv[2] || "https://leyes-de-chile.fly.dev";
const pantallas = [
  { ruta: "/", nombre: "1-inicio", esperaSplash: true },
  { ruta: "/leyes", nombre: "2-biblioteca" },
  { ruta: "/calculadora", nombre: "3-calculadora" },
  { ruta: "/chat?q=" + encodeURIComponent("que beneficios tienen los extranjeros"), nombre: "4-chat" },
  { ruta: "/guias", nombre: "5-guias" },
];

const pixel = devices["Pixel 7"];
const browser = await chromium.launch();
const context = await browser.newContext({ ...pixel });
const page = await context.newPage();

for (const p of pantallas) {
  try {
    await page.goto(base + p.ruta, { waitUntil: "networkidle", timeout: 60000 });
    await page.waitForTimeout(p.esperaSplash ? 3000 : 1500);
    await page.screenshot({ path: `shot-${p.nombre}.png`, fullPage: false });
    console.log(`OK ${p.nombre}`);
  } catch (e) {
    console.log(`FALLO ${p.nombre}: ${e.message}`);
  }
}

// Captura extra del splash (sin esperar a que se desvanezca)
try {
  await page.goto(base + "/", { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForTimeout(400);
  await page.screenshot({ path: "shot-0-splash.png", fullPage: false });
  console.log("OK 0-splash");
} catch (e) {
  console.log(`FALLO splash: ${e.message}`);
}

await browser.close();
console.log("LISTO");
