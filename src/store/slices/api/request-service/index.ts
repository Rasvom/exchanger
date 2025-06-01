import api from '@store/slices/api';
import {
  CreateRequestPayload,
  RequestItem,
  RequestsFilters,
  PaginatedRequestsResponse,
} from './types';

const requestService = api.injectEndpoints({
  endpoints: (builder) => ({
    createRequest: builder.mutation<RequestItem, CreateRequestPayload>({
      query: (queryArg) => ({
        url: '/requests/create',
        method: 'POST',
        body: queryArg,
      }),
      invalidatesTags: [{ type: 'Request' }],
    }),
    getUserRequests: builder.query<RequestItem[], void>({
      query: () => ({
        url: '/requests/user',
        method: 'GET',
      }),
      providesTags: [{ type: 'Request' }],
    }),
    getUserRequestsPaginated: builder.query<PaginatedRequestsResponse, RequestsFilters>({
      query: (filters) => {
        const params = new URLSearchParams();

        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== '') {
            params.append(key, value.toString());
          }
        });

        return {
          url: `/requests/user/paginated?${params.toString()}`,
          method: 'GET',
        };
      },
      providesTags: [{ type: 'Request' }],
    }),
    getRequestById: builder.query<RequestItem, string>({
      query: (id) => ({
        url: `/requests/${id}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useCreateRequestMutation,
  useGetUserRequestsQuery,
  useGetUserRequestsPaginatedQuery,
  useGetRequestByIdQuery,
} = requestService;
