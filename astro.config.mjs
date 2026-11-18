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
