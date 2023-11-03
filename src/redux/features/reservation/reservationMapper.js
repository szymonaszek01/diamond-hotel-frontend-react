import { approved, waiting } from '../../../assets';
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

export const toReservationTableMapper = (res) => {
  const columnList = [
    {
      name: 'Id',
      sort: {
        name: 'id',
        value: '',
      },
    },
    {
      name: 'Adults',
      sort: {
        name: 'adults',
        value: '',
      },
    },
    {
      name: 'Children',
      sort: {
        name: 'children',
        value: '',
      },
    },
    {
      name: 'Payment',
      sort: {
        related: 'payment',
        name: 'id',
        value: '',
      },
    },
    {
      name: 'Check in',
      sort: {
        name: 'check_in',
        value: '',
      },
    },
    {
      name: 'Check out',
      sort: {
        name: 'check_out',
        value: '',
      },
    },
    {
      name: 'Flight',
    },
    {
      name: 'Status',
    },
  ];
  const rowList = res.map((reservation) => {
    const { id, adults, children, flight, payment, check_in, check_out } = reservation;
    return [
      {
        name: 'Id',
        value: id,
      },
      {
        name: 'Adults',
        value: adults,
      },
      {
        name: 'Children',
        value: children,
      },
      {
        name: 'Payment',
        value: payment.id,
      },
      {
        name: 'Check in',
        value: check_in,
      },
      {
        name: 'Check out',
        value: check_out,
      },
      {
        name: 'Flight',
        value: flight !== null ? flight.flight_number ?? '-' : '-',
      },
      {
        name: 'Status',
        value: transferObjectKeyToLabel(payment.status),
        icon: payment.status?.toLowerCase().includes('approved') ? approved : waiting,
      },
    ];
  });

  return { columnList, rowList };
};
