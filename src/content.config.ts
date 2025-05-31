import { file } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const projects = defineCollection({
  loader: file("./src/content/projects.json"),
  schema: z.object({
    slug: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
    links: z.array(z.object({
      href: z.string(),
      label: z.string(),
    })),
  }),
});

const experiences = defineCollection({
  loader: file("./src/content/experiences.json"),
  schema: z.object({
    title: z.string(),
    at: z.string(),
    atLink: z.string().url(),
    time: z.string(),
    description: z.array(z.string()),
  }),
})

export const collections = { projects, experiences };
