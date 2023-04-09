import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
});

// from https://blog.reactprocoder.com/how-to-setup-pwaprogressive-web-app-in-vite-react-app
// to merge with code above later
// import { createPWA } from 'vite-plugin-pwa'

// const pwaPlugin = createPWA({
//   config: require('./pwa.config.js'),
// })

// export default {
//   // Your other Vite config options...
//   plugins: [pwaPlugin],
// }
