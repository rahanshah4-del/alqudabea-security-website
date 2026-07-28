import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';

const projectRoot = resolve(import.meta.dirname);

export default defineConfig({
  plugins: [
    react({
      // Remove devtools in production
      babel: {
        plugins: [],
      },
    }),
    tailwindcss(),
  ],

  resolve: {
    alias: {
      '@': resolve(projectRoot, 'src'),
      '@/components': resolve(projectRoot, 'src/components'),
      '@/pages': resolve(projectRoot, 'src/pages'),
      '@/layouts': resolve(projectRoot, 'src/layouts'),
      '@/hooks': resolve(projectRoot, 'src/hooks'),
      '@/utils': resolve(projectRoot, 'src/utils'),
      '@/services': resolve(projectRoot, 'src/services'),
      '@/firebase': resolve(projectRoot, 'src/firebase'),
      '@/animations': resolve(projectRoot, 'src/animations'),
      '@/styles': resolve(projectRoot, 'src/styles'),
      '@/assets': resolve(projectRoot, 'src/assets'),
      '@/data': resolve(projectRoot, 'src/data'),
      '@/config': resolve(projectRoot, 'src/config'),
    },
  },

  build: {
    target: 'esnext',
    sourcemap: false,
    minify: 'esbuild',
    cssMinify: 'lightningcss',
    // Aggressive chunk size to encourage splitting
    assetsInlineLimit: 4096,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // React core
            if (id.includes('react-dom') || (id.includes('react') && !id.includes('react-router'))) {
              return 'react-core';
            }
            // React Router
            if (id.includes('react-router')) {
              return 'react-router';
            }
            // Animation libraries
            if (id.includes('framer-motion') || id.includes('gsap') || id.includes('lenis')) {
              return 'animation';
            }
            // Firebase
            if (id.includes('firebase')) {
              return 'firebase';
            }
            // Icons — split lucide-react into its own chunk
            if (id.includes('lucide-react')) {
              return 'icons';
            }
            // Everything else
            return 'vendor';
          }
        },
      },
    },
    chunkSizeWarningLimit: 1024,
  },

  server: {
    host: true,
    port: 5181,
    strictPort: true,
    cors: true,
    allowedHosts: true,
    hmr: {
      protocol: 'wss',
    },
  },

  preview: {
    port: 4173,
    open: false,
  },
});
