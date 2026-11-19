// Rewrites a relative link to a Markdown page to the route that Starlight
// serves it at:
//
//   DATA-NOTICE.md#the-beta              -> /data-notice/#the-beta
//   set-up/log-in.md (from the root)     -> /set-up/log-in/
//   ../reference/commands.md (from use/) -> /reference/commands/
//   set-up/index.md                      -> /set-up/
//
// The pages are written in switchback/docs/users/, where a relative .md link
// works on GitHub. A link resolves against the folder of the page that holds
// it, as on GitHub. A link that leaves the content folder is not a page of the
// site and is left as it is.
//
// The route lowercases each folder and file name. Name a page with letters,
// digits and hyphens, so that this matches the slug Astro gives it.
//
// This runs as a remark plugin, ahead of starlight-links-validator, so that the
// validator checks the rewritten route.
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { visit } from 'unist-util-visit';

const contentDir = fileURLToPath(new URL('../src/content/docs/', import.meta.url));

// A relative path to a .md or .mdx file, then an optional #fragment.
const mdLink = /^((?:\.{1,2}\/)*[^/:#?][^:#?]*)(\.mdx?)(#.*)?$/i;

export function remarkMdLinks() {
  return (tree, file) => {
    // The folder of this page, relative to the content folder ('' at the root).
    const pagePath = file.path ?? file.history?.[0];
    const pageDir = pagePath ? path.relative(contentDir, path.dirname(pagePath)) : '';
    if (pageDir.startsWith('..')) return;

    visit(tree, ['link', 'definition'], (node) => {
      const m = mdLink.exec(node.url ?? '');
      if (!m) return;
      const target = path.posix.normalize(path.posix.join(pageDir.split(path.sep).join('/'), m[1]));
      if (target.startsWith('..')) return;
      const slug = frontmatterSlug(target + m[2]) ?? target.toLowerCase().replace(/(^|\/)index$/, '');
      node.url = (slug ? `/${slug}/` : '/') + (m[3] ?? '');
    });
  };
}

// A page can keep its route when it moves folder with `slug:` in its
// frontmatter, as DATA-NOTICE.md does at /data-notice/. Starlight serves the
// page there, so a link to the file goes there too.
function frontmatterSlug(file) {
  let text;
  try {
    text = readFileSync(path.join(contentDir, file), 'utf8');
  } catch {
    // No such page: the link stays the route of its path, and the validator
    // reports it.
    return null;
  }
  const front = /^---\r?\n([\s\S]*?)\r?\n---/.exec(text)?.[1] ?? '';
  const m = /^slug:\s*['"]?([^'"\r\n]*?)['"]?\s*$/m.exec(front);
  return m ? m[1].replace(/^\/+|\/+$/g, '') : null;
}
