// postcss.config.js (PostCSS 7 ke liye zyada bharosemand format)
module.exports = {
  plugins: [
    // Plugins ko function call ke roop mein require karna
    require('tailwindcss')('./tailwind.config.js'), 
    require('autoprefixer'),
  ],
}
