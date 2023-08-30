import {apiSlice} from "./apiSlice";
import {apiMethods} from "../../constants";

const baseUrl = () => {
  return "/api/v1/user-profile"
}

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getUserById: builder.mutation({
      query: id => ({
        url: baseUrl() + "/id/" + encodeURIComponent(id),
        method: apiMethods.get
      })
    }),
    updateUserImage: builder.mutation({
      query: ({formData, email}) => ({
        url: baseUrl() + "/email/" + encodeURIComponent(email) + "/picture",
        method: apiMethods.post
        ,
        body: formData
      })
    }),
    updateUserDetails: builder.mutation({
      query: ({details, email}) => ({
        url: baseUrl() + "/email/" + encodeURIComponent(email) + "/details",
        method: apiMethods.put,
        body: details
      })
    })
  })
})

export const {
  useGetUserByIdMutation,
  useUpdateUserImageMutation,
  useUpdateUserDetailsMutation
} = userApiSlice