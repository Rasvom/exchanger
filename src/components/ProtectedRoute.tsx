import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '@store/useReduxHooks';

const ProtectedRoute: React.FC = () => {
  const token = useAppSelector((state) => state.auth.token);

  if (!token) {
    return <Navigate to='/login' />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
