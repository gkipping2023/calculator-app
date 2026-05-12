import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const config = {
  plugins: {
    "@tailwindcss/postcss": {
      // Explicitly set the project root so Turbopack worker processes resolve
      // source file paths correctly on Vercel (process.cwd() is unreliable
      // inside worker pools).
      base: __dirname,
    },
  },
};

export default config;
