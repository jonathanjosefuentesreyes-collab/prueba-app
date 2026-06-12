import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/BottomNav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ley Chilena — Todas las leyes de Chile, explicadas simple",
  description:
    "Consulta gratis las leyes chilenas actualizadas desde la fuente oficial (BCN), calcula tu finiquito y resuelve tus dudas legales con AbogaBot.",
};

export const viewport: Viewport = {
  themeColor: "#0039A6",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={geistSans.variable}>
      <body>
        <div className="shell">{children}</div>
        <BottomNav />
      </body>
    </html>
  );
}
