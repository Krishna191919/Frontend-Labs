import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    visualizer({ filename: 'dist/stats.html', gzipSize: true, open: false }),
  ],
  build: {
    sourcemap: true,
    chunkSizeWarningLimit: 250, // kB; fail your own review above this
    rollupOptions: {
      output: {
        // Vite 8 uses Rolldown: object-form manualChunks is invalid here.
        // Equivalent split via Rolldown's codeSplitting groups.
        codeSplitting: {
          groups: [
            {
              name: 'react-vendor',
              test: /node_modules[\\/](react|react-dom|scheduler)[\\/]/,
            },
            {
              name: 'router',
              test: /node_modules[\\/](react-router|react-router-dom)[\\/]/,
            },
            {
              name: 'query',
              test: /node_modules[\\/]@tanstack[\\/]/,
            },
          ],
        },
      },
    },
  },
})
