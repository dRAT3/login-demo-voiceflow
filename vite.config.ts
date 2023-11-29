import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `[name].[hash].mjs`,
        chunkFileNames: `[name].[hash].mjs`,
      },
    },
  },
  define: {
    'import.meta.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  },
  envPrefix: 'VF_',
  server: {
    port: 3006,
  },
});