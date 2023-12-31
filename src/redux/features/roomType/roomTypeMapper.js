export const toRoomTypeMapper = (obj) => {
  const { id, name, adults, children, price_per_hotel_night } = obj;
  return {
    id: id,
    name: name,
    adults: adults,
    children: children,
    pricePerHotelNight: price_per_hotel_night,
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

export const toRoomTypeRequestMapper = (form) => {
  return {
    name: form.name.value,
    adults: form.adults.value,
    children: form.children.value,
    price_per_hotel_night: form.pricePerHotelNight.value,
    image: form.image.value,
    equipment: form.equipment.value,
  };
};
