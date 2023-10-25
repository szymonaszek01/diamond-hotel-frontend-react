import { apiSlice } from './apiSlice';
import { apiMethods } from '../../constants';

const baseUrl = () => {
  return '/api/v1/payment';
};

const paymentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPaymentListByUserProfileId: builder.mutation({
      query: ({ userProfileId, filters }) => ({
        url: baseUrl() + '/all/user-profile-id/' + userProfileId,
        method: apiMethods.get,
        params: filters,
      }),
    }),
    getPaymentPdfDocumentById: builder.mutation({
      query: ({ id }) => ({
        url: baseUrl() + '/id/' + id + '/pdf',
        method: apiMethods.get,
      }),
    }),
    countPaymentListByUserProfileId: builder.mutation({
      query: ({ userProfileId }) => ({
        url: baseUrl() + '/all/number/user-profile-id/' + userProfileId,
        method: apiMethods.get,
      }),
    }),
  }),
});

export const {
  useGetPaymentListByUserProfileIdMutation,
  useGetPaymentPdfDocumentByIdMutation,
  useCountPaymentListByUserProfileIdMutation,
} = paymentApiSlice;
