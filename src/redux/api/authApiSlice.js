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
        url: authBaseUrl() + "/confirm/account/confirmation-token/" + encodeURIComponent(token),
        method: apiMethods.get
      }),
    }),
    refreshConfirmationToken: builder.mutation({
      query: token => ({
        url: authBaseUrl() + "/refresh/confirmation-token/" + encodeURIComponent(token),
        method: apiMethods.get
      }),
    }),
    forgotPassword: builder.mutation({
      query: email => ({
        url: authBaseUrl() + "/forgot/password/email/" + encodeURIComponent(email),
        method: apiMethods.get
      }),
    }),
    forgotPasswordNew: builder.mutation({
      query: changePasswordReqDto => ({
        url: authBaseUrl() + "/forgot/password/new",
        method: apiMethods.put,
        body: {...changePasswordReqDto},
      }),
    }),
    updateEmail: builder.mutation({
      query: changeEmailReqDto => ({
        url: authBaseUrl() + "/update/email",
        method: apiMethods.put,
        body: {...changeEmailReqDto},
      }),
    }),
    updatePassword: builder.mutation({
      query: changePasswordReqDto => ({
        url: authBaseUrl() + "/update/password",
        method: apiMethods.put,
        body: {...changePasswordReqDto},
      }),
    })
  })
})

export const {
  useLoginMutation,
  useRegisterMutation,
  useConfirmAccountMutation,
  useRefreshConfirmationTokenMutation,
  useForgotPasswordMutation,
  useForgotPasswordNewMutation,
  useUpdateEmailMutation,
  useUpdatePasswordMutation
} = authApiSlice