import { useEffect, useRef, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

/* External */
import { useMsal } from '@azure/msal-react';
import { InteractionStatus } from '@azure/msal-browser';

/* Project */
import { useAuthStore } from '@/store/auth.store.ts';
import { loginApi } from '@/api/auth.api.ts';
import type { Role } from '@/types/auth.types.ts';
import Loader from '@/components/loader/Loader.tsx';

interface PrivateProps {
  roles?: Role[];
}

const loginRequest = {
  scopes: ['User.Read'],
};

function PrivateRoute(props: PrivateProps) {
  const { roles: allowedRoles } = props;

  const navigate = useNavigate();
  const { instance, inProgress, accounts } = useMsal();

  const authInitiated = useRef(false);
  const [checking, setChecking] = useState(true);
  const { setErrorMessage, login, session } = useAuthStore();

  const toUnauthorized = () => {
    navigate('/unauthorized', { replace: true });
  };

  useEffect(() => {
    // Local bypass logic
    if (import.meta.env.VITE_BYPASS_AUTH === 'true') {
      if (session?.user.email === 'admin@local.test') {
        setChecking(false);
        return;
      }
      const mockSession: any = {
        user: {
          email: 'admin@local.test',
          roles: ['ADMIN'],
          permissions: ['*'],
          id: 'mock-id',
          name: 'Local Admin',
        },
        token: 'mock-token',
      };
      login(mockSession);
      return;
    }

    if (accounts.length > 0) {
      const account = accounts[0];

      instance.setActiveAccount(account);

      if (!account.idToken) {
        console.log('===> Redirecting due to missing login token');
        setErrorMessage('Missing a login token');
        return toUnauthorized();
      }

      setChecking(true);

      loginApi(account.idToken!)
        .then((apiSession) => {
          console.log('Logged in successfully, validating roles...');

          const hasSomeAllowedRole = allowedRoles?.some((item) =>
            apiSession.user.roles.includes(item),
          );

          if (allowedRoles && !hasSomeAllowedRole) {
            return toUnauthorized();
          }

          login(apiSession);
        })
        .catch((error) => {
          console.error(error);
          setErrorMessage('Error occurred while trying to login');
          return toUnauthorized();
        })
        .finally(() => setChecking(false));
    } else {
      if (authInitiated.current || accounts.length > 0 || inProgress !== InteractionStatus.None) {
        console.log('===> Skipping automatic login');
        return;
      }

      authInitiated.current = true;

      instance.loginRedirect(loginRequest).catch((e) => {
        console.error(e);
        authInitiated.current = false;
      });
    }
  }, [accounts, instance, login, inProgress, allowedRoles, session]);

  if (inProgress !== InteractionStatus.None || checking) {
    return <Loader message="Cargando información de usuario..." />;
  }

  return <Outlet />;
}

export default PrivateRoute;
