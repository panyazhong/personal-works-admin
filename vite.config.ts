import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // 使用 @ 替换src目录
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/back': {
        target: 'http://www.nanfang-art.com',
        changeOrigin: true,
      },
    },
  },
});
