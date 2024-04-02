import { defineConfig } from 'vite'


export default defineConfig({

    build: {
      rollupOptions: {
        output: {
          entryFileNames: `assets/bf-diagram.js`,
          chunkFileNames: `assets/[name].js`,
          assetFileNames: `assets/[name].[ext]`
        }
      }
    }
  })