// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightLinksValidator from 'starlight-links-validator';
import { remarkMdLinks } from './plugins/remark-md-links.mjs';

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
      sidebar: [
        { label: 'User guide', slug: 'guide' },
        { label: 'Where your data goes', slug: 'data-notice' },
      ],
      plugins: [starlightLinksValidator()],
    }),
  ],
});
