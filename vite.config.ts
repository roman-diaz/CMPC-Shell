import { fileURLToPath, URL } from 'node:url';

import { federation } from '@module-federation/vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '..', '');

  return {
    envDir: '..',

    plugins: [
      react(),
      tailwindcss(),
      federation({
        name: 'appShell',
        dts: false,
        remotes: {
          'mf-containers': {
            type: 'module',
            name: 'mf-containers',
            entry: env.MF_CONTAINERS_URI,
          },
          'usability_metrics_mf': {
            type: 'module',
            name: 'usability_metrics_mf',
            entry: env.USABILITY_METRICS_MF_URI || 'http://localhost:5005/remoteEntry.js',
          },
        },
        shared: {
          react: { singleton: true },
          'react-dom': { singleton: true },
          'react-router': { singleton: true },
          'react-router-dom': { singleton: true },
          '@tanstack/react-query': { singleton: true },
        },
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      port: +env.APP_PORT,
      strictPort: true,
      allowedHosts: ['cmpc-shell-production.up.railway.app', 'localhost'],
    },
    preview: {
      port: +env.APP_PORT,
      strictPort: true,
      allowedHosts: ['cmpc-shell-production.up.railway.app', 'localhost'],
    },
    build: { target: 'esnext' },
  };
});
