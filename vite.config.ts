import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

const url = import.meta.url.replace(/.*?\//, "")
// https://vitejs.dev/config/
export default defineConfig({
  base: `/video/`,
  plugins: [react()],
})
