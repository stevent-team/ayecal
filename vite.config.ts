import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    dts({
      rollupTypes: true,
    }),
  ],
  resolve: {
    alias: {
      ayecal: resolve(__dirname, '/src/index.ts'),
    },
  },
  build: {
    target: 'esnext',
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'ayecal',
    },
  },
})
