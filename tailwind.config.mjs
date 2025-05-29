/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      boxShadow: {
        hard: "",
      },
      backgroundImage: {
        dotted: "radial-gradient(black 1px, transparent 0)",
      },
    },
  },
  plugins: [],
};
