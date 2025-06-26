/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite'
// import { fileURLToPath, URL } from 'url' // You might not need these if using path.resolve
import path from 'path' // Keep this for path.resolve, but remember its runtime implications

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // Add any necessary plugins here
  ],
  envDir: './src/', // Ensure this is correct for your environment variables if used
  resolve: {
    alias: {
      // Use path.resolve for consistent absolute paths
      '@': path.resolve(__dirname, 'src/') //fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  test: {
    globals: true,
    environment: 'jsdom', // jsdom is fine for general JS tests, but for Node.js specific code, 'node' environment might be more accurate if you had more complex Node APIs
    exclude: [
      'node_modules'
    ]
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/main.ts'), // Assuming src/main.ts is your main entry point for the library
      name: 'server-side-config',
      fileName: (format) => `server-side-config.${format}.js`,
    },
    rollupOptions: {
      // Crucial: Declare Node.js built-in modules as external
      // Use the 'node:' prefix for clarity and future-proofing, though 'path' and 'fs' often work too.
      external: ['node:path', 'node:fs'],
      output: {
        // You generally don't need 'globals' for Node.js external modules
        // as they are resolved natively by Node.js.
        // Globals are typically for UMD builds where you expose modules globally in a browser.
        globals: {
          // If you were externalizing 'vue' for a browser UMD build, it would look like this:
          // vue: 'Vue',
        },
      },
    },
    // It's also good practice to explicitly set the target for your library build
    // to ensure modern Node.js features are compiled correctly without unnecessary polyfills.
    target: 'esnext', // or 'node18', 'node20' if you want a specific Node.js version target
  },
})
