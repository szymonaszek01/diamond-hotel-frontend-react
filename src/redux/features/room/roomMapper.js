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

export const toRoomFloorListMapper = (response) => {
  return response.map((roomFloor, index) => {
    return { value: roomFloor, selected: index === 0 };
  });
};

export const toRoomDetailsListMapper = (response) => {
  return response.map((roomDetails) => {
    const {
      number,
      floor,
      room_type_name,
      room_type_shortcut,
      occupied,
      reservation_id,
      check_in,
      check_out,
      email,
    } = roomDetails;
    return {
      number: number,
      floor: floor,
      roomTypeName: room_type_name,
      roomTypeShortcut: room_type_shortcut,
      occupied: occupied,
      reservationId: reservation_id,
      checkIn: check_in,
      checkOut: check_out,
      email: email,
    };
  });
};
