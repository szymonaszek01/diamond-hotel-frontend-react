export const toRoomTypeMapper = (obj) => {
  return {
    id: obj.id,
    name: obj.name,
    adults: obj.adults,
    children: obj.children,
    pricePerHotelNight: obj.price_per_hotel_night,
    image: obj.image,
  }
}

export const toRoomTypeListMapper = (res) => {
  return res.map(obj => toRoomTypeMapper(obj))
}

export const toRoomTypeSelectMapper = (res) => {
  return res.map(obj => {
    return {
      value: obj.id,
      label: obj.name
    }
  })
}

export const toRoomTypeDetailsListMapper = ({checkIn, checkOut, res}) => {
  return res.room_available_list.map(room_available => {
    return {
      checkIn: checkIn,
      checkOut: checkOut,
      id: room_available.room_type_id,
      availableRooms: room_available.availability,
      selectedRooms: 0,
      cost: 0
    }
  })
}