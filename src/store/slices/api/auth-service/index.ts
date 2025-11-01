import api from '@store/slices/api';
import {
  AuthResponse,
  LoginRequest,
  UserProfile,
  RegisterRequest,
  SendConfirmationCodeRequest,
  VerifyConfirmationCodeRequest,
} from './types';

const authService = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/user-service/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    refreshToken: builder.mutation<{ accessToken: string }, void>({
      query: () => ({
        url: '/user-service/refresh-tokens',
        method: 'GET',
      }),
    }),
    registration: builder.mutation<UserProfile, RegisterRequest>({
      query: (userData) => ({
        url: '/user-service/registration',
        method: 'POST',
        body: userData,
      }),
    }),
    sendConfirmationCode: builder.mutation<void, SendConfirmationCodeRequest>({
      query: (data) => ({
        url: '/user-service/send-confirmation-code',
        method: 'POST',
        body: data,
      }),
    }),
    verifyConfirmationCode: builder.mutation<void, VerifyConfirmationCodeRequest>({
      query: (data) => ({
        url: '/user-service/verify-confirmation-code',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegistrationMutation,
  useSendConfirmationCodeMutation,
  useVerifyConfirmationCodeMutation,
} = authService;
