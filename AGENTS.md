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

*   `src/content/experiences.json`: This file contains a JSON array of Vito's work and community experiences. Each object in the array represents an experience and includes details like the title, organization, duration, and a description of the role.
*   `src/content/projects.json`: This file contains a JSON array of Vito's projects. Each object in the array represents a project and includes details like the project name, a description, tags, and links to the project.
*   `src/content/blog/`: This directory contains markdown files for each blog post. The frontmatter of each markdown file includes metadata like the title, publication date, and tags.

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

## Development Conventions

*   **Framework**: The project is built with [Astro](https://astro.build/). Components are written as `.astro` files.
*   **Styling**: [Sass](https://sass-lang.com/) is used for styling. Global styles and variables are defined in `src/layouts/BaseLayout.astro` and mixins in `src/styles/_mixins.scss`.
*   **TypeScript**: TypeScript is used for type checking.
*   **Linting/Formatting**: There are no explicit linting or formatting configurations in the `package.json` scripts, but the project uses `@astrojs/check`, which runs `astro check` as part of the build process.
