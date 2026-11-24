import { importCssSheet } from '@sl-design-system/rolldown-plugin-css-sheet';
import { defineConfig } from 'vite';

export default defineConfig({
  // Capacitor serves the app from the root of its own origin
  // (capacitor://localhost on iOS, https://localhost on Android).
  base: '/',
  plugins: [importCssSheet()],
  server: {
    port: 8010,
    strictPort: true,
  },
  preview: {
    port: 8010,
    strictPort: true,
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
  },
});
