// tailwind.config.js
module.exports = {
  // IMPORTANT: Use 'purge' (not 'content') because you are using
  // the PostCSS 7 compatibility layer, which runs Tailwind v2.x.
  purge: [
    "./src/**/*.{js,jsx,ts,tsx}",
    // Include public/index.html if you use classes there
    "./public/index.html", 
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
