import api from '@store/slices/api';
import { CryptoMethodResponse, CryptoPricesResponse } from './types';

const tradeAssetsService = api.injectEndpoints({
  endpoints: (builder) => ({
    getCryptoPrices: builder.query<CryptoPricesResponse, any>({
      query: () => ({
        url: '/trade-asset-service/prices',
      }),
    }),
    getTradeAssets: builder.query<CryptoMethodResponse[], any>({
      query: () => ({
        url: '/trade-asset-service/trade-assets',
      }),
    }),
  }),
});

export const { useGetCryptoPricesQuery, useGetTradeAssetsQuery } = tradeAssetsService;
