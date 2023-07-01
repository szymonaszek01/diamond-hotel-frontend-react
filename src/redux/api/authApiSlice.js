import {apiSlice} from "./apiSlice";
import {apiMethods} from "../../constants";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: loginReqDto => ({
        url: "/login",
        method: apiMethods.post,
        body: {...loginReqDto}
      })
    }),
    register: builder.mutation({
      query: registerReqDto => ({
        url: "/register",
        method: apiMethods.post,
        body: {...registerReqDto},
      }),
    })
  })
})

export const {
  userLoginMutation,
  userRegisterMutation
} = authApiSlice