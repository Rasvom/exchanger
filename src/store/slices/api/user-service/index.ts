import api from '@store/slices/api';

const userService = api.injectEndpoints({
  endpoints: (build) => ({
    getUserProfile: build.query<any, any>({
      query: () => ({
        url: '/user-service/profile',
        keepUnusedDataFor: 3600,
      }),
      providesTags: [{ type: 'Profile' }],
    }),
    updateProfile: build.mutation<any, { fullName: string }>({
      query: (queryArg) => ({
        url: '/user-service/profile',
        method: 'PUT',
        body: queryArg,
      }),
      invalidatesTags: [{ type: 'Profile' }],
    }),
    changePassword: build.mutation<any, { oldPassword: string; newPassword: string }>({
      query: (queryArg) => ({
        url: '/user-service/change-password',
        method: 'POST',
        body: queryArg,
      }),
    }),
    changeEmail: build.mutation<any, { newEmail: string; code: string }>({
      query: (queryArg) => ({
        url: '/user-service/change-email',
        method: 'POST',
        body: queryArg,
      }),
      invalidatesTags: [{ type: 'Profile' }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetUserProfileQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
  useChangeEmailMutation,
} = userService;
