import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  env: {
    VITE_API_KEY: process.env.VITE_API_KEY,
  },
})
