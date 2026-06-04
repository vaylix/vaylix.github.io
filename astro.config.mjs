import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import starlight from '@astrojs/starlight';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import { siteUrl } from './src/config/site';
import { starlightConfig } from './src/config/starlight';

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  site: siteUrl,
  integrations: [
    react(),
    starlight(starlightConfig),
    mdx({
      optimize: true,
    }),
  ],
});
