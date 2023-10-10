import { transferObjectKeyToLabel } from '../../../util';

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

export const toReservationCreateResDtoMapper = (res) => {
  const { id, check_in, check_out, adults, children, flight, payment } = res;
  return {
    id: id,
    checkIn: check_in,
    checkOut: check_out,
    adults: adults,
    children: children,
    flightId: flight.id,
    paymentId: payment.id,
    cost: payment.cost,
  };
};

export const toReservationTableMapper = (res) => {
  let columnList = [];
  const rowList = res.map((reservation, index) => {
    if (index === 0) {
      columnList = Object.keys(reservation)
        .filter((key) => key !== 'user_profile')
        .map((key) => transferObjectKeyToLabel(key));
    }

    return Object.entries(reservation).map(([key, value]) => {
      if (key === 'user_profile') {
        return { name: transferObjectKeyToLabel(key), value: '' };
      }
      if (key === 'flight') {
        return {
          name: transferObjectKeyToLabel(key),
          value: value !== null ? value.flight_number : '-',
        };
      }

      if (key === 'payment') {
        value = value.status;
      }

      return { name: transferObjectKeyToLabel(key), value: value };
    });
  });

  return { columnList, rowList };
};
