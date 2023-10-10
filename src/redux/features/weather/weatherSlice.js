import { createSlice } from '@reduxjs/toolkit';

const weatherSlice = createSlice({
  name: 'weather',
  initialState: { all: [] },
  reducers: {
    setWeatherList: (state, action) => {
      const { all } = action.payload;
      state.all = all;
    },
  },
});

export const { setWeatherList } = weatherSlice.actions;

export default weatherSlice.reducer;

export const selectWeatherList = (state) => state.weather.all;
