// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const setupFilePath = path.join(__dirname, 'src/test-config/setupTests.js');

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: [setupFilePath],
  },

  // ⬇️ ADICIONE ISSO AQUI ⬇️
  server: {
    proxy: {
      "/py": {
        target: "http://localhost:5000", // onde o app.py está rodando
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/py/, ""), // remove /py antes de mandar p/ Python
      },
    },
  },
});