import {apiSlice} from "./apiSlice";
import {apiMethods} from "../../constants";

const authBaseUrl = () => {
  return "/api/v1/auth"
}

const authApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: loginReqDto => ({
        url: authBaseUrl() + "/login",
        method: apiMethods.post,
        body: {...loginReqDto}
      })
    }),
    register: builder.mutation({
      query: registerReqDto => ({
        url: authBaseUrl() + "/register",
        method: apiMethods.post,
        body: {...registerReqDto},
      }),
    })
  })
})

export const {
  useLoginMutation,
  useRegisterMutation
} = authApiSlice