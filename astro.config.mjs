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
  .map(({ label, directory, items }) => ({ label, items: items ?? [{ autogenerate: { directory } }] }));

// The old route of each page that moved (EPD-407, EPD-408), to its new route.
const moved = {
  '/get-started/overview/': '/start-here/overview/',
  '/get-started/quickstart/': '/start-here/get-started/',
  '/use-switchbak/the-receipt/': '/guides/receipts/',
  '/set-up/install/': '/guides/cli/set-up/',
  '/set-up/log-in/': '/guides/cli/set-up/',
  '/set-up/agents-and-roots/': '/guides/cli/set-up/',
  '/use-switchbak/read-an-audit/': '/guides/cli/audits/',
  '/use-switchbak/follow-your-audits/': '/guides/cli/audits/',
  '/use-switchbak/erase-a-session/': '/guides/cli/manage/',
  '/set-up/upgrade-and-remove/': '/guides/cli/manage/',
  '/reference/all-commands/': '/guides/cli/commands/',
  '/reference/supported-agents/': '/guides/cli/set-up/',
  '/use-switchbak/members/': '/admin/invite-teammates/',
  '/set-up/connect-github/': '/admin/integrations/github/',
  '/your-data/the-beta/': '/resources/faq/',
  // EPD-413: the CLI guide in four pages.
  '/guides/cli/install/': '/guides/cli/set-up/',
  '/guides/cli/log-in/': '/guides/cli/set-up/',
  '/guides/cli/agents-and-roots/': '/guides/cli/set-up/',
  '/guides/cli/supported-agents/': '/guides/cli/set-up/',
  '/guides/cli/read-an-audit/': '/guides/cli/audits/',
  '/guides/cli/follow-your-audits/': '/guides/cli/audits/',
  '/guides/cli/erase-a-session/': '/guides/cli/manage/',
  '/guides/cli/upgrade-and-remove/': '/guides/cli/manage/',
  '/guides/cli/all-commands/': '/guides/cli/commands/',
};

export default defineConfig({
  site: 'https://docs.switchbak.dev',
  redirects: moved,
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
