// Completes /llms.txt after the build. The release copies the hand-written
// summary of switchback/docs/users/llms.txt to public/llms.txt. This keeps that
// summary up to its first "## " heading and adds a list of the pages, one
// section for each sidebar group, each line a link to the Markdown copy of a
// page. A new page then needs no line in llms.txt.
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { listPages, markdownPath } from './pages.mjs';
import { groups } from './sidebar.mjs';

export function llmsTxt() {
  let site;
  return {
    name: 'llms-txt',
    hooks: {
      'astro:config:done': ({ config }) => {
        site = config.site;
      },
      'astro:build:done': ({ dir }) => {
        const out = fileURLToPath(new URL('llms.txt', dir));
        const written = existsSync(out) ? readFileSync(out, 'utf8') : '# Switchbak\n';
        const summary = written.split(/^## /m)[0].trimEnd();

        const sections = [];
        for (const page of listPages()) {
          const label = groups[page.group]?.label ?? 'Other pages';
          if (sections.at(-1)?.label !== label) sections.push({ label, lines: [] });
          const url = new URL(markdownPath(page.route), site).href;
          sections.at(-1).lines.push(`- [${page.title}](${url}): ${page.description}`);
        }
        const full = new URL('llms-full.txt', site).href;
        const text = [
          summary,
          ...sections.map((s) => `## ${s.label}\n\n${s.lines.join('\n')}`),
          `## Optional\n\n- [Every page in one file](${full}): the pages above, in this order.`,
        ].join('\n\n');
        writeFileSync(out, text + '\n');
      },
    },
  };
}
