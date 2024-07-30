import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { RootState } from '@store/index';

export const getBaseQuery = (baseUrl: string) => {
  return fetchBaseQuery({
    baseUrl,
    prepareHeaders(headers, api) {
      const token = (api.getState() as RootState).auth.token;
      if (!headers.has('Authorization') && token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      if (!headers.has('Content-Type')) {
        headers.set('Content-Type', 'application/json');
      } else if (headers.get('Content-Type')?.includes('none')) {
        headers.delete('Content-Type');
      }
    },
  });
};
