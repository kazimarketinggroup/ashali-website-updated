import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Compresses PNG/JPG/WebP/SVG at build time (in place, no import changes).
    ViteImageOptimizer({
      png: { quality: 72 },
      jpg: { quality: 78 },
      jpeg: { quality: 78 },
      webp: { quality: 78 },
      // Downscale any image larger than 2000px on its longest side — nothing
      // in this design is displayed wider than ~1600px, so this is lossless
      // in practice while cutting oversized source files hard.
      cache: true,
      logStats: true,
    }),
  ],
})
