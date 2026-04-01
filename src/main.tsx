import React from 'react';
import ReactDOM from 'react-dom/client';

/* External */
import { QueryClientProvider } from '@tanstack/react-query';
import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';

/* Project */
import { msalConfig } from '@/config/msal.config.ts';
import { queryClient } from './lib/react-query/queryClients.ts';
import App from './App.tsx';
import './index.css';

const msalInstance = new PublicClientApplication(msalConfig);

msalInstance.initialize().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <MsalProvider instance={msalInstance}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </MsalProvider>
    </React.StrictMode>,
  );

  document.getElementById('startup-loader')?.remove();
});
