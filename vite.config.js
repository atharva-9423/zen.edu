import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  plugins: [],
  server: {
    host: '0.0.0.0',
    hmr: true,
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        theme: resolve(__dirname, 'theme/theme.html'),
      },
    },
  },
});
