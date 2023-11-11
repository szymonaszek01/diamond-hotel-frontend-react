import { createSlice } from '@reduxjs/toolkit';

const roomTypeSlice = createSlice({
  name: 'roomType',
  initialState: { all: [] },
  reducers: {
    setRoomTypeList: (state, action) => {
      const { all } = action.payload;
      state.all = all;
    },
  },
});

export const { setRoomTypeList } = roomTypeSlice.actions;

export default roomTypeSlice.reducer;

export const selectRoomTypeList = (state) => state.roomType.all;
