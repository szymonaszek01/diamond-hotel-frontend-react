export const toReservedRoomTableMapper = (res) => {
  const columnList = ['Id', 'Occupied', 'Cost', 'Reservation', 'Number', 'Floor', 'Room type'];
  const rowList = res.map((reservedRoom) => {
    const { id, occupied, cost, room, reservation } = reservedRoom;
    const { number, floor, room_type } = room;
    return [
      { name: 'Id', value: id },
      { name: 'Occupied', value: occupied ? 'Yes' : 'No' },
      { name: 'Cost', value: `${cost} $` },
      { name: 'Reservation', value: reservation.id },
      { name: 'Number', value: number },
      { name: 'Floor', value: floor },
      { name: 'Room type', value: room_type.name },
    ];
  });

  return { columnList, rowList };
};
