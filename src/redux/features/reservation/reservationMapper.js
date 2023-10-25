export const toReservationCreateReqDtoMapper = ({
  userProfileId,
  checkIn,
  checkOut,
  adults,
  children,
  flightNumber,
  roomSelectedList,
}) => {
  return {
    user_profile_id: userProfileId,
    check_in: checkIn,
    check_out: checkOut,
    adults: adults,
    children: children,
    flight_number: flightNumber,
    room_selected_list: roomSelectedList,
  };
};

export const toReservationTableMapper = (res) => {
  const columnList = [
    'Id',
    'Adults',
    'Children',
    'Flight',
    'Payment',
    'Status',
    'Check in',
    'Check out',
  ];
  const rowList = res.map((reservation) => {
    const { id, adults, children, flight, payment, check_in, check_out } = reservation;
    return [
      { name: 'Id', value: id },
      { name: 'Adults', value: adults },
      { name: 'Children', value: children },
      { name: 'Flight', value: flight !== null ? flight.flight_number : '-' },
      { name: 'Payment', value: payment.id },
      {
        name: 'Status',
        value:
          payment.status?.charAt(0).toUpperCase() + payment.status?.slice(1).replaceAll('-', ' '),
      },
      { name: 'Check in', value: check_in },
      { name: 'Check out', value: check_out },
    ];
  });

  return { columnList, rowList };
};
