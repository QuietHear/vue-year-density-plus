/*
 * @Author: aFei
 * @Date: 2024-03-21 11:35:29
*/
/*
 * @LastEditors: aFei
 * @LastEditTime: 2024-03-21 13:20:21
*/
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import autoImport from "unplugin-auto-import/vite";
import * as path from 'path';

export default defineConfig(({ command, mode }) => ({
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './'),
      '@': path.resolve(__dirname, './src'),
      'asset': path.resolve(__dirname, './src/assets'),
      'view': path.resolve(__dirname, './src/views'),
    }
  },
  server: {
    open: true
  },
  esbuild: {
    drop: ['console', 'debugger']
  },
  build: {
    outDir: 'dist',
    lib: {
      entry: path.resolve(__dirname, "./lib/index.js"),
      name: "vueYearDensityPlus",
      fileName: "vue-year-density-plus",
    },
    rollupOptions: {
      external: ["vue", "vue-router", "element-plus"],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
  },
  plugins: [vue(), autoImport({ imports: ['vue', 'vue-router', { from: 'vue-router', imports: ['createRouter', 'createWebHistory'] }], dts: false })],
  css: {
    preprocessorOptions: {
      scss: {
        javascriptEnabled: true
      }
    }
  }
}));
