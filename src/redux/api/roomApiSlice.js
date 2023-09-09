import {apiSlice} from "./apiSlice";
import {apiMethods} from "../../constants";

const baseUrl = () => {
  return "/api/v1/room"
}

const toUrlParamsMapper = ({checkIn, checkOut, rooms, adults, children, roomTypeIdList, pricePerHotelNight}) => {
  return `?check-in=${checkIn}&check-out=${checkOut}&rooms=${rooms}&adults=${adults}&children=${children}` + toAdditionalParamsMapper({
    roomTypeIdList,
    pricePerHotelNight
  })
}

const toAdditionalParamsMapper = ({roomTypeIdList, pricePerHotelNight}) => {
  let result = ``

  if (roomTypeIdList !== null && roomTypeIdList.length > 0) {
    result += `&room-type-id-list=${
      roomTypeIdList.map((roomTypeId, index) => {
        return index !== roomTypeIdList.length - 1 ? `${roomTypeId},` : roomTypeId
      })
    }`
  }

  if (pricePerHotelNight !== null) {
    result += `&price-per-hotel-night=${pricePerHotelNight}`
  }

  return result
}

const roomApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getRoomAvailabilityList: builder.mutation({
      query: ({checkIn, checkOut, rooms, adults, children, roomTypeIdList, pricePerHotelNight}) => ({
        url: baseUrl() + "/all/available" + toUrlParamsMapper({
          checkIn,
          checkOut,
          rooms,
          adults,
          children,
          roomTypeIdList,
          pricePerHotelNight
        }),
        method: apiMethods.get,
        params: {}
      })
    })
  })
})

export const {
  useGetRoomAvailabilityListMutation
} = roomApiSlice