import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import sassDts from 'vite-plugin-sass-dts';

// for sassDts and css check https://www.npmjs.com/package/vite-plugin-sass-dts
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    sassDts({
      enabledMode: ['development', 'production'],
      sourceDir: path.resolve(__dirname, './src'),
      outputDir: path.resolve(__dirname, './dist'),
    }),
  ],
  base: '/test-assignment-react-mitra-soft',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@components': path.resolve(__dirname, './src/components'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@models': path.resolve(__dirname, './src/models'),
      '@router': path.resolve(__dirname, './src/router'),
      '@services': path.resolve(__dirname, './src/services'),
      '@store': path.resolve(__dirname, './src/store'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@types': path.resolve(__dirname, './src/types'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@views': path.resolve(__dirname, './src/views'),
    },
  },
  server: {
    port: 3000,
  },
});
