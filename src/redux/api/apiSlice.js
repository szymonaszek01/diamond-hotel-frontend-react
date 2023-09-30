import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {logOut, setAccountDetails, setSessionExpired, toAuthResMapper} from "../features/authSlice";
import {apiErrors, apiMethods} from "../../constants";

const baseUrl = () => {
  return "/api/v1/auth"
}

const baseQuery = fetchBaseQuery({
  baseUrl: "https://diamond-hotel-backend.onrender.com",
  credentials: "include",
  prepareHeaders: (headers, {getState}) => {
    const accessToken = getState().auth.accessToken
    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`)
    }
    return headers
  }
})

const baseQueryWithReAuth = async (args, api, extraOptions) => {
  let response = await baseQuery(args, api, extraOptions)
  if (response?.error?.status === apiErrors.unauthorized.status) {
    const accessToken = null
    const refreshToken = api.getState().auth.refreshToken
    const user = api.getState().auth.user
    api.dispatch(setAccountDetails({user, accessToken, refreshToken}))
    response = await baseQuery({
      url: baseUrl() + '/auth-token/' + encodeURIComponent(refreshToken),
      method: apiMethods.put
    }, api, extraOptions)

    if (response?.data) {
      api.dispatch(setAccountDetails(toAuthResMapper(response.data)))
      response = await baseQuery(args, api, extraOptions)
    } else {
      api.dispatch(setSessionExpired())
    }
  }

  return response
}

export const apiSlice = createApi({
  baseQuery: baseQueryWithReAuth,
  endpoints: builder => ({})
})