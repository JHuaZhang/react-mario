import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig(({ command }) => {
  // 判断是否为开发环境
  const isDev = process.env.NODE_ENV === 'development' || process.env.ENV === 'sitebuild';
  const base = isDev ? '/' : '/react-mario/';

  return {
    plugins: [react()],
    base: base,
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      port: 2345,
      host: '0.0.0.0',
      strictPort: false,
      historyApiFallback: true,
    },
  };
});
