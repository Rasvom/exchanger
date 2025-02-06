import { CryptoMethodResponse } from '@store/slices/api/trade-asset-service/types';

export interface ExchangeFormData {
  sendAmount: string;
  receiveAmount: string;
  sendMethod: CryptoMethodResponse | null;
  receiveMethod: CryptoMethodResponse | null;
  termsAgreement: boolean;
  amlKycAgreement: boolean;
}
