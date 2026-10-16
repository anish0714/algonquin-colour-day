import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const maintenance = loadEnv(mode, process.cwd(), 'VITE_').VITE_MAINTENANCE === 'true' || process.env.VITE_MAINTENANCE === 'true'

  return {
    plugins: [
      react(),
      // The maintenance page gets a neutral tab title so the trip isn't named anywhere.
      maintenance && {
        name: 'maintenance-title',
        transformIndexHtml: (html) => html.replace(/<title>.*<\/title>/, '<title>Temporarily unavailable</title>'),
      },
    ],
    // GitHub Pages serves the site from /<repo-name>/.
    base: '/algonquin-colour-day/',
  }
})
