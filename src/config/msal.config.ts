import { type Configuration, LogLevel } from '@azure/msal-browser';

/* Project */
import { AZURE_CLIENT_ID, AZURE_REDIRECT_URI, AZURE_TENANT_ID } from './env.ts';

export const msalConfig: Configuration = {
  auth: {
    clientId: `${AZURE_CLIENT_ID}`,
    authority: `https://login.microsoftonline.com/${AZURE_TENANT_ID}`,
    redirectUri: `${AZURE_REDIRECT_URI}`,
  },
  cache: {
    cacheLocation: 'localStorage',
    cacheRetentionDays: 1,
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
          default:
            return;
        }
      },
    },
  },
};
