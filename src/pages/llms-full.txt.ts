// Every page as Markdown in one file, in sidebar order, for an agent that reads
// the whole site at once. /llms.txt links to it.
import type { APIRoute } from 'astro';
import { listPages, pageMarkdown } from '../../plugins/pages.mjs';

export const GET: APIRoute = ({ site }) =>
  new Response(listPages().map((page) => pageMarkdown(page, site)).join('\n---\n\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
