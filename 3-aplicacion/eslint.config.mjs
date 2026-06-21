import next from "eslint-config-next";

// Next 16 entrega el config en formato flat (array). Lo extendemos, ignoramos lo no fuente
// y ajustamos algunas reglas nuevas de React 19 que son ADVISORY (no bugs) a "warn", para
// que el CI no se bloquee por patrones válidos (ej. hidratar estado desde localStorage).
const eslintConfig = [
  ...next,
  {
    rules: {
      "react-hooks/set-state-in-effect": "warn",
      "react-hooks/purity": "warn",
    },
  },
  {
    ignores: [".next/**", "node_modules/**", "scripts/**", "src/data/**", "public/**", "*.config.*"],
  },
];

export default eslintConfig;
