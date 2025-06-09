import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: 'https://evazquez.me/personal-webapps/pop_it/index.html',
})
