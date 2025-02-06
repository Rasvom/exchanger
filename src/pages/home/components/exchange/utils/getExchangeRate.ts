import {
  CryptoMethodResponse,
  CryptoPricesResponse,
} from '@store/slices/api/trade-asset-service/types';

export const getExchangeRate = (
  from: CryptoMethodResponse | null,
  to: CryptoMethodResponse | null,
  prices?: CryptoPricesResponse,
): number => {
  if (!from || !to || !prices) return 1;
  const fromRate = prices[from.symbol] || 1;
  const toRate = prices[to.symbol] || 1;
  return fromRate / toRate;
};
