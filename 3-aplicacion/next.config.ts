import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["better-sqlite3"],
  // Next 16 bloquea los recursos de desarrollo desde otras IP (el teléfono via QR):
  // sin esto la página carga pero el JS interactivo (chat/calculadora) no funciona.
  allowedDevOrigins: ["192.168.1.4", "192.168.1.*"],
};

export default nextConfig;
