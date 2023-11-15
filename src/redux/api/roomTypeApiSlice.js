import { apiSlice } from './apiSlice';
import { apiMethods } from '../../constants';

const baseUrl = () => {
  return '/api/v1/room-type';
};

const roomTypeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRoomTypeById: builder.mutation({
      query: ({ id }) => ({
        url: baseUrl() + '/id/' + id,
        method: apiMethods.get,
      }),
    }),
    getRoomTypeByName: builder.mutation({
      query: ({ name }) => ({
        url: baseUrl() + '/name/' + encodeURIComponent(name),
        method: apiMethods.get,
      }),
    }),
    getRoomTypeList: builder.mutation({
      query: () => ({
        url: baseUrl() + '/all',
        method: apiMethods.get,
      }),
    }),
    getRoomTypeNameList: builder.mutation({
      query: () => ({
        url: baseUrl() + '/all/names',
        method: apiMethods.get,
      }),
    }),
    getRoomTypeEquipment: builder.mutation({
      query: ({ id }) => ({
        url: baseUrl() + '/id/' + id + '/equipment',
        method: apiMethods.get,
      }),
    }),
    getRoomTypeImageById: builder.mutation({
      query: ({ id }) => ({
        url: baseUrl() + '/id/' + id + '/image',
        method: apiMethods.get,
      }),
    }),
    createRoomTypeImage: builder.mutation({
      query: ({ formData }) => ({
        url: baseUrl() + '/image',
        method: apiMethods.post,
        body: formData,
      }),
    }),
    createRoomType: builder.mutation({
      query: (body) => ({
        url: baseUrl() + '/create',
        method: apiMethods.post,
        body: body,
      }),
    }),
  }),
});

export const {
  useGetRoomTypeByIdMutation,
  useGetRoomTypeByNameMutation,
  useGetRoomTypeListMutation,
  useGetRoomTypeNameListMutation,
  useGetRoomTypeEquipmentMutation,
  useGetRoomTypeImageByIdMutation,
  useCreateRoomTypeImageMutation,
  useCreateRoomTypeMutation,
} = roomTypeApiSlice;
