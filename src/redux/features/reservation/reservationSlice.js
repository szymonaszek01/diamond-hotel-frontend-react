import { createSlice } from '@reduxjs/toolkit';

const reservationSlice = createSlice({
  name: 'reservation',
  initialState: { all: [] },
  reducers: {
    setReservationList: (state, action) => {
      const { all } = action.payload;
      state.all = all;
    },
  },
});

export const { setReservationList } = reservationSlice.actions;

export default reservationSlice.reducer;

export const selectReservationList = (state) => state.reservation.all;
