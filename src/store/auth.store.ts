import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/* Project */
import { SESSION_KEY } from '@/constants/storage.ts';
import type { Session } from '../types/auth.types.ts';

type AuthState = {
  session: Session | null;
  login: (session: Session) => void;
  logout: () => void;
  error: string | null;
  setErrorMessage: (message: string) => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      session: null,
      error: null,
      login: (session) => set({ session }),
      logout: () => set({ session: null }),
      setErrorMessage: (message) => set({ error: message }),
    }),
    {
      name: SESSION_KEY,
    },
  ),
);
