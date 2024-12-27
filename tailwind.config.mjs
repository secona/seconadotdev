/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      boxShadow: {
        hard: "0.2rem 0.2rem 0px 0px black",
      }
    },
  },
  plugins: [],
};
