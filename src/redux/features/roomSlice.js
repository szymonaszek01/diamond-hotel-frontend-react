export const toRoomSelectedListMapper = (roomTypeDetailsList) => {
  return roomTypeDetailsList.map(roomTypeDetails => {
    return {
      room_type_id: roomTypeDetails.id,
      rooms: roomTypeDetails.selectedRooms
    }
  })
}

export const toRoomSelectedCostMapper = (res) => {
  return {
    name: res.room_selected_cost.name,
    cost: res.room_selected_cost.cost
  }
}