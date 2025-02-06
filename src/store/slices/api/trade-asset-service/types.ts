export interface CryptoMethodResponse {
  name: string;
  symbol: string;
  img: string;
  active: boolean;
  assetType: 'crypto' | 'bank';
}

export interface CryptoPricesResponse {
  [symbol: string]: number;
}
