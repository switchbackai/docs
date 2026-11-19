// The Markdown copy of each page, at its route with .md: /set-up/log-in.md.
// "View as Markdown" and "Copy page" open it, and /llms.txt links to it.
import type { APIRoute, GetStaticPaths } from 'astro';
import { listPages, markdownPath, pageMarkdown } from '../../plugins/pages.mjs';

export const getStaticPaths = (() =>
  listPages().map((page) => ({
    params: { slug: markdownPath(page.route).slice(1, -'.md'.length) },
    props: { page },
  }))) satisfies GetStaticPaths;

export const GET: APIRoute = ({ props, site }) =>
  new Response(pageMarkdown(props.page, site), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
