import {apiSlice} from "./apiSlice";
import {apiMethods} from "../../constants";

const authBaseUrl = () => {
  return "/api/v1/auth"
}

const authApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    loginAccount: builder.mutation({
      query: body => ({
        url: authBaseUrl() + "/account/login",
        method: apiMethods.post,
        body: {...body}
      })
    }),
    registerAccount: builder.mutation({
      query: body => ({
        url: authBaseUrl() + "/account/registration",
        method: apiMethods.post,
        body: {...body},
      }),
    }),
    confirmAccount: builder.mutation({
      query: token => ({
        url: authBaseUrl() + "/confirmation-token/" + encodeURIComponent(token) + "/account/confirmation",
        method: apiMethods.put
      }),
    }),
    updateConfirmationToken: builder.mutation({
      query: token => ({
        url: authBaseUrl() + "/confirmation-token/" + encodeURIComponent(token),
        method: apiMethods.put
      }),
    }),
    forgotAccountPassword: builder.mutation({
      query: email => ({
        url: authBaseUrl() + "/email/" + encodeURIComponent(email) + "/account/forgotten/password",
        method: apiMethods.get
      }),
    }),
    updateForgottenAccountPassword: builder.mutation({
      query: body => ({
        url: authBaseUrl() + "/account/forgotten/password",
        method: apiMethods.put,
        body: {...body},
      }),
    }),
    updateAccountEmail: builder.mutation({
      query: body => ({
        url: authBaseUrl() + "/account/email",
        method: apiMethods.put,
        body: {...body},
      }),
    }),
    updateAccountPassword: builder.mutation({
      query: body => ({
        url: authBaseUrl() + "/account/password",
        method: apiMethods.put,
        body: {...body},
      }),
    })
  })
})

export const {
  useLoginAccountMutation,
  useRegisterAccountMutation,
  useConfirmAccountMutation,
  useUpdateConfirmationTokenMutation,
  useForgotAccountPasswordMutation,
  useUpdateForgottenAccountPasswordMutation,
  useUpdateAccountEmailMutation,
  useUpdateAccountPasswordMutation
} = authApiSlice