import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'

export default defineConfig({
  plugins: [
    react(),
    vanillaExtractPlugin(),
  ],
  test: {
    environment: 'jsdom',
    setupFiles: ['@testing-library/jest-dom'],
    globals: true,
    typecheck: {
      tsconfig: './tsconfig.test.json'
    }
  },
})