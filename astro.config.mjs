import { defineConfig } from "astro/config";

import sitemap from "@astrojs/sitemap";
import { toString } from "mdast-util-to-string";
import getReadingTime from "reading-time";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

export function remarkReadingTime() {
  return function (tree, { data }) {
    const textOnPage = toString(tree);
    const readingTime = getReadingTime(textOnPage);
    data.astro.frontmatter.minutesRead = readingTime.text;
  };
}

export default defineConfig({
  site: "https://secona.dev",
  integrations: [sitemap()],
  markdown: {
    shikiConfig: { theme: "github-dark-high-contrast" },
    remarkPlugins: [remarkReadingTime],
    rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: "wrap" }]],
  },
});
