export const toReservedRoomTableMapper = (res) => {
  const columnList = [
    {
      name: 'Id',
      sort: {
        name: 'id',
        value: '',
      },
    },
    {
      name: 'Cost',
      sort: {
        name: 'cost',
        value: '',
      },
    },
    {
      name: 'Reservation',
      sort: {
        related: 'reservation',
        name: 'id',
        value: '',
      },
    },
    {
      name: 'Number',
      sort: {
        related: 'room',
        name: 'number',
        value: '',
      },
    },
    {
      name: 'Floor',
      sort: {
        related: 'room',
        name: 'floor',
        value: '',
      },
    },
    {
      name: 'Room type',
    },
    {
      name: 'Occupied',
    },
  ];
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
