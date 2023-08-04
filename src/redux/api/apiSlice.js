import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {logOut, setCredentials, toAuthResMapper} from "../features/authSlice";
import {apiErrors, apiMethods} from "../../constants";

const baseUrl = () => {
  return "/api/v1/auth"
}

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5432",
  credentials: "include",
  prepareHeaders: (headers, {getState}) => {
    headers.set('Content-Type', 'application/json')
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
    api.dispatch(setCredentials({user, accessToken, refreshToken}))
    response = await baseQuery({
      url: baseUrl() + '/refresh/access-token',
      method: apiMethods.post,
      body: {refresh_token: refreshToken},
    }, api, extraOptions);

    if (response?.data) {
      api.dispatch(setCredentials(toAuthResMapper(response.data)))
      response = await baseQuery(args, api, extraOptions)
    } else {
      api.dispatch(logOut())
    }
  }

  return response
}

export const apiSlice = createApi({
  baseQuery: baseQueryWithReAuth,
  endpoints: builder => ({})
})