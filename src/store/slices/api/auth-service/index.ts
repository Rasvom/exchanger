import api from '@store/slices/api';

interface LoginRequest {
  login: string;
  password: string;
}

interface RegisterRequest extends LoginRequest {
  fullName: string;
  email: string;
}

interface AuthResponse {
  accessToken: string;
}

interface UserProfile {
  id: string;
  email: string;
  fullName: string;
}

const authService = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation<UserProfile, RegisterRequest>({
      query: (data) => ({
        url: '/register',
        method: 'POST',
        body: data,
      }),
    }),
    getProfile: builder.query<UserProfile, void>({
      query: () => ({
        url: '/profile',
        method: 'GET',
      }),
    }),
    logout: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: '/logout',
        method: 'POST',
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useGetProfileQuery, useLogoutMutation } =
  authService;
