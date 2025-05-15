import { defineConfig } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

// Menghasilkan __dirname dalam modul ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  base: './', // Menghasilkan path relatif
  optimizeDeps: {
    include: ['@farcaster/frame-sdk']
  },
  resolve: {
    alias: {
      // Mengarahkan impor ke file entry modul yang seharusnya (pastikan file tersebut ada)
      '@farcaster/frame-sdk': path.resolve(__dirname, 'node_modules/@farcaster/frame-sdk/dist/index.js')
    }
  },
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