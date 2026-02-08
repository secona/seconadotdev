# Project Overview

A personal portfolio website for Vito Secona, built with [Astro](https://astro.build/) and styled with Sass. The website has two main parts: a portfolio and a blog.

## Project Structure

### Portfolio (Homepage)

The homepage (`src/pages/index.astro`) contains:

- **Hero Section**: Name and title
- **Introduction Section**: Bio, interests, tech stack, and CV link
- **Experiences Section**: Professional and academic experiences from `src/content/experiences.json`
- **Projects Section**: Personal and open-source projects from `src/content/projects.json`
- **Contact Section**: Social media links

### Blog

The blog (`src/pages/blog/index.astro`) lists posts dynamically generated from markdown files in `src/content/blog/`. Individual posts are rendered at `src/pages/blog/[slug].astro`.

## Content

All content is stored in `src/content/`:

| File | Description |
|------|-------------|
| `profile.json` | Name, email, social links, skills, languages, interests |
| `experiences.json` | Work and community experiences |
| `projects.json` | Projects with name, description, tags, links |
| `education.json` | Education history with degree, institution, GPA, courses |
| `certifications.json` | Certifications with title, issuer, date |
| `blog/*.md` | Blog posts with frontmatter: `title`, `publishedAt`, `tags`, `slug`, `show` |

Content collections are defined with Zod schemas in `src/content.config.ts`.

## Development Environment

The project uses [Nix](https://nixos.org/) flakes for reproducible environments. Enter the dev shell with:

```bash
nix develop
```

This provides:
- Bun (JavaScript runtime and package manager)
- Typst (for CV generation)

## Getting Started

```bash
bun install        # Install dependencies
bun dev            # Start dev server at http://localhost:4321
```

## Building

```bash
bun run build      # Build for production (includes type checking)
bun run preview    # Preview production build locally
```

## CV Generation

The CV (`src/secona-cv.typ`) is built with [Typst](https://typst.app/) and pulls from the same JSON content files. Regenerate with:

```bash
typst compile src/secona-cv.typ public/secona-cv.pdf
```

## Conventions

- **Framework**: Astro with `.astro` components
- **Styling**: Sass with global styles in `src/layouts/BaseLayout.astro` and mixins in `src/styles/_mixins.scss`
- **TypeScript**: Used for type checking
- **Astro Check**: Runs `astro check` as part of the build process
- **Nix Formatting**: Use `nix fmt` to format Nix files. Fix any failures before committing.

When making structural changes to the project, update this file.
