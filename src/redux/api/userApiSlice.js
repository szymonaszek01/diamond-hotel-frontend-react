import {apiSlice} from "./apiSlice";
import {apiMethods} from "../../constants";

const baseUrl = () => {
  return "/api/v1/user-profile"
}

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getUserDetails: builder.mutation({
      query: id => ({
        url: baseUrl() + "/id/" + encodeURIComponent(id) + "/details/info",
        method: apiMethods.get
      })
    }),
    updateImage: builder.mutation({
      query: ({formData, email}) => ({
        url: baseUrl() + "/email/" + encodeURIComponent(email) + "/update/image",
        method: apiMethods.put
        ,
        body: formData
      })
    }),
    updateDetails: builder.mutation({
      query: ({details, email}) => ({
        url: baseUrl() + "/email/" + encodeURIComponent(email) + "/update/details",
        method: apiMethods.put,
        body: details
      })
    })
  })
})

export const {
  useGetUserDetailsMutation,
  useUpdateImageMutation,
  useUpdateDetailsMutation
} = userApiSlice