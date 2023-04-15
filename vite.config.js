import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';
// import { createPWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    eslint(),
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin'],
      },
    }),
  ],
  optimizeDeps: {
    exclude: ['dom-helpers/addClass', 'dom-helpers/removeClass'],
  },
});

// [
//   eslint(),
//   react({
//     jsxImportSource: '@emotion/react',
//     babel: {
//       plugins: ['@emotion/babel-plugin'],
//     },
//   }),
// ],

// VitePWA({
//   registerType: 'autoUpdate',
//   manifest: {
//     icons: [
//       {
//         src: '/icons/pwa-icon-144-144.png',
//         sizes: '144x144',
//         type: 'image/png',
//         purpose: 'any maskable',
//       },
//     ],
//   },
// }),
