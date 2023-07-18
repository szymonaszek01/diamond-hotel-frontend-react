import {createSlice} from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {user: null, accessToken: null, refreshToken: null},
  reducers: {
    setCredentials: (state, action) => {
      const {user, accessToken, refreshToken} = action.payload
      state.user = user
      state.accessToken = accessToken
      state.refreshToken = refreshToken
    },
    logOut: (state, action) => {
      state.user = null
      state.accessToken = null
      state.refreshToken = null
    },
  }
})

export const {setCredentials, logOut} = authSlice.actions

export default authSlice.reducer

export const selectCurrentUser = (state) => state.auth.user

export const selectCurrentAccessToken = (state) => state.auth.accessToken

export const selectCurrentRefreshToken = (state) => state.auth.refreshToken

export const toAuthResponseMapper = (response) => {
  return {
    user: response.email,
    accessToken: response.access_token,
    refreshToken: response.refresh_token
  }
}