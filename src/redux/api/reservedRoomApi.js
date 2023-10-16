import { apiSlice } from './apiSlice';
import { apiMethods } from '../../constants';

const baseUrl = () => {
  return '/api/v1/reserved-room';
};

const reservedRoomApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getReservedRoomListByUserProfileId: builder.mutation({
      query: ({ userProfileId, filters }) => ({
        url: baseUrl() + '/all/user-profile-id/' + userProfileId,
        method: apiMethods.get,
        params: filters,
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
  useGetReservedRoomListByUserProfileIdMutation,
  useCountReservedRoomListByUserProfileIdMutation,
} = reservedRoomApiSlice;
