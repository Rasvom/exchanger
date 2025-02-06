import api from '@store/slices/api';

const fileService = api.injectEndpoints({
  endpoints: (build) => ({
    getFileByCardNumber: build.query<any, any>({
      query: (queryArg) => ({
        url: '/file-service/',
        method: 'GET',
        params: queryArg,
      }),
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
    }),
  }),
  overrideExisting: false,
});

export const { useGetFileByCardNumberQuery, useUploadFileMutation } = fileService;
