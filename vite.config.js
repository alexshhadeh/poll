import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/poll',
  plugins: [
    eslint(),
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin'],
      },
    }),
    VitePWA({
      registerType: 'autoUpdate',
      // add this to cache all the
      // static assets in the public folder
      includeAssets: ['**/*'],
      manifest: {
        theme_color: '#6100FF',
        background_color: '#FFFFFF',
        name: 'Poll App',
        short_name: 'poll-app',
        includeAssets: ['**/*.{png}'],
        icons: [
          {
            src: 'poll/pwa-icon-144x144.png',
            sizes: '144x144',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
  optimizeDeps: {
    exclude: ['dom-helpers/addClass', 'dom-helpers/removeClass'],
  },
});
