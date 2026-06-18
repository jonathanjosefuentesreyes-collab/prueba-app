import Link from "next/link";
import { guiasDestacadas, categoriasConGuias } from "@/lib/guias";
import type { Metadata } from "next";
import BibliotecaHeader from "@/components/BibliotecaHeader";
import GuiasExplorer from "@/components/GuiasExplorer";
import ChatBar from "@/components/ChatBar";

export const metadata: Metadata = {
  title: "Guías legales para ciudadanos | Ley Chilena",
  description: "Guías prácticas sobre tus derechos en Chile: finiquito, gratificación, vacaciones, arriendo y más. Explicadas simple y con los artículos oficiales.",
};

const PREGUNTAS_GUIA = [
  { pregunta: "🚗 ¿Cuál es la velocidad máxima permitida dentro de la ciudad?", termino: "velocidad urbana" },
  { pregunta: "🍻 ¿Qué límites de alcohol establece la Tolerancia Cero?", termino: "conducción bajo efectos del alcohol" },
  { pregunta: "👶 ¿Hasta qué edad los niños deben viajar en silla protectora?", termino: "silla de seguridad" },
  { pregunta: "⏰ ¿De cuántas horas semanales es mi jornada normal de trabajo?", termino: "jornada ordinaria de trabajo" },
  { pregunta: "🛒 ¿Qué plazo tengo de Garantía por productos con fallas?", termino: "garantía legal" },
  { pregunta: "📦 ¿Puedo arrepentirme y devolver compras hechas por internet?", termino: "derecho de retracto" },
  { pregunta: "🐶 ¿Es obligatorio registrar mi perro o ponerle microchip?", termino: "registro de mascotas" },
  { pregunta: "👨‍👩‍👧 ¿Cómo me ayuda la ley si me deben pensión de alimentos?", termino: "pensión alimenticia" },
];

export default function GuiasIndexPage() {
  const destacadas = guiasDestacadas().map((g) => ({
    slug: g.slug,
    titulo: g.titulo,
    descripcion: g.descripcion,
    fecha: g.fecha,
  }));
  const categorias = categoriasConGuias().map((c) => ({
    clave: c.clave,
    etiqueta: c.etiqueta,
    emoji: c.emoji,
    guias: c.guias.map((g) => ({
      slug: g.slug,
      titulo: g.titulo,
      descripcion: g.descripcion,
      fecha: g.fecha,
    })),
  }));

  return (
    <main style={{ paddingBottom: 230 }}>
      <BibliotecaHeader activeTab="guias" />

      <div style={{ padding: "0 2px 20px" }}>
        <p style={{ fontSize: "calc(13px * var(--escala-letra, 1))", color: "var(--texto-suave)", lineHeight: 1.5, marginBottom: "16px" }}>
          Explicaciones simples de tus derechos, con los artículos oficiales enlazados. ¿Tienes una duda puntual? Pregúntale a AbogaBot en la barra de abajo.
        </p>

        <GuiasExplorer destacadas={destacadas} categorias={categorias} />

        {/* Preguntas directas a la ley (enlazan a la Biblioteca) */}
        <hr style={{ border: 0, borderTop: "1px solid var(--borde)", margin: "26px 0 20px" }} />

        <h2 className="seccion-titulo-compendio" style={{ margin: "0 0 4px 0" }}>
          Preguntas rápidas a la ley
        </h2>
        <p style={{ fontSize: "calc(13px * var(--escala-letra, 1))", color: "var(--texto-suave)", lineHeight: 1.5, marginBottom: "16px" }}>
          Toca una pregunta cotidiana para ir directo a los artículos oficiales correspondientes.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {PREGUNTAS_GUIA.map((item, idx) => (
            <Link
              key={idx}
              href={`/leyes?q=${encodeURIComponent(item.termino)}`}
              style={{
                display: "block",
                textDecoration: "none",
                backgroundColor: "#ffffff",
                border: "1px solid var(--borde)",
                borderRadius: "12px",
                boxShadow: "var(--sombra)",
              }}
            >
              <div style={{ padding: "16px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
                <span style={{ fontSize: "calc(14px * var(--escala-letra, 1))", fontWeight: "600", color: "#1E293B", lineHeight: "1.4", flex: 1 }}>
                  {item.pregunta}
                </span>
                <svg style={{ color: "#0038A8", flexShrink: 0 }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <ChatBar />
    </main>
  );
}
