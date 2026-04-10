import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        keywordResearch: resolve(__dirname, 'keywordResearch.html'),
        showcase: resolve(__dirname, 'showcase.html'),
        textProviders: resolve(__dirname, 'textProviders.html')
      }
    }
  }
});
