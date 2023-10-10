export const toRoomTypeMapper = (obj) => {
  const { id, name, adults, children, price_per_hotel_night, image } = obj;
  return {
    id: id,
    name: name,
    adults: adults,
    children: children,
    pricePerHotelNight: price_per_hotel_night,
    image: image,
  };
};

export const toRoomTypeListMapper = (res) => {
  return res.map((obj) => toRoomTypeMapper(obj));
};

export const toRoomTypeSelectMapper = (res) => {
  return res.map((obj) => {
    const { id, name } = obj;
    return {
      value: id,
      label: name,
    };
  });
};

export const toRoomTypeDetailsListMapper = (res) => {
  const { room_available_list } = res;
  return room_available_list.map((obj) => {
    const { room_type_id, availability } = obj;
    return {
      id: room_type_id,
      availableRooms: availability,
      selectedRooms: 0,
      cost: 0,
    };
  });
};
