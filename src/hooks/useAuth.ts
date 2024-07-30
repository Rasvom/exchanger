import { useAppDispatch, useAppSelector } from '@store/useReduxHooks';
import { useLoginMutation } from '@store/slices/api/auth-service';
import { setToken, clearToken } from '@store/slices/authorization';

const useAuth = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.token);
  const [loginMutation, { error, isLoading }] = useLoginMutation();

  const login = async (credentials: { login: string; password: string }) => {
    try {
      const response = await loginMutation(credentials).unwrap();
      dispatch(setToken(response.accessToken));
    } catch (error) {
      console.error('Login failed: ', error);
    }
  };

  const logout = () => {
    dispatch(clearToken());
    document.cookie = 'accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  };

  return { token, login, logout, isLoading, error };
};

export default useAuth;
