// @ts-check
import { defineConfig } from "astro/config";

import sitemap from "@astrojs/sitemap";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

export default defineConfig({
  site: "https://secona.dev",
  integrations: [sitemap()],
  markdown: {
    shikiConfig: { theme: "github-dark-high-contrast" },
    rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: "wrap" }]],
  },
});
