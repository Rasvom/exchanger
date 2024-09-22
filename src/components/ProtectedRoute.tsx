import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '@store/useReduxHooks';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const token = useAppSelector((state) => state.auth.token);

  if (!token) {
    return <Navigate to='/login' />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
