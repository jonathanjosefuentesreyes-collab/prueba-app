"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type FontScale = "1" | "1.25" | "1.5";

interface SettingsContextType {
  fontScale: FontScale;
  setFontScale: (scale: FontScale) => void;
  plainLanguage: boolean;
  setPlainLanguage: (active: boolean) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

// Súbela para volver a aplicar los defaults actuales a TODOS (incluidos quienes ya tienen
// una preferencia guardada). v2: Lenguaje Simple queda activado al entrar.
const SETTINGS_VERSION = "2";

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [fontScale, setFontScaleState] = useState<FontScale>("1");
  const [plainLanguage, setPlainLanguageState] = useState<boolean>(true);
  const [cargado, setCargado] = useState(false);

  // Cargar configuraciones iniciales desde localStorage
  useEffect(() => {
    try {
      const fs = localStorage.getItem("leychile_font_scale") as FontScale;
      if (fs === "1" || fs === "1.25" || fs === "1.5") {
        setFontScaleState(fs);
      }
      const ver = localStorage.getItem("leychile_settings_version");
      if (ver !== SETTINGS_VERSION) {
        // Migración única: aplica el default (Lenguaje Simple ACTIVADO) a todos y marca la versión.
        setPlainLanguageState(true);
        localStorage.setItem("leychile_plain_lang", "true");
        localStorage.setItem("leychile_settings_version", SETTINGS_VERSION);
      } else {
        const pl = localStorage.getItem("leychile_plain_lang");
        if (pl !== null) {
          setPlainLanguageState(pl === "true");
        }
      }
    } catch (e) {
      console.error("Error al acceder a localStorage", e);
    }
    setCargado(true);
  }, []);

  const setFontScale = (scale: FontScale) => {
    setFontScaleState(scale);
    try {
      localStorage.setItem("leychile_font_scale", scale);
    } catch {}
  };

  const setPlainLanguage = (active: boolean) => {
    setPlainLanguageState(active);
    try {
      localStorage.setItem("leychile_plain_lang", String(active));
    } catch {}
  };

  return (
    <SettingsContext.Provider value={{ fontScale, setFontScale, plainLanguage, setPlainLanguage }}>
      <div 
        style={{ 
          display: "contents",
          // Definir la variable CSS para que herede en el árbol
          ...({ "--escala-letra": fontScale } as React.CSSProperties) 
        }}
        data-escala-cargada={cargado ? "true" : "false"}
      >
        {children}
      </div>
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings debe ser usado dentro de un SettingsProvider");
  }
  return context;
}
