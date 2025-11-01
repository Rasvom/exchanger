import { createApi } from '@reduxjs/toolkit/query/react';
import { getBaseQuery } from '@utils/getBaseQuery';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

const api = createApi({
  reducerPath: 'api',
  tagTypes: ['Profile', 'Request', 'File', 'TradeAsset', 'Manager'],
  baseQuery: getBaseQuery(API_URL),
  endpoints: () => ({}),
});

export default api;
