import StripeCheckout from 'react-stripe-checkout';
import { stripePublicKey } from '../constants';
import { CustomLoadingOverlay } from './index';
import { toast, ToastContainer } from 'react-toastify';
import { useCreateReservationMutation } from '../redux/api/reservationApiSlice';
import { useChargePaymentMutation } from '../redux/api/paymentApiSlice';
import { toReservationCreateReqDtoMapper } from '../redux/features/reservation/reservationMapper';
import { useSelector } from 'react-redux';
import { selectUserDetails } from '../redux/features/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { money } from '../assets';
import { toPaymentChargeReqDtoMapper } from '../redux/features/payment/paymentMapper';

const PaymentForm = ({ reservationDetails, roomSelectedList }) => {
  const navigate = useNavigate();

  const userDetails = useSelector(selectUserDetails);

  const [createReservation, { isLoading: isCreateReservationLoading }] =
    useCreateReservationMutation();
  const [chargePayment, { isLoading: isChargePaymentLoading }] = useChargePaymentMutation();

  const chargePaymentOnClick = async (token) => {
    try {
      let response = await createReservation(
        toReservationCreateReqDtoMapper({
          userProfileId: userDetails.id,
          checkIn: reservationDetails.checkIn.toISOString().split('T')?.at(0),
          checkOut: reservationDetails.checkOut.toISOString().split('T')?.at(0),
          adults: reservationDetails.adults,
          children: reservationDetails.children,
          flightNumber: reservationDetails.flightNumber,
          roomSelectedList,
        })
      ).unwrap();

      const paymentId = response.payment.id;
      const reservationId = response.id;
      const tokenId = token.id;
      const amount = response.payment.cost;

      await chargePayment(
        toPaymentChargeReqDtoMapper({
          paymentId,
          reservationId,
          userProfileId: userDetails.id,
          token: tokenId,
          amount,
        })
      ).unwrap();

      navigate('/reservations');
    } catch (error) {
      toast.error('Payment failed. Please, try to do it again later.');
    }
  };

  return isCreateReservationLoading || isChargePaymentLoading ? (
    <CustomLoadingOverlay message={'Loading...'} />
  ) : (
    <div key={`payment-form`}>
      <ToastContainer className={'toast-style'} />
      <StripeCheckout
        stripeKey={stripePublicKey}
        token={chargePaymentOnClick}
        currency={'USD'}
        name={'Diamond hotel'}
        description={
          'Reservation (' +
          reservationDetails.checkIn.toISOString().split('T')?.at(0) +
          '/' +
          reservationDetails.checkOut.toISOString().split('T')?.at(0) +
          ')'
        }>
        <button className="flex items-center justify-center p-2 border-white border-[1px] rounded-[3px] gap-2">
          <img src={money} alt="money" className="w-[20px] h-auto" />
          <p className="font-poppins font-thin text-xs text-white">Pay</p>
        </button>
      </StripeCheckout>
    </div>
  );
};

export default PaymentForm;
