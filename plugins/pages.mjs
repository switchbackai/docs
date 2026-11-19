// The pages of src/content/docs/, read from their source files, for what the
// site serves to an agent: a Markdown copy of each page, /llms-full.txt and the
// page list of /llms.txt. Reading the files, not the content collection, gives
// the build hook of /llms.txt and the endpoints one list in the same order.
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseFrontmatter } from '@astrojs/markdown-remark';
import { groups } from './sidebar.mjs';

// Beside this file in the config; from the project root, where astro runs, when
// the build bundles this module into an endpoint under dist/.
const besideThis = fileURLToPath(new URL('../src/content/docs/', import.meta.url));
export const contentDir = existsSync(besideThis)
  ? besideThis
  : path.resolve(process.cwd(), 'src/content/docs') + path.sep;

// The route of a page file, relative to the content folder: its `slug:` when it
// has one, else its path in lower case. index is the route of its folder.
export function routeOf(file) {
  const slug = readPage(file)?.frontmatter.slug;
  const id =
    typeof slug === 'string'
      ? slug.replace(/^\/+|\/+$/g, '')
      : file.replace(/\.mdx?$/i, '').toLowerCase().replace(/(^|\/)index$/, '');
  return id ? `/${id}/` : '/';
}

// The Markdown copy of a route: /set-up/log-in/ is at /set-up/log-in.md.
export const markdownPath = (route) => route.replace(/\/$/, '') + '.md';

function readPage(file) {
  try {
    return parseFrontmatter(readFileSync(path.join(contentDir, file), 'utf8'));
  } catch {
    return null;
  }
}

// Each .md page in sidebar order: by group, then `sidebar.order`, then path.
// The home page (index.mdx) is left out: it is components, not Markdown.
export function listPages() {
  const files = readdirSync(contentDir, { recursive: true })
    .map((f) => f.split(path.sep).join('/'))
    .filter((f) => f.endsWith('.md'));
  const pages = files.map((file) => {
    const { frontmatter, content } = readPage(file);
    const folder = file.includes('/') ? file.slice(0, file.indexOf('/')) : '';
    const group = groups.findIndex((g) => g.directory === folder);
    return {
      file,
      route: routeOf(file),
      title: frontmatter.title,
      description: frontmatter.description,
      agent: frontmatter.agent,
      group: group === -1 ? groups.length : group,
      order: frontmatter.sidebar?.order ?? Infinity,
      body: content.trim(),
    };
  });
  return pages.sort((a, b) => a.group - b.group || a.order - b.order || a.file.localeCompare(b.file));
}

// The Markdown copy of a page: its title, its description, then its body, with
// each relative link to another page made an absolute link to that page's copy.
export function pageMarkdown(page, site) {
  const dir = path.posix.dirname(page.file);
  const body = page.body.replace(/(\]\(|\]:\s*)([^)\s]+)/g, (all, lead, url) => {
    const route = resolveMdLink(dir === '.' ? '' : dir, url);
    if (!route) return all;
    const [routePath, frag = ''] = route.split(/(?=#)/);
    const target = routePath === '/' ? '/' : markdownPath(routePath);
    return lead + new URL(target, site).href + frag;
  });
  return `# ${page.title}\n\n> ${page.description}\n\n${body}\n`;
}

// A relative link to a .md or .mdx file, then an optional #fragment.
const mdLink = /^((?:\.{1,2}\/)*[^/:#?][^:#?]*)(\.mdx?)(#.*)?$/i;

// The route of a relative link to a page, from a page in `dir` (relative to
// the content folder, '' at the root), with its #fragment. null when the link
// is not to a page of the site.
export function resolveMdLink(dir, url) {
  const m = mdLink.exec(url ?? '');
  if (!m) return null;
  const target = path.posix.normalize(path.posix.join(dir, m[1]));
  if (target.startsWith('..')) return null;
  return routeOf(target + m[2]) + (m[3] ?? '');
}
