import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import starlight from '@astrojs/starlight';
import tailwindcss from '@tailwindcss/vite';

const site = process.env.PUBLIC_SITE_URL ?? 'https://vaylix.github.io';

export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },
  site,
  integrations: [
    react(),
    starlight({
      title: 'Vaylix Docs',
      description:
        'Documentation for Vaylix, a transport-first Rust key/value database with framed binary transport, optional TLS/mTLS, default-on compression, WAL plus snapshot durability, audit logging, and single-node atomic transactions.',
      favicon: '/favicon.ico',
      logo: {
        light: './src/assets/vaylix-mark.svg',
        dark: './src/assets/vaylix-mark.svg',
        alt: 'Vaylix logo'
      },
      social: [
        {
          icon: 'github',
          label: 'Vaylix on GitHub',
          href: 'https://github.com/vaylix/vaylix'
        }
      ],
      customCss: ['./src/styles/global.css'],
      components: {
        ContentPanel: './src/components/starlight/ContentPanel.astro',
        Header: './src/components/starlight/Header.astro',
        MobileMenuFooter: './src/components/starlight/MobileMenuFooter.astro',
        PageTitle: './src/components/starlight/PageTitle.astro',
        ThemeProvider: './src/components/starlight/ThemeProvider.astro'
      },
      sidebar: [
        {
          label: 'Introduction',
          items: [
            { label: 'Overview', slug: 'overview' },
            { label: 'Why Vaylix', slug: 'why-vaylix' },
            { label: 'Project Context', slug: 'reference/project-context' }
          ]
        },
        {
          label: 'Getting Started',
          items: [
            { label: 'Install and Build', slug: 'getting-started/install-and-build' },
            { label: 'Run Server and Client', slug: 'getting-started/run-local' },
            { label: 'Build from Source', slug: 'getting-started/source-build' }
          ]
        },
        {
          label: 'Guides',
          items: [
            { label: 'Client Usage', slug: 'guides/client-usage' },
            { label: 'Server Operations', slug: 'guides/server-operations' },
            { label: 'Transactions', slug: 'guides/transactions' }
          ]
        },
        {
          label: 'Reference',
          items: [
            { label: 'CLI Reference', slug: 'reference/cli-reference' },
            { label: 'Command Reference', slug: 'reference/commands' },
            { label: 'Wire Protocol', slug: 'reference/wire-protocol' },
            { label: 'Persistence and Recovery', slug: 'reference/persistence-and-recovery' },
            { label: 'Security Model', slug: 'reference/security-model' },
            { label: 'Limits and Runtime Guards', slug: 'reference/runtime-guards' }
          ]
        },
        {
          label: 'Architecture',
          items: [
            { label: 'System Design', slug: 'architecture/system-design' },
            { label: 'Roadmap Boundaries', slug: 'architecture/roadmap-boundaries' }
          ]
        }
      ],
      head: [
        {
          tag: 'meta',
          attrs: {
            name: 'keywords',
            content:
              'Vaylix, database, Rust database, key value store, framed binary protocol, WAL, snapshot, optional TLS, mTLS, transport compression, audit logging, documentation'
          }
        },
        {
          tag: 'meta',
          attrs: {
            property: 'og:type',
            content: 'website'
          }
        },
        {
          tag: 'meta',
          attrs: {
            property: 'og:title',
            content: 'Vaylix Docs'
          }
        },
        {
          tag: 'meta',
          attrs: {
            property: 'og:description',
            content:
              'Reference and operational documentation for the Vaylix database project.'
          }
        },
        {
          tag: 'meta',
          attrs: {
            name: 'twitter:card',
            content: 'summary_large_image'
          }
        },
        {
          tag: 'meta',
          attrs: {
            name: 'theme-color',
            content: '#09090b'
          }
        },
        {
          tag: 'meta',
          attrs: {
            name: 'color-scheme',
            content: 'dark'
          }
        },
        {
          tag: 'link',
          attrs: {
            rel: 'icon',
            href: '/favicon.ico',
            sizes: 'any'
          }
        },
        {
          tag: 'link',
          attrs: {
            rel: 'icon',
            type: 'image/png',
            sizes: '32x32',
            href: '/favicon-32x32.png'
          }
        },
        {
          tag: 'link',
          attrs: {
            rel: 'icon',
            type: 'image/png',
            sizes: '16x16',
            href: '/favicon-16x16.png'
          }
        },
        {
          tag: 'link',
          attrs: {
            rel: 'apple-touch-icon',
            sizes: '180x180',
            href: '/apple-touch-icon.png'
          }
        },
        {
          tag: 'link',
          attrs: {
            rel: 'manifest',
            href: '/site.webmanifest'
          }
        },
        {
          tag: 'meta',
          attrs: {
            name: 'msapplication-TileColor',
            content: '#09090b'
          }
        }
      ]
    })
  ]
});
