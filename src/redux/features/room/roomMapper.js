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

export const toAddRoomRequestMapper = (form) => {
  return {
    number: form.number.value,
    floor: form.floor.value,
    room_type_id: form.roomTypeName.value?.value,
  };
};
