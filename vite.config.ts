import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

const url = import .meta.url

const repo = url.replace(/.*?\//, "");

// https://vitejs.dev/config/
export default defineConfig({
  base: `/${repo}/`,
  plugins: [react()],
})
