// @ts-check
import { defineConfig, envField } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  site: process.env.PUBLIC_SITE_URL ?? 'http://localhost:4321',

  // SSR: el contenido vive en Laravel y cambia sin rebuild (SPEC §46).
  // Páginas estáticas (acerca-de, 404, etc.) se marcan `prerender = true` individualmente.
  // sitemap.xml y robots.txt son endpoints propios (src/pages/) que agregan contenido
  // dinámico de la API — @astrojs/sitemap no cubre rutas SSR generadas desde el backend.
  output: 'server',

  integrations: [react()],

  vite: {
    plugins: [tailwindcss()]
  },

  adapter: node({
    mode: 'standalone'
  }),

  env: {
    schema: {
      PUBLIC_API_URL: envField.string({ context: 'client', access: 'public' }),
      PUBLIC_SITE_URL: envField.string({ context: 'client', access: 'public' }),
      // Secreto server-only: nunca debe llegar al bundle del navegador. Solo
      // se importa desde src/lib/api/client.ts (usado en frontmatter .astro
      // y en endpoints server, jamás desde un componente client:*).
      CATOLICO_API_TOKEN: envField.string({ context: 'server', access: 'secret' })
    }
  }
});