import { useEffect, useState } from 'react';

/* External */
import { useMsal } from '@azure/msal-react';
import { SESSION_KEY } from '@/constants/storage.ts';
import { useAuthStore } from '@/store/auth.store.ts';

/* Project */
const REDIRECT_TIME = 5;

export default function Unauthorized() {
  const [countdown, setCountdown] = useState(REDIRECT_TIME);

  const { error } = useAuthStore();
  const { instance } = useMsal();

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    setTimeout(() => {
      localStorage.removeItem(SESSION_KEY);
      instance.logout();
    }, REDIRECT_TIME * 1000);

    return () => clearInterval(interval);
  }, [instance]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="relative flex flex-col items-center justify-center min-h-screen p-6 overflow-hidden z-1">
        <div className="mx-auto w-full max-w-[242px] text-center sm:max-w-[472px]">
          <h1 className="mb-8 font-bold text-gray-800 text-title-md  xl:text-title-2xl">
            ACCESO DENEGADO 🙁
          </h1>

          <p className="mt-10 mb-6 text-base text-gray-700 sm:text-lg">
            {error || 'No tienes permiso para acceder a esta página.'}
          </p>

          <p className="text-sm text-center text-gray-500">Redirigiendo en {countdown}...</p>
        </div>
        <p className="absolute text-sm text-center text-gray-500 -translate-x-1/2 bottom-6 left-1/2 ">
          Supply Chain
        </p>
      </div>
    </div>
  );
}
