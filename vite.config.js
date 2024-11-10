import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  env: {
    VITE_API_KEY: import.meta.env.VITE_API_KEY,
  },
})
