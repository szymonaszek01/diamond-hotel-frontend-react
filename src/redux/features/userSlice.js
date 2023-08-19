import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {details: null},
  reducers: {
    setUserDetails: (state, action) => {
      state.details = action.payload
    }
  }
})

export const {setUserDetails} = userSlice.actions

export default userSlice.reducer

export const selectUserDetails = (state) => state.user.details

export const allRequiredUserDetailsProvided = (state) => {
  if (!state.user.details) {
    return false
  }
  return Object.values(state.user.details).filter(value => value === null || value.length < 1).length === 0
}

export const toUserDetailsResMapper = (res) => {
  return {
    id: res.id,
    email: res.email,
    firstname: res.firstname,
    lastname: res.lastname,
    age: res.age,
    country: res.country,
    passportNumber: res.passport_number,
    phoneNumber: res.phone_number,
    city: res.city,
    street: res.street,
    postalCode: res.postal_code,
    role: res.role,
    authProvider: res.auth_provider,
    picture: res.picture,
    confirmed: res.confirmed
  }
}