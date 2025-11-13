import { file, glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const projects = defineCollection({
  loader: file("./src/content/projects.json"),
  schema: z.object({
    slug: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
    links: z.array(
      z.object({
        href: z.string(),
        label: z.string(),
      })
    ),
  }),
});

const experiences = defineCollection({
  loader: file("./src/content/experiences.json"),
  schema: z.object({
    title: z.string(),
    at: z.string(),
    atLink: z.string().url(),
    time: z.string(),
    show: z.boolean(),
    description: z.array(z.string()),
  }),
});

const blogs = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/blog" }),
  schema: z.object({
    slug: z.string(),
    title: z.string(),
    show: z.boolean(),
    publishedAt: z.string().date(),
    tags: z.array(z.string()),
  }),
});

export const collections = { projects, experiences, blogs };
