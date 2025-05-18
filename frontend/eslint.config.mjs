import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const baseConfigFromNext = compat.config({
  extends: ["next/core-web-vitals"], 
})[0];

export default [
  {
    files: ["**/*.{js,jsx,ts,tsx}"], 
    ignores: ["node_modules", ".next", "dist", "out"], 

    ...baseConfigFromNext,
    
    settings: {
      ...(baseConfigFromNext.settings || {}), 
      react: { 
        version: "detect",
      },
    },
    
    
    rules: {
      ...(baseConfigFromNext.rules || {}), 
      

      indent: ["error", 2],
      semi: ["error", "always"],
      "react/no-unescaped-entities": "off",
      "react/react-in-jsx-scope": "off", 
      "@next/next/no-page-custom-font": "off",
    },
  },
];
