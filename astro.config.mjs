// @ts-check
import { defineConfig } from "astro/config";

import sitemap from "@astrojs/sitemap";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

export default defineConfig({
  site: "https://secona.dev",
  integrations: [sitemap()],
  markdown: {
    shikiConfig: { theme: "catppuccin-mocha" },
    rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: "wrap" }]],
  },
});
