import { defineConfig } from 'tsup'

export default defineConfig({
  external: [
    'vite',
    /^vitepress/,
  ],
  entry: [
    'src/index.ts',
    'src/theme.ts',
  ],
  dts: true,
  clean: true,
  format: ['cjs', 'esm'],
})
