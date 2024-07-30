import useAuth from '@hooks/useAuth';
import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  children: ReactNode;
}

const AuthGuard = ({ children }: Props) => {
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      return;
    }

    navigate('/');
  }, [token]);

  return !token ? children : null;
};

export default AuthGuard;
