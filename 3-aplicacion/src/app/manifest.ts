import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Leyes de Chile — biblioteca legal y AbogaBot",
    short_name: "Leyes de Chile",
    description:
      "Todas las leyes chilenas actualizadas desde la BCN, calculadora de finiquito y asistente legal con citas verificables.",
    start_url: "/",
    display: "standalone",
    background_color: "#eef1f7",
    theme_color: "#0039a6",
    lang: "es-CL",
    icons: [
      { src: "/logo.png", sizes: "192x192", type: "image/png" },
      { src: "/logo.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
