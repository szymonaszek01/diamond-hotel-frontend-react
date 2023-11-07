import { randomCode } from '../../util';
import { cancel, moneyBlack } from '../../assets';
import Popup from 'reactjs-popup';
import styles from '../../style';
import { stripePublicKey } from '../../constants';
import StripeCheckout from 'react-stripe-checkout';
import { useNavigate } from 'react-router-dom';

const CancelOrPayAction = ({ name, minDays, type, id, api }) => {
  useNavigate();
  const textList = {
    cancel: {
      body: `By clicking "Confirm" you are canceling your ${name}. Any payments made will be refunded according to our cancellation policy.`,
      warning: `Please be aware that ${name}s cannot be canceled within ${minDays} days of the check in date. Any cancellation requests made at this time may not be eligible for a refund.`,
    },
    pay: {
      body: `By clicking "Confirm" you are paying for your ${name}.`,
      warning: `Please note that we are unable to process any charges or payment adjustments after 24 hours of your booking.`,
    },
  };

  const deleteOnClick = (e) => {
    e.preventDefault();
    api({ id })
      .then(() => window.location.reload())
      .catch((error) => console.log(error));
  };

  const payOnClick = (token) => {
    api({ id, token })
      .then(() => window.location.reload())
      .catch((error) => console.log(error));
  };

  return (
    <Popup
      key={`delete-action-${randomCode(3)}`}
      trigger={
        <button
          className={`flex w-full flex-row items-center justify-start gap-2 cursor-pointer border-none outline-none`}>
          {type === 'cancel' ? (
            <img src={cancel} alt={'cancel'} className={`w-[17px] h-auto`} />
          ) : (
            <img src={moneyBlack} alt={'pay'} className={`w-[17px] h-auto`} />
          )}
          <p className="font-poppins font-thin text-xs text-black">
            {type === 'cancel' ? 'Cancel' : 'Pay'}
          </p>
        </button>
      }
      modal
      nasted>
      {(close) => (
        <div className="flex flex-col bg-transparent rounded-[10px] items-center justify-center">
          <div className="w-[80%] bg-black-gradient box-shadow rounded-[10px] p-5 flex flex-col gap-20">
            <p className={`flex flex-col gap-2 text-xs font-poppins font-thin leading-6`}>
              <span className={'text-sm font-semibold text-white leading-8'}>
                {type === 'cancel' ? textList.cancel.body : textList.pay.body}
              </span>
              <span className={`text-gradient`}>
                {type === 'cancel' ? textList.cancel.warning : textList.pay.warning}
              </span>
            </p>
            <div className={'flex flex-col sm:flex-row gap-5'}>
              {type === 'cancel' ? (
                <button className={`${styles.button}`} onClick={deleteOnClick}>
                  Confirm
                </button>
              ) : (
                <StripeCheckout
                  stripeKey={stripePublicKey}
                  token={payOnClick}
                  currency={'USD'}
                  name={'Diamond hotel'}
                  description={`${name} #${id}`}>
                  <button className={`${styles.button}`}>Confirm</button>
                </StripeCheckout>
              )}
              <button className={`${styles.button}`} onClick={() => close()}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </Popup>
  );
};

export default CancelOrPayAction;
