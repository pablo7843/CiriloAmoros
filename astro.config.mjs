import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import vercel from "@astrojs/vercel";

export default defineConfig({
  // Cambiar al dominio definitivo cuando se decida .es vs .com
  site: "https://ciriloamoros.es",

  adapter: vercel(),

  integrations: [
    svelte(), // Islas interactivas: formulario, menú móvil, lightbox galería
    sitemap(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
