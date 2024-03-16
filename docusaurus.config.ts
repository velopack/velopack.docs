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
    locales: ['en', 'zh-CN'],
  },
  themes: [
    ['@easyops-cn/docusaurus-search-local', {
      hashed: true,
      indexBlog: false,
      docsRouteBasePath: '/',
      ignoreFiles: new RegExp(".*reference/.*"),
    }],
  ],
  headTags: [
    // Favicon
    { tagName: 'link', attributes: { rel: 'shortcut icon', href: '/favicon/favicon.ico' } },
    { tagName: 'link', attributes: { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon/apple-touch-icon.png' } },
    { tagName: 'link', attributes: { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon/icon_32.png' } },
    { tagName: 'link', attributes: { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon/icon_16.png' } },
    { tagName: 'link', attributes: { rel: 'manifest', href: '/favicon/site.webmanifest' } },
    { tagName: 'link', attributes: { rel: 'mask-icon', href: '/favicon/safari-pinned-tab.svg', color: '#edd323' } },
    { tagName: 'meta', attributes: { name: 'msapplication-TileColor', content: '#000000' } },
    { tagName: 'meta', attributes: { name: 'theme-color', content: '#ffffff' } },
  ],
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
          editUrl: ({ versionDocsDirPath, docPath, locale }) => {
            let match;
            if ((match = docPath.match(/reference\/.*/)) != null) {
              return null; // reference pages can't be edited
            }
            if (locale != 'en') {
              return 'https://crowdin.com/project/velopack/invite?h=88bec14b5657f004fe5ba325090df5ba2031736';
            }
            return `https://github.com/velopack/velopack.docs/tree/master/${versionDocsDirPath}/${docPath}`;
          },
          showLastUpdateTime: false,
          showLastUpdateAuthor: false,
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
    colorMode: {
      respectPrefersColorScheme: true,
    },
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
          type: 'localeDropdown',
          position: 'right',
          dropdownItemsAfter: [
            {
              href: 'https://crowdin.com/project/velopack/invite?h=88bec14b5657f004fe5ba325090df5ba2031736',
              label: 'Help Translate',
              target: '_blank',
              rel: null,
            },
          ],
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
      additionalLanguages: ['csharp', 'rust', 'cpp', 'batch', 'powershell', 'java', 'toml', 'json'],
      theme: prismThemes.oneLight,
      darkTheme: prismThemes.nightOwl,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
