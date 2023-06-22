import {apiSlice} from "../../app/api/apiSlice";
import {API_METHODS} from "../../constants";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: loginReqDto => ({
        url: "/login",
        method: API_METHODS.post,
        body: {...loginReqDto}
      })
    }),
    register: builder.mutation({
      query: registerReqDto => ({
        url: "/register",
        method: API_METHODS.post,
        body: {...registerReqDto},
      }),
    })
  })
})