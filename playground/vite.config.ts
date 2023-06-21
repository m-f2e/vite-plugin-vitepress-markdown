import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Inspect from 'vite-plugin-inspect'
import { VitePluginVitePressMarkdown } from '../src'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [VitePluginVitePressMarkdown(), vue({
    include: [/\.vue$/, /\.md$/],
  }), Inspect()],
})
