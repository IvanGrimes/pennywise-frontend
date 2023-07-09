import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

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
  plugins: [react({
    babel: {
      plugins: [["effector/babel-plugin", { "addLoc": true }]]
    }
  })],
})
