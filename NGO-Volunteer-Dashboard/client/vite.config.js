import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';


// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:4000', // Your backend URL
        changeOrigin: true,
        secure: false, // Set to true if using HTTPS
      },
    },
  },
  css: {
    postcss: './postcss.config.js', // Ensure Tailwind is processed here
  },
});
