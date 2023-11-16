import { apiSlice } from './apiSlice';
import { apiMethods } from '../../constants';

const baseUrl = () => {
  return '/api/v1/room';
};

const roomApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRoomAvailabilityList: builder.mutation({
      query: ({
        checkIn,
        checkOut,
        rooms,
        adults,
        children,
        roomTypeIdList,
        pricePerHotelNight,
      }) => ({
        url: baseUrl() + '/all/available',
        method: apiMethods.get,
        params: {
          [`check-in`]: checkIn,
          [`check-out`]: checkOut,
          rooms: rooms,
          adults: adults,
          children: children,
          [`room-type-id`]: roomTypeIdList,
          [`price-per-hotel-night`]: pricePerHotelNight,
        },
      }),
    }),
    getRoomSelectedCost: builder.mutation({
      query: ({ checkIn, checkOut, rooms, roomTypeId }) => ({
        url: baseUrl() + '/cost',
        method: apiMethods.get,
        params: {
          [`check-in`]: checkIn,
          [`check-out`]: checkOut,
          rooms: rooms,
          [`room-type-id`]: roomTypeId,
        },
      }),
    }),
    createRoom: builder.mutation({
      query: (body) => ({
        url: baseUrl() + '/create',
        method: apiMethods.post,
        body: body,
      }),
    }),
    getRoomFloorList: builder.mutation({
      query: () => ({
        url: baseUrl() + '/all/floors',
        method: apiMethods.get,
      }),
    }),
    getRoomDetailsListByFloor: builder.mutation({
      query: ({ floor, filters }) => ({
        url: baseUrl() + '/all/floor/' + floor + '/details',
        method: apiMethods.get,
        params: { ...filters },
      }),
    }),
  }),
});

export const {
  useGetRoomAvailabilityListMutation,
  useGetRoomSelectedCostMutation,
  useCreateRoomMutation,
  useGetRoomFloorListMutation,
  useGetRoomDetailsListByFloorMutation,
} = roomApiSlice;
