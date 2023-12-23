import Popup from 'reactjs-popup';
import styles from '../../style';

const Modal = ({ button, header, body, warning, action }) => {
  return (
    <Popup trigger={<button className={`${styles.button}`}>{button}</button>} modal nested>
      {(close) => (
        <div className={`w-full flex flex-col px-2`}>
          <button
            className={`flex flex-row items-center justify-end text-white text-3xl`}
            onClick={close}>
            &times;
          </button>
          <div className="mb-3 px-5">
            <p className={`${styles.paragraph} text-white text-sm`}>{body}</p>
            <p
              className={`${styles.paragraph} text-gradient font-semibold text-xs ${
                !warning ? 'hidden' : ''
              }`}>
              {warning}
            </p>
          </div>
          <div className="mb-5 px-5 w-full flex flex-col sm:flex-row gap-3">
            <button
              className={`${styles.button} text-black`}
              onClick={(e) => {
                close();
                action(e);
              }}>
              Update
            </button>
            <button className={`${styles.button} text-black`} onClick={() => close()}>
              Close
            </button>
          </div>
        </div>
      )}
    </Popup>
  );
};

export default Modal;
