import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': 'http://localhost:8080'
    }
  },
  build: {
    target: 'esnext', // Target modern browsers for smaller/faster bundles
    cssTarget: 'chrome61', // Optional: further optimize CSS for modern browsers
    minify: 'esbuild',
    sourcemap: false,
  },
})
