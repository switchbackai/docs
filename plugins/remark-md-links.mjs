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
// it, as on GitHub, and goes to the `slug:` of its page when it has one. A link
// that leaves the content folder is not a page of the site and is left as it is.
//
// This runs as a remark plugin, ahead of starlight-links-validator, so that the
// validator checks the rewritten route.
import path from 'node:path';
import { visit } from 'unist-util-visit';
import { contentDir, resolveMdLink } from './pages.mjs';

export function remarkMdLinks() {
  return (tree, file) => {
    // The folder of this page, relative to the content folder ('' at the root).
    const pagePath = file.path ?? file.history?.[0];
    const pageDir = pagePath ? path.relative(contentDir, path.dirname(pagePath)) : '';
    if (pageDir.startsWith('..')) return;

    visit(tree, ['link', 'definition'], (node) => {
      const route = resolveMdLink(pageDir.split(path.sep).join('/'), node.url);
      if (route) node.url = route;
    });
  };
}
