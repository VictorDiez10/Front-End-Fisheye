import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "module",
      globals: globals.browser
    },
    plugins: { js },
    extends: ["js/recommended"],
    rules: {
      // 🔧 Désactive erreurs liées aux imports/exports
      "no-undef": "off",
      "no-unused-vars": "off",
      
      // ✅ Règles simples ajoutées :
      "quotes": ["error", "double"],       // impose les guillemets doubles
    }
  }
]);
