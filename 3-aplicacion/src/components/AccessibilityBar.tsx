"use client";

import React from "react";
import { useSettings, type FontScale } from "@/contexts/SettingsContext";

export default function AccessibilityBar() {
  const { fontScale, setFontScale, plainLanguage, setPlainLanguage } = useSettings();

  const scales: FontScale[] = ["1", "1.25", "1.5"];

  function aumentar() {
    const idx = scales.indexOf(fontScale);
    if (idx < scales.length - 1) {
      setFontScale(scales[idx + 1]);
    }
  }

  function disminuir() {
    const idx = scales.indexOf(fontScale);
    if (idx > 0) {
      setFontScale(scales[idx - 1]);
    }
  }

  const porcentaje = {
    "1": "100%",
    "1.25": "125%",
    "1.5": "150%",
  }[fontScale];

  return (
    <div className="barra-accesibilidad">
      <div className="control-grupo">
        <span className="control-label">Tamaño de letra:</span>
        <button 
          type="button"
          onClick={disminuir} 
          disabled={fontScale === "1"} 
          className="btn-letra chico"
          aria-label="Disminuir tamaño de letra"
        >
          A
        </button>
        <span className="control-valor">{porcentaje}</span>
        <button 
          type="button"
          onClick={aumentar} 
          disabled={fontScale === "1.5"} 
          className="btn-letra grande"
          aria-label="Aumentar tamaño de letra"
        >
          A
        </button>
      </div>

      <div className="control-grupo split-right">
        <span className="control-label">Lenguaje Simple</span>
        <label className="toggle-switch">
          <input 
            type="checkbox" 
            checked={plainLanguage} 
            onChange={(e) => setPlainLanguage(e.target.checked)} 
          />
          <span className="slider"></span>
        </label>
      </div>
    </div>
  );
}
