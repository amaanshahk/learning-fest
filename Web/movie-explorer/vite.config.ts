import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  base: '/learning-fest/movie-explorer/',
  build: {
    cssMinify: 'esbuild',
  },
})
