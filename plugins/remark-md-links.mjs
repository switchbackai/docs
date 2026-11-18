// Rewrites a relative link to a Markdown page, such as DATA-NOTICE.md#the-beta,
// to the route that Starlight serves it at: /data-notice/#the-beta.
//
// The pages are written in switchback/docs/users/, where a relative .md link
// works on GitHub. This runs as a remark plugin, ahead of
// starlight-links-validator, so that the validator checks the rewritten route.
import { visit } from 'unist-util-visit';

const md = /^(?:\.\/)?([^/:#?]+)\.mdx?(#.*)?$/i;

export function remarkMdLinks() {
  return (tree) => {
    visit(tree, ['link', 'definition'], (node) => {
      const m = md.exec(node.url ?? '');
      if (!m) return;
      const slug = m[1].toLowerCase();
      const route = slug === 'index' ? '/' : `/${slug}/`;
      node.url = route + (m[2] ?? '');
    });
  };
}
