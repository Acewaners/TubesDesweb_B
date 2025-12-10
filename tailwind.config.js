/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts}"],

  // ❗ MATIKAN RESET CSS (preflight)
  corePlugins: {
    preflight: false,
  },
};
