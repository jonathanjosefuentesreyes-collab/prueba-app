// Pantalla de bienvenida (splash) al abrir la app. Es 100% CSS: se muestra ~1,4 s
// y se desvanece sola (no necesita JS, no bloquea la app tras el fade). Estética
// del sistema de diseño del Estado: degradado azul→navy, cinta tricolor, Roboto Slab.
export default function Splash() {
  return (
    <div className="splash" aria-hidden="true">
      <div className="splash-cinta"><span /><span /><span /></div>
      <div className="splash-logo">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.png" alt="" />
      </div>
      <p className="splash-marca">Leyes de Chile</p>
      <p className="splash-sub">Asesoría legal ciudadana · Fuente oficial BCN</p>
      <div className="splash-dots"><span /><span /><span /></div>
    </div>
  );
}
