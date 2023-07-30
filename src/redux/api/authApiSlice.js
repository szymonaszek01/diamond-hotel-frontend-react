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
    }),
    confirmAccount: builder.mutation({
      query: token => ({
        url: authBaseUrl() + "/confirm/account/token/" + token,
        method: apiMethods.get
      }),
    }),
    resendConfirmationToken: builder.mutation({
      query: userId => ({
        url: authBaseUrl() + "/resend/confirmation/token/user/" + userId,
        method: apiMethods.get
      }),
    })
  })
})

export const {
  useLoginMutation,
  useRegisterMutation,
  useConfirmAccountMutation,
  useResendConfirmationTokenMutation
} = authApiSlice