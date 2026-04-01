import React, { useEffect } from 'react';

/* External */
import { useMsal } from '@azure/msal-react';

/* Project */
import { useAuthStore } from '@/store/auth.store.ts';

export default function ShellLayout({ children }: { children: React.ReactNode }) {
  const { instance, accounts } = useMsal();

  useEffect(() => {
    const handler = () => {
      useAuthStore.getState().logout();
      instance.logout();
    };

    window.addEventListener('auth:logout', handler);
    return () => {
      window.removeEventListener('auth:logout', handler);
    };
  }, [instance, accounts]);

  return (
    <div className="h-dvh w-full bg-[#313131] flex flex-col">
      <main className="flex-1 box-border">{children}</main>
    </div>
  );
}
