import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA({
    registerType: 'prompt',

    manifest: {
      name: 'vite-pwa',
      short_name: 'vite-pwa',
      description: 'test description',
      theme_color: '#ffffff',
    },

    workbox: {
      globPatterns: [
        '**/*.{js,css,html,ico,png,svg,json,ttf,woff,woff2,jpg,jpeg,gif,webp}',
      ],
      maximumFileSizeToCacheInBytes: 4 * 1024 * 1024,
      skipWaiting: true,
      clientsClaim: true,
      cleanupOutdatedCaches: true,
    },

    devOptions: {
      enabled: false,
      navigateFallback: 'index.html',
      suppressWarnings: true,
      type: 'module',
    },
  })],
})