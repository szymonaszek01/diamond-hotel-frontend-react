import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    accessToken: null,
    refreshToken: null,
    oauth2Error: null,
    expired: false,
  },
  reducers: {
    setAccountDetails: (state, action) => {
      const { user, id, accessToken, refreshToken } = action.payload;
      state.user = user;
      state.id = id;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.expired = false;
    },
    logOut: (state) => {
      state.user = null;
      state.id = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.confirmed = null;
      state.expired = false;
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
    },
  },
});

export const { setAccountDetails, logOut, setConfirmation, setOAuth2Error, setSessionExpired } =
  authSlice.actions;

export default authSlice.reducer;

export const selectUser = (state) => state.auth.user;

export const selectUserId = (state) => state.auth.id;

export const selectAccessToken = (state) => state.auth.accessToken;

export const selectExpired = (state) => state.auth.expired;

export const selectRefreshToken = (state) => state.auth.refreshToken;

export const isConfirmed = (state) => state.auth.confirmed;

export const selectOAuth2Error = (state) => state.auth.oauth2Error;
