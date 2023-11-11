import { apiSlice } from './apiSlice';
import { apiMethods } from '../../constants';

const baseUrl = () => {
  return '/api/v1/payment';
};

const paymentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPaymentList: builder.mutation({
      query: ({ filters, sort }) => ({
        url: baseUrl() + '/all',
        method: apiMethods.get,
        params: { ...filters, sort },
      }),
    }),
    getPaymentListByUserProfileId: builder.mutation({
      query: ({ userProfileId, filters, sort }) => ({
        url: baseUrl() + '/all/user-profile-id/' + userProfileId,
        method: apiMethods.get,
        params: { ...filters, sort },
      }),
    }),
    getPaymentPdfDocumentById: builder.mutation({
      query: ({ id }) => ({
        url: baseUrl() + '/id/' + id + '/pdf',
        method: apiMethods.get,
      }),
    }),
    countPaymentList: builder.mutation({
      query: () => ({
        url: baseUrl() + '/all/number',
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
  useGetPaymentListMutation,
  useGetPaymentListByUserProfileIdMutation,
  useGetPaymentPdfDocumentByIdMutation,
  useCountPaymentListMutation,
  useCountPaymentListByUserProfileIdMutation,
} = paymentApiSlice;
