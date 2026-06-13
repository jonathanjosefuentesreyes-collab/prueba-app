import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["better-sqlite3"],
  // Next 16 bloquea los recursos de desarrollo desde otras IP (el teléfono via QR):
  // sin esto la página carga pero el JS interactivo (chat/calculadora) no funciona.
  allowedDevOrigins: ["192.168.1.4", "192.168.1.*"],
  // Empaqueta un servidor mínimo autocontenido (.next/standalone) para el deploy:
  // imagen Docker mucho más liviana, no necesita todo node_modules en producción.
  output: "standalone",
};

export default nextConfig;
