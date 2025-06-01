import { CryptoMethodResponse } from '@store/slices/api/trade-asset-service/types';

export interface ExchangeFormData {
  sendAmount: string | null;
  receiveAmount: string | null;
  sendMethod: CryptoMethodResponse | null;
  receiveMethod: CryptoMethodResponse | null;
  termsAgreement: boolean;
  amlKycAgreement: boolean;
  email: string;
  phoneNumber: string;
  recipientName: string;
  telegramLink: string;
  receiveAccountNumber: string | null;
}
