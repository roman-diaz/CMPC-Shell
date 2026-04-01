import { fileURLToPath, URL } from 'node:url';

import { federation } from '@module-federation/vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  const usabilityMetricsEntry =
    env.USABILITY_METRICS_MF_URI || 'http://localhost:5005/remoteEntry.js';

  const remotes: Record<string, { type: 'module'; name: string; entry: string }> = {};

  if (env.MF_CONTAINERS_URI) {
    remotes['mf-containers'] = {
      type: 'module',
      name: 'mf-containers',
      entry: env.MF_CONTAINERS_URI,
    };
  }

  if (usabilityMetricsEntry) {
    remotes['usability_metrics_mf'] = {
      type: 'module',
      name: 'usability_metrics_mf',
      entry: usabilityMetricsEntry,
    };
  }

  return {
    envDir: '.',

    plugins: [
      react(),
      tailwindcss(),
      federation({
        name: 'appShell',
        dts: false,
        remotes,
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
    define: {
      'import.meta.env.VITE_BYPASS_AUTH': JSON.stringify(env.VITE_BYPASS_AUTH),
      'import.meta.env.VITE_AZURE_CLIENT_ID': JSON.stringify(env.VITE_AZURE_CLIENT_ID),
      'import.meta.env.VITE_AZURE_TENANT_ID': JSON.stringify(env.VITE_AZURE_TENANT_ID),
      'import.meta.env.VITE_AZURE_REDIRECT_URI': JSON.stringify(env.VITE_AZURE_REDIRECT_URI),
    },
    build: { target: 'esnext' },
  };
});
