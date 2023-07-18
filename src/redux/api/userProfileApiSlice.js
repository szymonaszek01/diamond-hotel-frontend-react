import {apiSlice} from "./apiSlice";
import {apiMethods} from "../../constants";

const baseUrl = () => {
  return "/api/v1/user-profile"
}

const userProfileApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getUserProfileById: builder.mutation({
      query: get => ({
        url: baseUrl() + "/id/1/details/info",
        method: apiMethods.get
      })
    })
  })
})

export const {
  useGetUserProfileByIdMutation,
} = userProfileApiSlice