import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: { details: null },
  reducers: {
    setUserDetails: (state, action) => {
      state.details = action.payload;
    },
  },
});

export const { setUserDetails } = userSlice.actions;

export default userSlice.reducer;

export const selectUserDetails = (state) => state.user.details;
