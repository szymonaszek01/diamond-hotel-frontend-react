import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query";
import {logOut, setCredentials} from "../features/authSlice";
import {apiErrors} from "../../constants";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5432",
  credentials: "include",
  prepareHeaders: (headers, {getState}) => {
    const token = getState().auth.token
    if (token) {
      headers.set("Authorization", `Bearer ${token}`)
    }
    return headers
  }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)

  if (result?.error?.originalStatus === apiErrors.forbidden.status) {
    const refreshResult = await baseQuery('/refresh', api, extraOptions)
    console.log(`Refreshed token: ${refreshResult}`)
    if (refreshResult?.data) {
      const user = api.getState().auth.user
      api.dispatch(setCredentials({...refreshResult.data, user}))
      result = await baseQuery(args, api, extraOptions)
    } else {
      api.dispatch(logOut())
    }
  }

  return result
}

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: builder => ({})
})