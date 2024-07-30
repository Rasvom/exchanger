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
  }),
  overrideExisting: false,
});

export const { useGetUserProfileQuery } = userService;
