import {apiSlice} from "./apiSlice";
import {apiMethods} from "../../constants";

const baseUrl = () => {
  return "/api/v1/reservation"
}

const reservationApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    createReservation: builder.mutation({
      query: (body) => ({
        url: baseUrl() + "/create",
        method: apiMethods.post,
        body: body
      })
    }),
    getReservationById: builder.mutation({
      query: ({id}) => ({
        url: baseUrl() + "/id/" + id,
        method: apiMethods.get
      })
    })
  })
})

export const {
  useCreateReservationMutation,
  useGetReservationByIdMutation
} = reservationApiSlice