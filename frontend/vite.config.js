import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  // --- ADD THIS SECTION START ---
  server: {
    host: '0.0.0.0', 
    port: 5173,
    watch: {
      usePolling: true, // Use this if hot-reload doesn't work on Windows/Docker
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})

