import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  //add the server when the api lanched  the target lanched first
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8801',
        secure: false,
      },
    },
  },
  plugins: [react()],
})
