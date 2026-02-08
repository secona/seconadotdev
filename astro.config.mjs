import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import { toString as mdastToString } from "mdast-util-to-string";
import getReadingTime from "reading-time";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";

export function remarkReadingTime() {
  return (tree, { data }) => {
    const textOnPage = mdastToString(tree);
    const readingTime = getReadingTime(textOnPage);
    data.astro.frontmatter.minutesRead = readingTime.text;
  };
}

export default defineConfig({
  site: "https://secona.dev",
  integrations: [sitemap()],
  markdown: {
    shikiConfig: { theme: "github-light" },
    remarkPlugins: [remarkReadingTime],
    rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: "wrap" }]],
  },
});
