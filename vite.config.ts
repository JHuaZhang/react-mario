import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig(({ command }) => {
  const base = command === 'serve' ? '/' : '/react-mario/';

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
