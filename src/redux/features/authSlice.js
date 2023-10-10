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

export const toAuthResMapper = (res) => {
  return {
    user: res.email,
    id: res.id,
    accessToken: res.access_token,
    refreshToken: res.refresh_token,
    confirmed: res.confirmed,
  };
};

export const toRegisterReqMapper = (req) => {
  return {
    email: req.email.value,
    password: req.password.value,
    repeated_password: req.repeated.value,
    firstname: req.firstname.value,
    lastname: req.lastname.value,
    age: req.age.value,
    country: req.country.value,
    passport_number: req.passport.value,
    phone_number: req.phone.value,
    city: req.city.value,
    street: req.street.value,
    postal_code: req.postal.value,
  };
};

export const validatePassword = (password, repeated) => {
  if (password !== repeated) {
    return 'Passwords are not equaled';
  }

  if (!new RegExp('.{8,}').test(password)) {
    return 'Your password must be between 8-15 characters';
  }

  if (!new RegExp('(?=.*?[A-Z])').test(password)) {
    return 'Your password must contain at least 1 capital letter';
  }

  if (!new RegExp('(?=.*?[a-z])').test(password)) {
    return 'Your password must contain at least 1 lowercase letter';
  }

  if (!new RegExp('(?=.*?[0-9])').test(password)) {
    return 'Your password must contain at least 1 number';
  }

  if (!new RegExp('(?=.*[#$@!%&*?])').test(password)) {
    return 'Your password must contain at least 1 special sign';
  }

  return null;
};
