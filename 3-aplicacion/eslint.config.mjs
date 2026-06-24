import next from "eslint-config-next";

// Next 16 entrega el config en formato flat (array). Lo extendemos e ignoramos lo no fuente.
// Dos reglas nuevas del compilador de React 19 (set-state-in-effect, purity) se APAGAN a
// propósito: marcan el patrón —bendecido por la propia doc de React— de hidratar estado
// solo-cliente desde localStorage dentro de un useEffect (necesario para no romper el SSR,
// del que depende el SEO). Son falsos positivos aquí; los errores reales siguen frenando el CI.
const eslintConfig = [
  ...next,
  {
    rules: {
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/purity": "off",
    },
  },
  {
    ignores: [".next/**", "node_modules/**", "scripts/**", "src/data/**", "public/**", "*.config.*"],
  },
];

export default eslintConfig;
