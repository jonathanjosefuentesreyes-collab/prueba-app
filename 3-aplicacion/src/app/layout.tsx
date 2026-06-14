import type { Metadata, Viewport } from "next";
import { Roboto, Roboto_Slab } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/BottomNav";
import Splash from "@/components/Splash";
import { SettingsProvider } from "@/contexts/SettingsContext";

// Tipografías del sistema de diseño oficial del Estado de Chile
// (framework.digital.gob.cl): Roboto para el cuerpo (la fuente por defecto de
// Android) y Roboto Slab para los títulos — la firma visual del gobierno.
const roboto = Roboto({
  variable: "--font-app",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});
const robotoSlab = Roboto_Slab({
  variable: "--font-titulo",
  subsets: ["latin"],
  weight: ["500", "700", "800"],
});

export const metadata: Metadata = {
  title: "Ley Chilena — Todas las leyes de Chile, explicadas simple",
  description:
    "Consulta gratis las leyes chilenas actualizadas desde la fuente oficial (BCN), calcula tu finiquito y resuelve tus dudas legales con AbogaBot.",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Ley Chilena",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a4595",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={roboto.variable}>
      <body>
        <Splash />
        <SettingsProvider>
          <div className="shell">{children}</div>
          <BottomNav />
        </SettingsProvider>
      </body>
    </html>
  );
}
