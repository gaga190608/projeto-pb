// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const setupFilePath = path.join(__dirname, 'src/test-config/setupTests.js');


const FIWARE_IP = '20.150.218.100'; 


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

  server: {
    proxy: {
      
      "/py": {
        target: "http://localhost:5000", 
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/py/, ""), 
      },
      
      
      "/api/sth": {
        target: `http://${FIWARE_IP}:8666`,
        changeOrigin: true,
        secure: false, 
        rewrite: (p) => p.replace(/^\/api\/sth/, ""), 
      },

      
      "/api/orion": {
        target: `http://${FIWARE_IP}:1026`,
        changeOrigin: true,
        secure: false,
        rewrite: (p) => p.replace(/^\/api\/orion/, ""), 
      },
    },
  },
});