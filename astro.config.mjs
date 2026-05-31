import react from '@astrojs/react';
import starlight from '@astrojs/starlight';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import remarkGfm from 'remark-gfm';
import { siteUrl } from './src/config/site';
import { starlightConfig } from './src/config/starlight';

export default defineConfig({
  markdown: {
    remarkPlugins: [remarkGfm],
  },
  vite: {
    plugins: [tailwindcss()],
  },
  site: siteUrl,
  integrations: [
    react(),
    starlight(starlightConfig),
  ],
});
