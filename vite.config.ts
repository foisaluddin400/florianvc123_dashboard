import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: "10.10.28.176", 
    port: 3004,  
    proxy: {
      '/api': {
        target: 'http://10.10.20.9:9050/api/v1',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
        headers: {
          'bypass-tunnel-reminder': 'true'
        }
      },
      '/socket.io': {
        target: 'http://10.10.20.9:9050/api/v1',
        changeOrigin: true,
        secure: false,
        ws: true,
        headers: {
          'bypass-tunnel-reminder': 'true'
        }
      }
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
