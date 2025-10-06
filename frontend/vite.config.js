import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      // This option ensures that the service worker updates automatically
      // for users when a new version of your app is deployed.
      registerType: 'autoUpdate',
      
      // The 'manifest' object is used to generate the manifest.webmanifest file.
      // This file provides metadata about your app for the "install" prompt.
      manifest: {
        name: 'Learnex Project Hub',
        short_name: 'Learnex',
        description: 'The Learnex educational application.',
        theme_color: '#1a1a1a',
        background_color: '#1a1a1a',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            // A maskable icon ensures your icon looks great on all Android devices.
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
    }),
  ],
});
