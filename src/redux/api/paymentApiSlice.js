import { apiSlice } from './apiSlice';
import { apiMethods } from '../../constants';

const baseUrl = () => {
  return '/api/v1/payment';
};

const paymentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    chargePayment: builder.mutation({
      query: (body) => ({
        url: baseUrl() + '/charge',
        method: apiMethods.put,
        body: body,
      }),
    }),
    cancelPayment: builder.mutation({
      query: ({ id }) => ({
        url: baseUrl() + '/id/' + id + '/cancel',
        method: apiMethods.put,
      }),
    }),
    getPaymentListByUserProfileId: builder.mutation({
      query: ({ userProfileId, filters }) => ({
        url: baseUrl() + '/all/user-profile-id/' + userProfileId,
        method: apiMethods.get,
        params: filters,
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
  useChargePaymentMutation,
  useCancelPaymentMutation,
  useGetPaymentListByUserProfileIdMutation,
  useCountPaymentListByUserProfileIdMutation,
} = paymentApiSlice;
