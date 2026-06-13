import Link from "next/link";
import { guias } from "@/lib/guias";
import type { Metadata } from "next";
import BibliotecaHeader from "@/components/BibliotecaHeader";

export const metadata: Metadata = {
  title: "Guías Legales y Orientación | Ley Chilena",
  description: "Guías ciudadanas y explicaciones simples sobre derechos laborales, familia y más.",
};

const PREGUNTAS_GUIA = [
  { pregunta: "🚗 ¿Cuál es la velocidad máxima permitida dentro de la ciudad?", termino: "velocidad urbana" },
  { pregunta: "🍻 ¿Qué límites de alcohol establece la Tolerancia Cero?", termino: "conducción bajo efectos del alcohol" },
  { pregunta: "👶 ¿Hasta qué edad los niños deben viajar en silla protectora?", termino: "silla de seguridad" },
  { pregunta: "⏰ ¿De cuántas horas semanales es mi jornada normal de trabajo?", termino: "jornada ordinaria de trabajo" },
  { pregunta: "💼 ¿Cómo se me deben pagar las Horas Extras?", termino: "horas extraordinarias" },
  { pregunta: "🏖️ ¿Cuántas vacaciones me corresponden tras un año de trabajo?", termino: "feriado anual" },
  { pregunta: "🛒 ¿Qué plazo tengo de Garantía por productos con fallas?", termino: "garantía legal de 6 meses" },
  { pregunta: "📦 ¿Puedo arrepentirme y devolver compras hechas por internet?", termino: "derecho de retracto" },
  { pregunta: "🐶 ¿Es obligatorio registrar mi perro o ponerle microchip?", termino: "registro de mascotas" },
  { pregunta: "🏢 ¿Me pueden prohibir tener mascotas en mi condominio?", termino: "mascotas permitidas en condominios" },
  { pregunta: "👨‍👩‍👧 ¿Cómo me ayuda la ley si me deben pensión de alimentos?", termino: "papi corazón" },
  { pregunta: "🩺 ¿Tengo derecho a saber los valores antes de atenderme?", termino: "trato digno y respetuoso" }
];

export default function GuiasIndexPage() {
  return (
    <main>
      <BibliotecaHeader activeTab="guias" />

      <div style={{ padding: "0 2px 20px" }}>
        {/* Sección 1: Guía Fácil Ciudadana (Preguntas Rápidas) */}
        <h2 className="seccion-titulo-compendio" style={{ margin: "0 0 4px 0" }}>
          Guía Práctica Ciudadana
        </h2>
        <p style={{ fontSize: "calc(13px * var(--escala-letra, 1))", color: "var(--texto-suave)", lineHeight: 1.5, marginBottom: "16px" }}>
          Toca cualquier pregunta cotidiana para ir de inmediato a los artículos oficiales y explicaciones en lenguaje simple correspondientes.
        </p>

        <div 
          style={{ 
            display: "flex", 
            flexDirection: "column", 
            gap: "10px", 
            marginBottom: "24px" 
          }}
        >
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
                transition: "all 0.15s ease"
              }}
            >
              <div 
                style={{ 
                  padding: "16px", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "space-between",
                  gap: "12px"
                }}
              >
                <span 
                  style={{ 
                    fontSize: "calc(14px * var(--escala-letra, 1))", 
                    fontWeight: "600", 
                    color: "#1E293B",
                    lineHeight: "1.4",
                    flex: 1
                  }}
                >
                  {item.pregunta}
                </span>
                
                <svg 
                  style={{ color: "#0038A8", flexShrink: 0 }} 
                  width="18" 
                  height="18" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        {/* Sección 2: Guías Detalladas (SEO) */}
        <hr style={{ border: 0, borderTop: "1px solid var(--borde)", margin: "24px 0" }} />
        
        <h2 className="seccion-titulo-compendio" style={{ margin: "0 0 4px 0" }}>
          Lecturas Recomendadas
        </h2>
        <p style={{ fontSize: "calc(13px * var(--escala-letra, 1))", color: "var(--texto-suave)", lineHeight: 1.5, marginBottom: "16px" }}>
          Explicaciones detalladas y prácticas sobre tus derechos en Chile redactadas por profesionales.
        </p>

        <div className="lista" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {guias.map((guia) => (
            <article key={guia.slug} className="tarjeta" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <h3 style={{ margin: 0, fontSize: "calc(15.5px * var(--escala-letra, 1))" }}>
                <Link href={`/guias/${guia.slug}`} style={{ color: "var(--azul)", textDecoration: "none", fontWeight: "bold" }}>
                  {guia.titulo}
                </Link>
              </h3>
              <p style={{ margin: 0, fontSize: "calc(13px * var(--escala-letra, 1))" }}>{guia.descripcion}</p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
                <span className="nota" style={{ fontSize: "11.5px" }}>Actualizado: {guia.fecha}</span>
                <Link href={`/guias/${guia.slug}`} className="chip" style={{ background: "var(--azul)", color: "white", padding: "4px 12px", borderRadius: "14px", fontSize: "12px", fontWeight: "bold" }}>
                  Leer guía →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
