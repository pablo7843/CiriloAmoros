import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import node from "@astrojs/node";

export default defineConfig({
  // Cambiar al dominio definitivo cuando se decida .es vs .com
  site: "https://ciriloamoros.es",

  // En Astro 5, "static" soporta rutas serverless con prerender = false
  adapter: node({ mode: "standalone" }),

  integrations: [
    svelte(), // Islas interactivas: formulario, menú móvil, lightbox galería
    sitemap(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
