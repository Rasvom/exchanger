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
      query: (QueryArg) => ({
        url: '/user-service/login',
        method: 'POST',
        credentials: 'include',
        body: QueryArg,
      }),
    }),
    registration: builder.mutation<UserProfile, RegisterRequest>({
      query: (queryArg) => ({
        url: '/user-service/registration',
        method: 'POST',
        body: queryArg,
      }),
    }),
    sendConfirmationCode: builder.mutation<void, SendConfirmationCodeRequest>({
      query: (queryArg) => ({
        url: '/user-service/send-confirmation-code',
        method: 'POST',
        body: queryArg,
      }),
    }),
    verifyConfirmationCode: builder.mutation<void, VerifyConfirmationCodeRequest>({
      query: (queryArg) => ({
        url: '/user-service/verify-confirmation-code',
        method: 'POST',
        body: queryArg,
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
