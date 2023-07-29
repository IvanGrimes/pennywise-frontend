import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      'app': path.resolve(__dirname, './src/app'),
      'entities': path.resolve(__dirname, './src/entities'),
      'features': path.resolve(__dirname, './src/features'),
      'widgets': path.resolve(__dirname, './src/widgets'),
      'pages': path.resolve(__dirname, './src/pages'),
      'generated': path.resolve(__dirname, './src/generated'),
      'shared': path.resolve(__dirname, './src/shared'),
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('@mantine/form') || id.includes('@mantine+notifications') || id.includes('@mantine+dates') || id.includes('react-transition-group') || id.includes('@tabler+icons') || id.includes('dayjs') || id.includes('react-remove-scroll')) {
            return 'ui'
          }
          if (id.includes('@mantine+') || id.includes('emotion') || id.includes('@radix-ui')) {
            return 'ui-core'
          }
          if (id.includes('react-router') || id.includes('@remix-run/router')) {
            return 'router'
          }
          if (id.includes('@reduxjs+toolkit') || id.includes('redux') || id.includes('immer') || id.includes('reselect')) {
            return 'rtk'
          }
          if (id.includes('node_modules')) {
            return 'vendor'
          }

          return 'index'
        }
      }
    }
  },
  plugins: [react(), visualizer({
    template: "treemap", // or sunburst
    open: true,
    gzipSize: true,
    brotliSize: true,
    filename: "analyse.html", // will be saved in project's root
  })],
})
