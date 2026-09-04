import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  ssr: {
    // Bu paketler CJS/ESM karışık dağıtıldığı için Node'un doğrudan import'unda
    // adlandırılmış export'ları çözülemiyor. SSR build'inde bundle'a dahil et.
    noExternal: ['react-router', 'react-router-dom', 'react-helmet-async', 'lucide-react'],
  },
})
