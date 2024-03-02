import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Velopack',
  tagline: 'Dinosaurs are cool',
  favicon: 'favicon/favicon.ico',
  url: 'https://docs.velopack.io/',
  baseUrl: '/',
  organizationName: 'velopack',
  projectName: 'velopack.docs',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'throw',
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  markdown: {
    format: 'detect'
  },
  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/',
          editUrl: 'https://github.com/velopack/velopack.docs/tree/master/',
          showLastUpdateTime: true,
          showLastUpdateAuthor: true,

        },
        blog: {
          showReadingTime: true,
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        gtag: {
          trackingID: 'G-YM5CQ7KMDT',
          anonymizeIP: true,
        }
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'logo/opengraph.png',
    navbar: {
      // title: 'Velopack',
      hideOnScroll: false,
      logo: {
        alt: 'Velopack Logo',
        src: 'logo/velopack-black.svg',
        srcDark: 'logo/velopack-white.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'mainSidebar',
          position: 'left',
          label: 'Guides',
        },
        {
          type: 'docSidebar',
          sidebarId: 'referenceSidebar',
          position: 'left',
          label: 'Reference',
        },
        {
          to: '/blog',
          label: 'Blog',
          position: 'left'
        },
        {
          href: 'https://github.com/velopack/velopack',
          position: 'right',
          className: 'header-icon header-icon-github',
          'aria-label': 'GitHub repository',
        },
        {
          href: 'https://discord.gg/CjrCrNzd3F',
          position: 'right',
          className: 'header-icon header-icon-discord',
          'aria-label': 'Discord invite',
        },
      ],
    },
    docs: {
      sidebar: {
        autoCollapseCategories: true,
      }
    },
    // footer: {
    //   style: 'dark',
    //   links: [
    //     {
    //       title: 'Docs',
    //       items: [
    //         {
    //           label: 'Tutorial',
    //           to: '/docs/intro',
    //         },
    //       ],
    //     },
    //     {
    //       title: 'Community',
    //       items: [
    //         {
    //           label: 'Stack Overflow',
    //           href: 'https://stackoverflow.com/questions/tagged/docusaurus',
    //         },
    //         {
    //           label: 'Discord',
    //           href: 'https://discordapp.com/invite/docusaurus',
    //         },
    //         {
    //           label: 'Twitter',
    //           href: 'https://twitter.com/docusaurus',
    //         },
    //       ],
    //     },
    //     {
    //       title: 'More',
    //       items: [
    //         {
    //           label: 'Blog',
    //           to: '/blog',
    //         },
    //         {
    //           label: 'GitHub',
    //           href: 'https://github.com/facebook/docusaurus',
    //         },
    //       ],
    //     },
    //   ],
    //   copyright: `Copyright © ${new Date().getFullYear()} Velopack Ltd.`,
    // },
    prism: {
      additionalLanguages: ['csharp', 'rust', 'cpp', 'batch', 'powershell', 'java', 'toml'],
      theme: prismThemes.oneLight,
      darkTheme: prismThemes.nightOwl,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
