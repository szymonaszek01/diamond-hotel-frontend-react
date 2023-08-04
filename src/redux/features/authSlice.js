import {createSlice} from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {user: null, accessToken: null, refreshToken: null},
  reducers: {
    setCredentials: (state, action) => {
      const {user, accessToken, refreshToken, confirmed} = action.payload
      state.user = user
      state.accessToken = accessToken
      state.refreshToken = refreshToken
      state.confirmed = confirmed
    },
    logOut: (state, action) => {
      state.user = null
      state.accessToken = null
      state.refreshToken = null
      state.confirmed = null
    },
  }
})

export const {setCredentials, logOut} = authSlice.actions

export default authSlice.reducer

export const selectCurrentUser = (state) => state.auth.user

export const selectCurrentAccessToken = (state) => state.auth.accessToken

export const selectCurrentRefreshToken = (state) => state.auth.refreshToken

export const selectCurrentConfirmed = (state) => state.auth.confirmed

export const toAuthResMapper = (res) => {
  return {
    user: res.email,
    accessToken: res.access_token,
    refreshToken: res.refresh_token,
    confirmed: res.confirmed
  }
}

export const toRegisterReqMapper = (req) => {
  return {
    email: req.email,
    password: req.password,
    repeated_password: req.repeated,
    firstname: req.firstname,
    lastname: req.lastname,
    age: req.age,
    country: req.country,
    passport_number: req.passport,
    phone_number: req.phone,
    city: req.city,
    street: req.street,
    postal_code: req.postal
  }
}

export const validatePassword = (password, repeated) => {
  if (password !== repeated) {
    return 'Passwords are not equaled'
  }

  if (!new RegExp('.{8,}').test(password)) {
    return 'Your password must be between 8-15 characters'
  }

  if (!new RegExp('(?=.*?[A-Z])').test(password)) {
    return 'Your password must contain at least 1 capital letter'
  }

  if (!new RegExp('(?=.*?[a-z])').test(password)) {
    return 'Your password must contain at least 1 lowercase letter'
  }

  if (!new RegExp('(?=.*?[0-9])').test(password)) {
    return 'Your password must contain at least 1 number'
  }

  if (!new RegExp('(?=.*[#$@!%&*?])').test(password)) {
    return 'Your password must contain at least 1 special sign'
  }

  return null;
}