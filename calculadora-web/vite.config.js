/* global process */

import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    base: env.VITE_DEPLOY_PATH || '/web/',
    build: {
      outDir: env.VITE_OUT_DIR || 'dist',
    },
    plugins: [react()],
  }
})
