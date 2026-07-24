import { getCollection } from "astro:content";
import rss from "@astrojs/rss";

import type { APIContext } from "astro";

export async function GET(context: APIContext) {
  const blogs = await getCollection("blogs");
  const sorted = blogs
    .filter((b) => b.data.show)
    .sort(
      (a, b) =>
        new Date(b.data.publishedAt).getTime() -
        new Date(a.data.publishedAt).getTime(),
    );

  return rss({
    title: "Vito Secona's Blog",
    description: "Personal blog about compilers and systems programming",
    site: context.site ?? "https://secona.dev",
    items: sorted.map((blog) => ({
      title: blog.data.title,
      pubDate: new Date(blog.data.publishedAt),
      link: `/blog/${blog.id}`,
      categories: blog.data.tags,
    })),
    customData: `<language>en-us</language>`,
  });
}
