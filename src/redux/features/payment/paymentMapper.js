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