/* import { fileURLToPath, resolve, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  base: '/TS-task2/',
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    target: 'esnext',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
      output: {
        dir: resolve(__dirname, 'dist'),
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        quietDeps: true,
        silenceDeprecations: ['mixed-decls', 'import', 'color-functions', 'global-builtin'],
        verbose: false,
      },
    },
  },
})  */



import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// ---------------------------------------------
// 🚀 最乾淨穩定的 Vite 設定（適用 GitHub Pages）
// ---------------------------------------------
export default defineConfig({
  // 📌 GitHub Pages 專案路徑（你的 repo 名稱）
  base: '/TS-task3/',

  // 📌 Vite Plugins
  plugins: [
    vue(),
    vueDevTools()
  ],

  // 📌 設定 @ 為 src 的快捷路徑
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  // 📌 Build 設定（保持預設即可，不要加 rollupOptions）
  build: {
    target: 'esnext',
  },

  // 📌 SCSS 設定
  css: {
    preprocessorOptions: {
      scss: {
        quietDeps: true,
        silenceDeprecations: [
          'mixed-decls',
          'import',
          'color-functions',
          'global-builtin'
        ],
        verbose: false,
      },
    },
  },
})
