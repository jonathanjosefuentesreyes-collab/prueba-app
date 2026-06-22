import type { Metadata, Viewport } from "next";
import { Roboto, Roboto_Slab } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/BottomNav";
import Splash from "@/components/Splash";
import RegistrarSW from "@/components/RegistrarSW";
import AbrirEnInicio from "@/components/AbrirEnInicio";
import ConsentimientoCookies from "@/components/ConsentimientoCookies";
import Anuncios from "@/components/Anuncios";
import Analitica from "@/components/Analitica";
import ConsentMode from "@/components/ConsentMode";
import PieInstitucional from "@/components/PieInstitucional";
import RielEscritorio from "@/components/RielEscritorio";
import { ADSENSE_CLIENT } from "@/lib/adsense";
import { SettingsProvider } from "@/contexts/SettingsContext";
import { ChatProvider } from "@/contexts/ChatContext";

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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://leyesdechile.com"),
  ...(ADSENSE_CLIENT ? { other: { "google-adsense-account": ADSENSE_CLIENT } } : {}),
  title: "Leyes de Chile — actualizadas y explicadas en simple",
  description:
    "Todas las leyes de Chile actualizadas desde la fuente oficial (BCN) y explicadas en simple. Calcula tu finiquito y consulta gratis a AbogaBot.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_CL",
    siteName: "Leyes de Chile",
    url: "/",
    title: "Leyes de Chile — actualizadas y explicadas en simple",
    description:
      "Todas las leyes de Chile actualizadas (fuente oficial BCN) y explicadas en simple. Calcula tu finiquito y resuelve tus dudas con AbogaBot.",
  },
  twitter: {
    card: "summary",
    title: "Leyes de Chile — actualizadas y explicadas en simple",
    description:
      "Todas las leyes de Chile (fuente oficial BCN), calculadora de finiquito y AbogaBot, tu asistente legal gratis.",
  },
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Leyes de Chile",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a4595",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${roboto.variable} ${robotoSlab.variable}`}>
      <body>
        <ConsentMode />
        <Splash />
        <RegistrarSW />
        <AbrirEnInicio />
        <SettingsProvider>
          <ChatProvider>
            <div className="shell">
              {children}
              <PieInstitucional />
            </div>
            <BottomNav />
            <RielEscritorio />
            <ConsentimientoCookies />
          </ChatProvider>
        </SettingsProvider>
        <Anuncios />
        <Analitica />
      </body>
    </html>
  );
}
