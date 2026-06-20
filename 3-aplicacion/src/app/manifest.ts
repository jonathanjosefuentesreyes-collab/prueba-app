import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "Leyes de Chile — biblioteca legal y AbogaBot",
    short_name: "Leyes de Chile",
    description:
      "Todas las leyes chilenas actualizadas desde la BCN, calculadora de finiquito y asistente legal con citas verificables.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#0a4595",
    theme_color: "#0a4595",
    lang: "es-CL",
    dir: "ltr",
    categories: ["education", "books", "productivity"],
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
    shortcuts: [
      { name: "Preguntar a AbogaBot", short_name: "AbogaBot", url: "/chat" },
      { name: "Buscar leyes", short_name: "Leyes", url: "/leyes" },
      { name: "Calculadora de finiquito", short_name: "Finiquito", url: "/calculadora" },
    ],
  };
}
