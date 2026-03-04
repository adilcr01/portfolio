import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [inspectAttr(), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      '/api/github-contributions': {
        target: 'https://github-contributions.vercel.app',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/github-contributions/, '/api/v1'),
      },
    },
  },
});
