import React from 'react';
import { Navigate } from 'react-router-dom';

type Props = {
  allow: boolean;
  redirectTo: string;
  children: React.ReactNode;
};

export default function GuardRoute({ allow, redirectTo, children }: Props) {
  if (!allow) return <Navigate to={redirectTo} replace />;
  return <>{children}</>;
}
