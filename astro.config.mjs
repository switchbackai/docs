// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightLinksValidator from 'starlight-links-validator';
import { existsSync } from 'node:fs';
import { remarkMdLinks } from './plugins/remark-md-links.mjs';

const docs = new URL('./src/content/docs/', import.meta.url);

// The sidebar is one group per folder of src/content/docs/, in this order. The
// pages come from switchback/docs/users/, so a group shows only once the
// release has synced its folder. A page sets its place in its group with
// `sidebar.order` in its frontmatter, and Starlight gives each page previous
// and next links in sidebar order.
const groups = [
  { label: 'Get started', directory: 'get-started' },
  { label: 'Set up', directory: 'set-up' },
  { label: 'Use switchbak', directory: 'use-switchbak' },
  { label: 'Reference', directory: 'reference' },
  { label: 'Your data', directory: 'your-data' },
];

// The pages at the root before the guide was split into the folders above
// (EPD-254). Each one shows only while its file is there; delete this list
// once the split has synced.
const rootPages = [
  { label: 'User guide', slug: 'guide', file: 'GUIDE.md' },
  { label: 'Where your data goes', slug: 'data-notice', file: 'DATA-NOTICE.md' },
];

const sidebar = [
  ...groups
    .filter(({ directory }) => existsSync(new URL(directory, docs)))
    .map(({ label, directory }) => ({ label, items: [{ autogenerate: { directory } }] })),
  ...rootPages
    .filter(({ file }) => existsSync(new URL(file, docs)))
    .map(({ label, slug }) => ({ label, slug })),
];

export default defineConfig({
  site: 'https://docs.switchbak.dev',
  markdown: {
    remarkPlugins: [remarkMdLinks],
  },
  integrations: [
    starlight({
      title: 'Switchbak',
      favicon: '/favicon.svg',
      customCss: ['./src/styles/fonts.css', './src/styles/tokens.css', './src/styles/theme.css'],
      components: {
        SiteTitle: './src/components/SiteTitle.astro',
        PageTitle: './src/components/PageTitle.astro',
      },
      expressiveCode: {
        styleOverrides: {
          codeFontFamily: 'var(--font-mono)',
          codeFontSize: '13.5px',
          codeLineHeight: '20px',
          codeBackground: 'var(--surface-sunken)',
          borderColor: 'var(--border-subtle)',
          borderRadius: 'var(--radius-md)',
          uiFontFamily: 'var(--font-sans)',
          frames: {
            editorBackground: 'var(--surface-sunken)',
            editorActiveTabBackground: 'var(--surface-sunken)',
            editorTabBarBackground: 'var(--surface-raised)',
            terminalBackground: 'var(--surface-sunken)',
            terminalTitlebarBackground: 'var(--surface-raised)',
            terminalTitlebarBorderBottomColor: 'var(--border-subtle)',
            frameBoxShadowCssValue: 'none',
            inlineButtonForeground: 'var(--text-muted)',
            inlineButtonBorder: 'var(--border-subtle)',
          },
        },
      },
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/switchbackai' },
      ],
      sidebar,
      plugins: [starlightLinksValidator()],
    }),
  ],
});
