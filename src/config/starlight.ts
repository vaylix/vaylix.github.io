import { githubHref, siteDescription, siteTitle } from './site';
import { docsSidebar } from './sidebar';
import { siteHead } from './head';

export const starlightConfig = {
  title: siteTitle,
  description: siteDescription,
  favicon: '/favicon.ico',
  logo: {
    light: './src/assets/vaylix-mark.svg',
    dark: './src/assets/vaylix-mark.svg',
    alt: 'Vaylix logo',
  },
  social: [
    {
      icon: 'github',
      label: 'Vaylix on GitHub',
      href: githubHref,
    },
  ],
  customCss: ['./src/styles/global.css'],
  components: {
    ContentPanel: './src/components/starlight/ContentPanel.astro',
    Header: './src/components/starlight/Header.astro',
    MobileMenuFooter: './src/components/starlight/MobileMenuFooter.astro',
    PageTitle: './src/components/starlight/PageTitle.astro',
    ThemeProvider: './src/components/starlight/ThemeProvider.astro',
  },
  sidebar: docsSidebar,
  head: siteHead,
};
