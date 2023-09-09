import {apiSlice} from "./apiSlice";
import {apiMethods} from "../../constants";

const baseUrl = () => {
  return "/api/v1/room-type"
}

const roomTypeApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getRoomTypeList: builder.mutation({
      query: () => ({
        url: baseUrl() + "/all",
        method: apiMethods.get
      })
    }),
    getRoomTypeNameList: builder.mutation({
      query: () => ({
        url: baseUrl() + "/all/names",
        method: apiMethods.get
      })
    }),
    getRoomTypeEquipment: builder.mutation({
      query: id => ({
        url: baseUrl() + "/id/" + id + "/equipment",
        method: apiMethods.get
      })
    })
  })
})

export const {
  useGetRoomTypeListMutation,
  useGetRoomTypeNameListMutation,
  useGetRoomTypeEquipmentMutation
} = roomTypeApiSlice