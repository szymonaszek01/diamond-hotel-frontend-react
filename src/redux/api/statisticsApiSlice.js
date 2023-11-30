import { apiSlice } from './apiSlice';
import { apiMethods } from '../../constants';

const baseUrl = () => {
  return '/api/v1/statistics';
};

const statisticsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getYearStatistics: builder.mutation({
      query: () => ({
        url: baseUrl() + '/year',
        method: apiMethods.get,
      }),
    }),
    getMonthStatistics: builder.mutation({
      query: () => ({
        url: baseUrl() + '/month',
        method: apiMethods.get,
      }),
    }),
    getSummaryStatistics: builder.mutation({
      query: ({ year, month }) => ({
        url: baseUrl() + '/summary',
        method: apiMethods.get,
        params: { year, month },
      }),
    }),
    getRoomTypeStatistics: builder.mutation({
      query: ({ year, month }) => ({
        url: baseUrl() + '/room-type',
        method: apiMethods.get,
        params: { year, month },
      }),
    }),
    getUserStatistics: builder.mutation({
      query: ({ year, month }) => ({
        url: baseUrl() + '/user-profile',
        method: apiMethods.get,
        params: { year, month },
      }),
    }),
    getReservationStatistics: builder.mutation({
      query: ({ year, month }) => ({
        url: baseUrl() + '/reservation',
        method: apiMethods.get,
        params: { year, month },
      }),
    }),
    getReservedRoomStatistics: builder.mutation({
      query: ({ year, month }) => ({
        url: baseUrl() + '/reserved-room',
        method: apiMethods.get,
        params: { year, month },
      }),
    }),
    getIncomeStatistics: builder.mutation({
      query: ({ year, month }) => ({
        url: baseUrl() + '/income',
        method: apiMethods.get,
        params: { year, month },
      }),
    }),
  }),
});

export const {
  useGetYearStatisticsMutation,
  useGetMonthStatisticsMutation,
  useGetSummaryStatisticsMutation,
  useGetRoomTypeStatisticsMutation,
  useGetUserStatisticsMutation,
  useGetReservationStatisticsMutation,
  useGetReservedRoomStatisticsMutation,
  useGetIncomeStatisticsMutation,
} = statisticsApiSlice;
