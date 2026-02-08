import { file, glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const profile = defineCollection({
  loader: file("./src/content/profile.json"),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    email: z.string().email(),
    linkedin: z.string().url(),
    github: z.string().url(),
    website: z.string().url(),
    skills: z.array(z.string()),
    languages: z.array(z.string()),
    interests: z.array(z.string()),
  }),
});

const projects = defineCollection({
  loader: file("./src/content/projects.json"),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    url: z.string().url(),
    tags: z.array(z.string()),
    show: z.boolean(),
    description: z.array(z.string()),
  }),
});

const experiences = defineCollection({
  loader: file("./src/content/experiences.json"),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    employer: z.string(),
    employerUrl: z.string().url(),
    startDate: z.string(),
    endDate: z.string(),
    show: z.boolean(),
    description: z.array(z.string()),
  }),
});

const education = defineCollection({
  loader: file("./src/content/education.json"),
  schema: z.object({
    id: z.string(),
    degree: z.string(),
    institution: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    gpa: z.string(),
    show: z.boolean(),
    courses: z.array(z.string()),
  }),
});

const certifications = defineCollection({
  loader: file("./src/content/certifications.json"),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    issuer: z.string(),
    date: z.string(),
    show: z.boolean(),
    description: z.string(),
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

export const collections = { profile, projects, experiences, education, certifications, blogs };
