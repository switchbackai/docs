// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightLinksValidator from 'starlight-links-validator';
import { existsSync } from 'node:fs';
import { llmsTxt } from './plugins/llms-txt.mjs';
import { remarkMdLinks } from './plugins/remark-md-links.mjs';
import { groups } from './plugins/sidebar.mjs';

const docs = new URL('./src/content/docs/', import.meta.url);

// The sidebar is one group per folder (plugins/sidebar.mjs). A group shows only
// once the release has synced its folder. Starlight gives each page previous
// and next links in sidebar order.
const sidebar = groups
  .filter(({ directory }) => existsSync(new URL(directory, docs)))
  .map(({ label, directory }) => ({ label, items: [{ autogenerate: { directory } }] }));

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
    llmsTxt(),
  ],
});
