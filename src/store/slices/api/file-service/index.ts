import api from '@store/slices/api';

export interface VerifiedFile {
  _id: string;
  cardNumber: string;
  isVerified: boolean;
  url: string;
  originalName: string;
  createdAt: string;
  displayCardNumber: string;
}

const fileService = api.injectEndpoints({
  endpoints: (build) => ({
    getFileByCardNumber: build.query<any, any>({
      query: (queryArg) => ({
        url: '/file-service/',
        method: 'GET',
        params: queryArg,
      }),
    }),
    getUserVerifiedFiles: build.query<VerifiedFile[], void>({
      query: () => ({
        url: '/file-service/user/verified',
        method: 'GET',
      }),
      providesTags: [{ type: 'File' }],
    }),
    uploadFile: build.mutation<any, any>({
      query: (queryArg) => {
        const formData = new FormData();
        formData.append('file', queryArg.file);
        formData.append('cardNumber', queryArg.cardNumber);

        return {
          url: '/file-service/upload',
          method: 'POST',
          body: formData,
        };
      },
      invalidatesTags: [{ type: 'Request' }, { type: 'File' }],
    }),
  }),
  overrideExisting: false,
});

export const { useGetFileByCardNumberQuery, useGetUserVerifiedFilesQuery, useUploadFileMutation } =
  fileService;
