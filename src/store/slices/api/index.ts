import { createApi } from '@reduxjs/toolkit/query/react';
import { getBaseQuery } from '@utils/getBaseQuery';

const api = createApi({
  reducerPath: 'api',
  tagTypes: ['Profile', 'Request', 'File'],
  baseQuery: getBaseQuery('http://localhost:4000'),
  endpoints: () => ({}),
});

export default api;
