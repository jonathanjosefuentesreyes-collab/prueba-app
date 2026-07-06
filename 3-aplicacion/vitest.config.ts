import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

// Resuelve el alias "@/" (igual que tsconfig) para que los tests puedan importar
// módulos de la app —incluido src/app/sitemap— con las mismas rutas que el código real.
export default defineConfig({
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
});
