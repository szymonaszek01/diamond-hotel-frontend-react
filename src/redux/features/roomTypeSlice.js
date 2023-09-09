export const toRoomTypeListMapper = (res) => {
  return res.map(obj => {
    return {
      id: obj.id,
      name: obj.name,
      capacity: obj.capacity,
      pricePerHotelNight: obj.price_per_hotel_night,
      image: obj.image,
    }
  })
}