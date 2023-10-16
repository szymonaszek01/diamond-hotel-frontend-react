import { transferObjectKeyToLabel } from '../../../util';

export const toPaymentChargeReqDtoMapper = ({
  paymentId,
  reservationId,
  userProfileId,
  token,
  amount,
}) => {
  return {
    payment_id: paymentId,
    reservation_id: reservationId,
    user_profile_id: userProfileId,
    token: token,
    amount: amount,
  };
};

export const toPaymentTableMapper = (res) => {
  const columnList = ['Id', 'Cost', 'Status', 'Code', 'Charge', 'Created at'];
  const rowList = res.map((payment) => {
    const { id, cost, status, token, charge, created_at } = payment;
    const createdDate = new Date(created_at).toISOString().split('T')?.at(0);
    const createdHour = new Date(created_at).getHours();
    const createdMinute = new Date(created_at).getMinutes();
    return [
      { name: 'Id', value: id },
      { name: 'Cost', value: `${cost} $` },
      { name: 'Status', value: transferObjectKeyToLabel(status) },
      { name: 'Code', value: token },
      { name: 'Charge', value: charge },
      { name: 'Created at', value: `${createdDate} ${createdHour}:${createdMinute}` },
    ];
  });

  return { columnList, rowList };
};
