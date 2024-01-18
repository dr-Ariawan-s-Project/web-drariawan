/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    exclude: ['date-fns'],
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/__tests__/setup-vitest.ts'],
    coverage: {
      provider: 'v8',
      exclude: [
        'src/utils/apis/axiosWithConfig.ts',
        'src/__mocks__',
        'src/__tests__',
        'src/routes',
        'src/utils/types',
        'src/utils/states',
        'src/components/ui',
        'src/main.tsx',
        'src/components/sidebar/sidebar-item.tsx',
        '**/vite-env.d.ts',
        '**/{postcss,tailwind}.config.*',
        '**/.eslintrc.cjs',
        '**/types.ts',
      ],
    },
  },
});
