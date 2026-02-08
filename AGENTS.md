# Project Overview

This is a personal portfolio website for Vito Secona, a software engineer. It's built with the [Astro](https://astro.build/) framework and styled with Sass. The website has two main parts: a portfolio and a blog.

## Project Structure

The website is structured around several key sections, starting from the homepage (`src/pages/index.astro`):

*   **Hero Section**: Introduces Vito Secona with his name and title.
*   **Introduction Section**: Provides a brief bio and highlights his interests and tech stack. It also includes a link to his CV.
*   **Experiences Section**: Displays a list of his professional and academic experiences, pulled from `src/content/experiences.json`.
*   **Projects Section**: Showcases his personal and open-source projects, pulled from `src/content/projects.json`.
*   **Contact Section**: Contains links to his social media profiles.

The blog (`src/pages/blog/index.astro`) is a separate section of the website. It lists all the blog posts, which are dynamically generated from markdown files located in `src/content/blog/`. Each blog post has its own dedicated page (`src/pages/blog/[slug].astro`), where `[slug]` corresponds to the `slug` defined in the markdown file's frontmatter.

## Content

All the content for the website is stored in the `src/content/` directory. This includes data for the portfolio and the blog posts.

*   `src/content/profile.json`: Personal info including name, email, social links, skills, languages, and interests.
*   `src/content/experiences.json`: A JSON array of work and community experiences with title, organization, duration, and description.
*   `src/content/projects.json`: A JSON array of projects with name, description, tags, and links.
*   `src/content/education.json`: Education history with degree, institution, dates, GPA, and courses.
*   `src/content/certifications.json`: Certifications with title, issuer, date, and description.
*   `src/content/blog/`: Markdown files for blog posts. Frontmatter includes `title`, `publishedAt`, `tags`, `slug`, and `show` (visibility toggle).

Content collections are defined with Zod schemas in `src/content.config.ts` for type safety.

## Development Environment

The project uses [Nix](https://nixos.org/) flakes for reproducible development environments. The `flake.nix` file defines a dev shell with all necessary dependencies:

*   Node.js
*   pnpm (package manager)
*   Typst (for document generation, e.g., CV)

To enter the development environment, run:

```bash
nix develop
```

This ensures all developers have the same versions of tools regardless of their host system.

## Building and Running

The project uses `pnpm` as the package manager. The following scripts are available in `package.json`:

*   **`pnpm dev`**: Starts the development server.
*   **`pnpm build`**: Builds the project for production. This includes type checking with `astro check`.
*   **`pnpm preview`**: Serves the production build locally for preview.
*   **`pnpm astro`**: Provides access to the Astro CLI for other commands.

### Running the Project

1.  Install dependencies: `pnpm install`
2.  Start the development server: `pnpm dev`
3.  Open your browser to `http://localhost:4321`

## CV Generation

The CV is generated using [Typst](https://typst.app/), a modern typesetting system. The source file is `src/secona-cv.typ`, which pulls data from the same JSON content files used by the website:

*   `src/content/profile.json` - Personal info, skills, languages, interests
*   `src/content/experiences.json` - Work experiences
*   `src/content/projects.json` - Open source projects
*   `src/content/education.json` - Education history
*   `src/content/certifications.json` - Certifications

To regenerate the CV after making changes to the content files:

```bash
typst compile src/secona-cv.typ public/secona-cv.pdf
```

The generated PDF is output to `public/secona-cv.pdf` and served statically by the website.

## Development Conventions

*   **Framework**: The project is built with [Astro](https://astro.build/). Components are written as `.astro` files.
*   **Styling**: [Sass](https://sass-lang.com/) is used for styling. Global styles and variables are defined in `src/layouts/BaseLayout.astro` and mixins in `src/styles/_mixins.scss`.
*   **TypeScript**: TypeScript is used for type checking.
*   **Linting/Formatting**: There are no explicit linting or formatting configurations in the `package.json` scripts, but the project uses `@astrojs/check`, which runs `astro check` as part of the build process.

When making structural changes to the project, don't forget to update AGENTS.md.
