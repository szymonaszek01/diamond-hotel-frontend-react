import { createSlice } from '@reduxjs/toolkit';

const roomTypeSlice = createSlice({
  name: 'roomType',
  initialState: { all: [] },
  reducers: {
    setRoomTypeList: (state, action) => {
      const { all } = action.payload;
      state.all = all;
    },
    setRoomTypeEquipment: (state, action) => {
      const { id, name, adults, children, pricePerHotelNight, image, equipment } = action.payload;
      let roomTypeList = state.all.filter((roomType) => roomType.id !== id);
      roomTypeList.push({ id, name, adults, children, pricePerHotelNight, image, equipment });
      state.all = roomTypeList;
    },
  },
});

export const { setRoomTypeList, setRoomTypeEquipment } = roomTypeSlice.actions;

export default roomTypeSlice.reducer;

export const selectRoomTypeList = (state) => state.roomType.all;
