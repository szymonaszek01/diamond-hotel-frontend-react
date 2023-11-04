import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    accessToken: null,
    refreshToken: null,
    oauth2Error: null,
    expired: false,
    confirmed: null,
    fullAccess: null,
  },
  reducers: {
    setAccountDetails: (state, action) => {
      const { user, id, accessToken, refreshToken, confirmed } = action.payload;
      state.user = user;
      state.id = id;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.expired = false;
      state.confirmed = confirmed;
    },
    logOut: (state) => {
      state.user = null;
      state.id = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.confirmed = null;
      state.expired = false;
      state.fullAccess = null;
    },
    setConfirmation: (state, action) => {
      const { confirmed } = action.payload;
      state.confirmed = confirmed;
    },
    setOAuth2Error: (state, action) => {
      const { error } = action.payload;
      state.oauth2Error = error;
    },
    setSessionExpired: (state) => {
      state.user = null;
      state.id = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.confirmed = null;
      state.expired = true;
      state.fullAccess = null;
    },
    setFullAccess: (state, action) => {
      const { fullAccess } = action.payload;
      state.fullAccess = fullAccess;
    },
  },
});

export const {
  setAccountDetails,
  logOut,
  setConfirmation,
  setOAuth2Error,
  setSessionExpired,
  setFullAccess,
} = authSlice.actions;

export default authSlice.reducer;

export const selectUser = (state) => state.auth.user;

export const selectUserId = (state) => state.auth.id;

export const selectAccessToken = (state) => state.auth.accessToken;

export const selectFullAccess = (state) => state.auth.fullAccess;

export const selectExpired = (state) => state.auth.expired;

export const selectRefreshToken = (state) => state.auth.refreshToken;

export const isConfirmed = (state) => state.auth.confirmed;

export const selectOAuth2Error = (state) => state.auth.oauth2Error;
