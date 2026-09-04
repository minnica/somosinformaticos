import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://somosinformaticos.com",
  output: "static",
  vite: {
    plugins: [tailwindcss()],
  },
});
