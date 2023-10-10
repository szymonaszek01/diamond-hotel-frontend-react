import { createSlice } from '@reduxjs/toolkit';

const reservationSlice = createSlice({
  name: 'reservation',
  initialState: { all: [], page: 0 },
  reducers: {
    setReservationList: (state, action) => {
      const { all, page } = action.payload;
      state.all = all;
      state.page = page;
    },
  },
});

export const { setReservationList } = reservationSlice.actions;

export default reservationSlice.reducer;

export const selectReservationList = (state) => state.reservation.all;

export const selectReservationPage = (state) => state.reservation.page;
