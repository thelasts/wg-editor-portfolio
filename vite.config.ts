import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import ui from '@nuxt/ui/vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    base: env.VITE_BASE_PATH || '/',
    plugins: [
      vue(),
      ui({
        router: false,
        icon: {
          clientBundle: {
            scan: true,
            icons: [
              'i-lucide-code-xml',
              'i-lucide-gamepad-2',
              'i-lucide-globe-2',
              'i-lucide-linkedin',
              'i-lucide-mail',
              'i-lucide-messages-square',
              'i-lucide-pen-line',
              'i-lucide-send',
              'i-simple-icons-instagram',
              'i-simple-icons-whatsapp',
            ],
          },
        },
        experimental: {
          componentDetection: true,
        },
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  }
})
