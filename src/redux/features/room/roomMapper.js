export const toRoomSelectedListMapper = (roomTypeDetailsList) => {
  return roomTypeDetailsList.map((roomTypeDetails) => {
    return {
      room_type_id: roomTypeDetails.id,
      rooms: roomTypeDetails.selectedRooms,
    };
  });
};

export const toRoomSelectedCostMapper = (res) => {
  const { room_selected_cost } = res;
  const { name, cost } = room_selected_cost;
  return {
    name: name,
    cost: cost,
  };
};
