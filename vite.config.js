import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
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