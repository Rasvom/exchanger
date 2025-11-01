import { fetchBaseQuery, FetchArgs, BaseQueryApi } from '@reduxjs/toolkit/query';
import { RootState } from '@store/index';
import { setToken, clearToken } from '@store/slices/authorization';

export const getBaseQuery = (url: string) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: url,
    credentials: 'include',
    prepareHeaders(headers, { getState }) {
      const token = (getState() as RootState).auth.token;

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
  });

  return async (
    args: string | FetchArgs,
    api: BaseQueryApi,
    extraOptions: object,
  ): Promise<any> => {
    const result = await baseQuery(args, api, extraOptions);

    if (result.meta?.response?.headers.get('X-Refresh-Tokens') === 'true') {
      const refreshResult = await baseQuery(
        { url: '/user-service/refresh-tokens', method: 'GET' },
        api,
        extraOptions,
      );

      if (refreshResult.data) {
        const { accessToken } = refreshResult.data as { accessToken: string };

        api.dispatch(setToken(accessToken));
        localStorage.setItem('accessToken', accessToken);
      } else {
        console.error('Ошибка при обновлении токенов.');
        api.dispatch(clearToken());
        localStorage.removeItem('accessToken');
      }
    }

    return result;
  };
};
