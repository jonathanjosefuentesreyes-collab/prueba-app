import Link from "next/link";

// Pie de página institucional (estética tipo gob.cl: cinta tricolor, azul profundo,
// columnas de enlaces, atribución de la fuente oficial). HONESTIDAD: deja claro que es un
// sitio INDEPENDIENTE de orientación ciudadana, no un sitio oficial del Estado.
export default function PieInstitucional() {
  return (
    <footer className="pie">
      <div className="pie-tricolor"><span /><span /><span /></div>
      <div className="pie-cols">
        <div className="pie-marca">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-medallon.png" alt="" />
          <div>
            <strong className="azul-claro">Ley Chilena</strong>
            <p>Las leyes de Chile, explicadas simple.</p>
          </div>
        </div>

        <nav className="pie-col" aria-label="Navegación del pie">
          <span className="pie-tit">Navega</span>
          <Link href="/leyes">Biblioteca de leyes</Link>
          <Link href="/guias">Guías ciudadanas</Link>
          <Link href="/chat">Pregúntale a AbogaBot</Link>
          <Link href="/premium">Premium</Link>
        </nav>

        <nav className="pie-col" aria-label="Información del sitio">
          <span className="pie-tit">Información</span>
          <Link href="/quienes-somos">Quiénes somos</Link>
          <Link href="/estandar-editorial">Estándar editorial</Link>
          <Link href="/privacidad">Privacidad</Link>
          <Link href="/aviso-legal">Aviso legal</Link>
        </nav>

        <div className="pie-col pie-fuente">
          <span className="pie-tit">Fuente</span>
          <p>Textos legales obtenidos de la <strong>Biblioteca del Congreso Nacional (BCN)</strong>.</p>
          <p>Sitio <strong>independiente</strong> de orientación ciudadana: no es un sitio oficial del Estado ni reemplaza la asesoría de un abogado.</p>
        </div>
      </div>
      <div className="pie-base">
        © {new Date().getFullYear()} Ley Chilena · Orientación general, no asesoría legal.
      </div>
    </footer>
  );
}
