import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

/* Project */
import PrivateRoute from '@/wrappers/PrivateRoute.tsx';
import Loader from '@/components/loader/Loader.tsx';
import ErrorCard from '@/components/error-card/ErrorCard.tsx';
import Unauthorized from '@/components/pages/unauthorized/Unauthorized.tsx';
import NotFound from '@/components/pages/not-found/NotFound.tsx';
import ShellLayout from './components/shell/ShellLayout.tsx';
import { useAuthStore } from './store/auth.store.ts';

type Session = unknown;

type Mf1AppProps = {
  session: Session;
};

/**
 * Dynamically import `mf-containers/App` at runtime only.
 *
 * Using a computed string (`moduleName`) prevents Rollup from statically
 * analysing the specifier during the build, so the build succeeds even when
 * the `mf-containers` remote is not registered (i.e. MF_CONTAINERS_URI is
 * not set).  At runtime the Module-Federation runtime resolves the specifier;
 * if the remote is unavailable the promise rejects and the error boundary /
 * fallback component is shown instead of crashing the shell.
 */
const MF_CONTAINERS_MODULE = 'mf-containers/App';

const Mf1App = React.lazy(
  () =>
    import(/* @vite-ignore */ MF_CONTAINERS_MODULE).catch(() => ({
      default: function MfContainersUnavailable() {
        return (
          <ErrorCard
            title="Módulo no disponible"
            message="El módulo mf-containers no está disponible en este momento. Por favor, inténtelo más tarde."
          />
        );
      },
    })) as Promise<{ default: React.ComponentType<Mf1AppProps> }>,
);

const UsabilityDashboard = React.lazy(
  () => import('usability_metrics_mf/DashboardView') as Promise<{ default: React.ComponentType<{}> }>,
);

function ShellRoutes() {
  const session = useAuthStore((s) => s.session);

  return (
    <ShellLayout>
      <Routes>
        <Route path="/unauthorized" element={<Unauthorized />} />

        <Route element={<PrivateRoute roles={['ADMIN']} />}>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route
            path="/dashboard/*"
            element={
              <React.Suspense fallback={<Loader message={'Cargando microfrontend...'} />}>
                <Mf1App session={session} />
              </React.Suspense>
            }
          />
          <Route
            path="/usability/*"
            element={
              <React.Suspense fallback={<Loader message={'Cargando métricas...'} />}>
                <UsabilityDashboard />
              </React.Suspense>
            }
          />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </ShellLayout>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ShellRoutes />
    </BrowserRouter>
  );
}
