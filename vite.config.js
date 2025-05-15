import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: 'src/main.js',
        app: 'src/app.js',
        counter: 'src/counter.js'
      }
    }
  },
  resolve: {
    alias: {
      '@farcaster/frame-sdk': '/node_modules/@farcaster/frame-sdk/dist/index.js'
    }
  }
});
