import { ButtonWithIcon, CustomLoadingOverlay, CustomStandardInput } from '../../../components';
import styles from '../../../style';
import Popup from 'reactjs-popup';
import { useState } from 'react';
import { inputsInfo, stripePublicKey } from '../../../constants';
import { back, cardWithClock, money } from '../../../assets';
import StripeCheckout from 'react-stripe-checkout';
import { toast } from 'react-toastify';
import { toReservationCreateReqDtoMapper } from '../../../redux/features/reservation/reservationMapper';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserDetails } from '../../../redux/features/user/userSlice';
import {
  useCreateReservationMutation,
  useUpdateReservationPaymentMutation,
} from '../../../redux/api/reservationApiSlice';

const FlightForm = ({ reservationDetails, updateReservationDetails, roomSelectedList }) => {
  const navigate = useNavigate();
  const userDetails = useSelector(selectUserDetails);

  const [form, setForm] = useState({
    flightNumber: { ...inputsInfo.flight.flightNumber, value: '' },
  });

  const onInputChange = (e) => {
    setForm({ ...form, flightNumber: { ...form.flightNumber, value: e.target.value } });
    updateReservationDetails(e.target.name, e.target.value);
  };

  const [createReservation, { isLoading: isCreateReservationLoading }] =
    useCreateReservationMutation();
  const [updateReservationPayment, { isLoading: isUpdateReservationPaymentLoading }] =
    useUpdateReservationPaymentMutation();

  const createReservationOnClick = async () => {
    try {
      await createReservation(
        toReservationCreateReqDtoMapper({
          userProfileId: userDetails.id,
          checkIn: reservationDetails.checkIn.toISOString().split('T')?.at(0),
          checkOut: reservationDetails.checkOut.toISOString().split('T')?.at(0),
          adults: reservationDetails.adults,
          children: reservationDetails.children,
          flightNumber: reservationDetails.flightNumber,
          roomSelectedList,
        })
      );

      toast.success('The payment process was completed successfully.');
      navigate('/reservations');
    } catch (error) {
      toast.error('Creating reservation failed. Please, try to do it again later.');
    }
  };

  const createPaymentOnClick = async (token) => {
    try {
      const { id } = await createReservation(
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

      await updateReservationPayment({ id, paymentToken: token.id });

      toast.success('The payment process was completed successfully.');
      navigate('/reservations');
    } catch (error) {
      toast.error('Creating reservation or payment. Please, try to do it again later.');
    }
  };

  return isCreateReservationLoading || isUpdateReservationPaymentLoading ? (
    <CustomLoadingOverlay message={'Loading...'} />
  ) : (
    <Popup
      trigger={
        <button
          disabled={roomSelectedList.length < 1}
          className={`${styles.button} w-full disabled:cursor-none`}>
          Book&Pay
        </button>
      }
      modal
      nested
      onOpen={(e) => e.preventDefault()}
      closeOnDocumentClick={false}>
      {(close) => (
        <div className="flex bg-flight-form-image rounded-[10px]">
          <div className="flex w-full flex-col bg-[#00000088] rounded-[10px] items-start justify-between p-5 gap-5">
            <div className="flex flex-col sm:flex-row justify-start sm:justify-between items-center h-[100%] border-b-[1px] border-white gap-5 sm:gap-16">
              <div className="flex flex-col w-full sm:w-[70%]">
                <CustomStandardInput
                  attributes={form.flightNumber}
                  placeholder={false}
                  autoComplete={false}
                  label={true}
                  error={false}
                  onChange={onInputChange}
                />
              </div>
              <div className="flex flex-col w-full sm:w-[80%] text-center sm:text-start mb-5">
                <h2 className="font-poppins font-semibold text-white text-[25px] xs:text-[40px] w-full break-words">
                  Flight number
                </h2>
                <p className="xs:hidden font-poppins font-normal text-white text-[15px] mt-1">
                  If you prefer not to provide your flight number, simply click the "Pay" button to
                  complete your booking.
                </p>
                <p
                  className={`hidden xs:block font-poppins font-normal text-white text-[15px] mt-1`}>
                  While providing your flight number is optional, it can help us better assist you
                  during your journey. If you prefer not to provide your flight number, simply click
                  the "Pay now or later" button to complete your booking.
                  <br />
                  <br />
                  <strong>
                    If you choose "Pay later" option, you have 24 hours to make a payment.
                  </strong>
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-5 w-full items-center justify-start xs:justify-end">
              <ButtonWithIcon
                img={back}
                imgWidth={'20px'}
                imgAlt={'back'}
                text={'Back'}
                action={close}
              />
              <button
                onClick={createReservationOnClick}
                className="flex items-center justify-center p-2 border-white border-[1px] rounded-[3px] gap-2">
                <img src={cardWithClock} alt="pay later" className="w-[20px] h-auto" />
                <p className="font-poppins font-thin text-xs text-white">Pay Later</p>
              </button>
              <StripeCheckout
                stripeKey={stripePublicKey}
                token={createPaymentOnClick}
                currency={'USD'}
                name={'Diamond hotel'}
                description={`New reservation`}>
                <button className="flex items-center justify-center p-2 border-white border-[1px] rounded-[3px] gap-2">
                  <img src={money} alt="money" className="w-[20px] h-auto" />
                  <p className="font-poppins font-thin text-xs text-white">Pay now</p>
                </button>
              </StripeCheckout>
            </div>
          </div>
        </div>
      )}
    </Popup>
  );
};
export default FlightForm;
