import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  base: process.env.NODE_ENV === 'production' ? '/DWDD-2620-Modal/' : '/',
})
