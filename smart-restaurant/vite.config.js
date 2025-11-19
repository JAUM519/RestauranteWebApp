import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

// Config estable para desarrollo local
export default defineConfig({
  server: {
    port: 5174,
    strictPort: true,
    host: true,
    open: true,
  },
  preview: {
    port: 5174,
    strictPort: true,
    host: true,
    open: true,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    minify: false, // Deshabilita la minificación
    cssCodeSplit: false, // Deshabilita la división de código CSS
    terserOptions: {
        compress: false, // Deshabilita la compresión de Terser
        mangle: false, // Deshabilita la optimización de nombres de variables
    },
  },
})
