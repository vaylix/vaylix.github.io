import { siteTitle, ogDescription } from './site';

export const siteHead = [
  {
    tag: 'meta',
    attrs: {
      name: 'keywords',
      content:
        'Vaylix, database, Rust database, key value store, framed binary protocol, WAL, snapshot, optional TLS, mTLS, transport compression, audit logging, documentation',
    },
  },
  {
    tag: 'meta',
    attrs: {
      property: 'og:type',
      content: 'website',
    },
  },
  {
    tag: 'meta',
    attrs: {
      property: 'og:title',
      content: siteTitle,
    },
  },
  {
    tag: 'meta',
    attrs: {
      property: 'og:description',
      content: ogDescription,
    },
  },
  {
    tag: 'meta',
    attrs: {
      name: 'twitter:card',
      content: 'summary_large_image',
    },
  },
  {
    tag: 'meta',
    attrs: {
      name: 'theme-color',
      content: '#09090b',
    },
  },
  {
    tag: 'meta',
    attrs: {
      name: 'color-scheme',
      content: 'dark',
    },
  },
  {
    tag: 'link',
    attrs: {
      rel: 'icon',
      href: '/favicon.ico',
      sizes: 'any',
    },
  },
  {
    tag: 'link',
    attrs: {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      href: '/favicon-32x32.png',
    },
  },
  {
    tag: 'link',
    attrs: {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      href: '/favicon-16x16.png',
    },
  },
  {
    tag: 'link',
    attrs: {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      href: '/apple-touch-icon.png',
    },
  },
  {
    tag: 'link',
    attrs: {
      rel: 'manifest',
      href: '/site.webmanifest',
    },
  },
  {
    tag: 'meta',
    attrs: {
      name: 'msapplication-TileColor',
      content: '#09090b',
    },
  },
];
