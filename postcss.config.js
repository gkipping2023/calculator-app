// CommonJS format — required for reliable PostCSS config loading in
// Turbopack/webpack worker pools. __dirname is the project root.
/** @type {import('@tailwindcss/postcss').Config} */
module.exports = {
  plugins: {
    "@tailwindcss/postcss": {
      // Explicitly anchor source scanning to the project root so the
      // Tailwind scanner finds files regardless of the worker's cwd.
      base: __dirname,
    },
  },
};
