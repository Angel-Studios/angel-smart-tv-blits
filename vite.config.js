import { defineConfig } from 'vite'
import blitsVitePlugins from '@lightningjs/blits/vite'
import legacy from '@vitejs/plugin-legacy'

export default defineConfig(({ command, mode, ssrBuild }) => {
  const isProduction = mode === 'production'

  return {
    base: '/', // Set to your base path if you are deploying to a subdirectory (example: /myApp/)
    plugins: [
      ...blitsVitePlugins,
      legacy({
        // Ensure compatibility with Chromium 38
        targets: ['chrome >= 38'],
        modernPolyfills: true,
        additionalLegacyPolyfills: ['whatwg-fetch'],
      }),
    ],
    resolve: {
      mainFields: ['browser', 'module', 'jsnext:main', 'jsnext'],
    },
    server: {
      headers: {
        'Cross-Origin-Opener-Policy': 'same-origin',
        'Cross-Origin-Embedder-Policy': 'require-corp',
      },
      fs: {
        allow: ['..'],
      },
    },
    worker: {
      format: 'es',
    },
    build: {
      target: isProduction ? 'es2019' : 'es2020',
    },
    esbuild: {
      target: isProduction ? 'es2019' : 'es2020',
    },
  }
})
