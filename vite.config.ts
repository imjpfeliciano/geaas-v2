/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import eslint from 'vite-plugin-eslint';

const excludedFilesPath = [
  "src/App.test.tsx",
];

const filesPathToExclude = excludedFilesPath.map((path) => {
  return fileURLToPath(new URL(path, import.meta.url));
});


export default defineConfig({
  // depending on your application, base can also be "/"
  base: '/geaas-v2/',
  plugins: [react(), viteTsconfigPaths(), eslint()],
  server: {
    // this ensures that the browser opens upon server start
    open: true,
    // this sets a default port to 3000
    port: 3000,
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./test/vitest.setup.ts",
    deps: {
      inline: ["vitest-canvas-mock"],
      optimizer: {
        web: {
          include: ["vitest-canvas-mock"],
        }
      }
    },poolOptions: {
      threads: {
        singleThread: true,
      }
    },
    coverage: {
      provider: "v8",
    }
  },
  build: {
    manifest: true,
    rollupOptions: {
      external: [
        ...filesPathToExclude,
      ]
    }
  }
});
