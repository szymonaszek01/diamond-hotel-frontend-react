import { apiSlice } from './apiSlice';
import { apiMethods } from '../../constants';

const baseUrl = () => {
  return '/api/v1/reserved-room';
};

const reservedRoomApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getReservedRoomList: builder.mutation({
      query: ({ filters, sort }) => ({
        url: baseUrl() + '/all',
        method: apiMethods.get,
        params: { ...filters, sort },
      }),
    }),
    getReservedRoomListByUserProfileId: builder.mutation({
      query: ({ userProfileId, filters, sort }) => ({
        url: baseUrl() + '/all/user-profile-id/' + userProfileId,
        method: apiMethods.get,
        params: { ...filters, sort },
      }),
    }),
    countReservedRoomList: builder.mutation({
      query: () => ({
        url: baseUrl() + '/all/number',
        method: apiMethods.get,
      }),
    }),
    countReservedRoomListByUserProfileId: builder.mutation({
      query: ({ userProfileId }) => ({
        url: baseUrl() + '/all/number/user-profile-id/' + userProfileId,
        method: apiMethods.get,
      }),
    }),
  }),
});

export const {
  useGetReservedRoomListMutation,
  useGetReservedRoomListByUserProfileIdMutation,
  useCountReservedRoomListMutation,
  useCountReservedRoomListByUserProfileIdMutation,
} = reservedRoomApiSlice;
