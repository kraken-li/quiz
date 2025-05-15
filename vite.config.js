import { defineConfig } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

// Membangun __dirname agar tersedia di modul ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  // Bagian resolve untuk mengatur alias agar Vite tahu kemana harus merujuk
  resolve: {
    alias: {
      '@farcaster/frame-sdk': path.resolve(__dirname, 'node_modules/@farcaster/frame-sdk/dist/index.js')
    }
  },
  // Konfigurasi build dengan beberapa titik masuk (entry points)
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: 'src/main.js',
        app: 'src/app.js',
        counter: 'src/counter.js'
      }
    }
  }
});