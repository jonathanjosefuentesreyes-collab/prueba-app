// Captura a página completa una guía concreta, tamaño teléfono. Uso:
//   node capturar-guia.mjs [baseURL] [ruta]
import { chromium, devices } from "playwright";

const base = process.argv[2] || "http://127.0.0.1:3002";
const ruta = process.argv[3] || "/guias/finiquito-cuanto-me-corresponde";

const pixel = devices["Pixel 7"];
const browser = await chromium.launch();
const context = await browser.newContext({ ...pixel });
const page = await context.newPage();

try {
  await page.goto(base + ruta, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(1200);
  await page.screenshot({ path: "shot-guia-finiquito.png", fullPage: true });
  console.log("OK captura guía");

  // Verifica que el primer enlace de cita apunte a la Biblioteca en el art correcto
  const hrefs = await page.$$eval("a", (as) => as.map((a) => a.getAttribute("href")).filter(Boolean));
  const citas = hrefs.filter((h) => h.startsWith("/leyes/207436?art="));
  console.log("Enlaces de cita a la Biblioteca:", JSON.stringify(citas));
} catch (e) {
  console.log("FALLO:", e.message);
}

await browser.close();
console.log("LISTO");
