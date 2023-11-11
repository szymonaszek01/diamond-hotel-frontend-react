import { apiSlice } from './apiSlice';
import { apiMethods } from '../../constants';

const baseUrl = () => {
  return '/api/v1/reservation';
};

const reservationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createReservation: builder.mutation({
      query: (body) => ({
        url: baseUrl() + '/create',
        method: apiMethods.post,
        body: body,
      }),
    }),
    getReservationById: builder.mutation({
      query: ({ id }) => ({
        url: baseUrl() + '/id/' + id,
        method: apiMethods.get,
      }),
    }),
    getReservationList: builder.mutation({
      query: ({ filters, sort }) => ({
        url: baseUrl() + '/all',
        method: apiMethods.get,
        params: { ...filters, sort },
      }),
    }),
    getReservationListByUserProfileId: builder.mutation({
      query: ({ userProfileId, filters, sort }) => ({
        url: baseUrl() + '/all/user-profile-id/' + userProfileId,
        method: apiMethods.get,
        params: { ...filters, sort },
      }),
    }),
    getReservationPdfDocumentById: builder.mutation({
      query: ({ id }) => ({
        url: baseUrl() + '/id/' + id + '/pdf',
        method: apiMethods.get,
      }),
    }),
    countReservationList: builder.mutation({
      query: () => ({
        url: baseUrl() + '/all/number',
        method: apiMethods.get,
      }),
    }),
    countReservationListByUserProfileId: builder.mutation({
      query: ({ userProfileId }) => ({
        url: baseUrl() + '/all/number/user-profile-id/' + userProfileId,
        method: apiMethods.get,
      }),
    }),
    updateReservationPayment: builder.mutation({
      query: ({ id, paymentToken }) => ({
        url: baseUrl() + '/id/' + id + '/payment-token/' + paymentToken,
        method: apiMethods.put,
      }),
    }),
    deleteReservationById: builder.mutation({
      query: ({ id }) => ({
        url: baseUrl() + '/id/' + id,
        method: apiMethods.delete,
      }),
    }),
  }),
});

export const {
  useCreateReservationMutation,
  useGetReservationByIdMutation,
  useGetReservationListMutation,
  useGetReservationListByUserProfileIdMutation,
  useGetReservationPdfDocumentByIdMutation,
  useCountReservationListMutation,
  useCountReservationListByUserProfileIdMutation,
  useUpdateReservationPaymentMutation,
  useDeleteReservationByIdMutation,
} = reservationApiSlice;
