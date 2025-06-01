import { CryptoMethodResponse } from '../trade-asset-service/types';

export interface CreateRequestPayload {
  sendMethod: CryptoMethodResponse | null;
  sendAccountNumber?: string | null;
  sendAmount: string | null;
  receiveMethod: CryptoMethodResponse | null;
  receiveAccountNumber: string | null;
  receiveAmount: string | null;
  email: string;
  phoneNumber?: string | null;
  recipientName?: string | null;
  telegramLink?: string | null;
}

export interface RequestItem extends CreateRequestPayload {
  _id: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  user?: string;
  manager?: {
    _id: string;
    fullName: string;
    email: string;
  };
  cancelReason?: string;
}

export interface RequestsFilters {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  status?: string;
  dateFrom?: string;
  dateTo?: string;
  amountFrom?: number;
  amountTo?: number;
  search?: string;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface RequestStats {
  [status: string]: {
    count: number;
    totalSendAmount: number;
    totalReceiveAmount: number;
  };
}

export interface PaginatedRequestsResponse {
  requests: RequestItem[];
  pagination: PaginationInfo;
  stats: RequestStats;
  filters: RequestsFilters;
}
