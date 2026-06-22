import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

// Content-Security-Policy. Las fuentes se autohospedan (next/font), no hay scripts ni
// recursos externos, así que la política puede ser estricta. En desarrollo se permite
// 'unsafe-eval' y websockets para que funcione el hot-reload de Next.
// AL INTEGRAR ADSENSE: agregar a script-src/frame-src/img-src los dominios de Google
// (https://pagead2.googlesyndication.com, https://googleads.g.doubleclick.net, etc.).
// Dominios de Google AdSense (permitidos para que los anuncios carguen cuando se active el ID).
const ADS = "https://pagead2.googlesyndication.com https://partner.googleadservices.com https://*.googlesyndication.com https://adservice.google.com https://*.g.doubleclick.net https://*.doubleclick.net https://*.google.com";

const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} ${ADS}`,
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' data: blob: ${ADS}`,
  "font-src 'self' data:",
  `connect-src 'self' ${ADS}${isDev ? " ws: http://localhost:*" : ""}`,
  `frame-src 'self' ${ADS}`,
  "worker-src 'self'",
  "manifest-src 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(self), geolocation=(), payment=(), browsing-topics=()" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

const nextConfig: NextConfig = {
  serverExternalPackages: ["better-sqlite3"],
  // Next 16 bloquea los recursos de desarrollo desde otras IP (el teléfono via QR):
  // sin esto la página carga pero el JS interactivo (chat/calculadora) no funciona.
  allowedDevOrigins: ["192.168.1.4", "192.168.1.*"],
  // Empaqueta un servidor mínimo autocontenido (.next/standalone) para el deploy:
  // imagen Docker mucho más liviana, no necesita todo node_modules en producción.
  output: "standalone",
  // Cabeceras de seguridad en TODAS las respuestas (anti-XSS, clickjacking, sniffing, etc.).
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  // NOTA: la canonicalización www ↔ no-www se maneja a nivel de Cloudflare/Render,
  // NO en la app. Una redirección de host aquí entraba en bucle con la del proxy
  // ("too many redirects"). La consolidación SEO la dan las etiquetas <link canonical>.
};

export default nextConfig;
