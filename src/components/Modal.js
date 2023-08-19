import Popup from 'reactjs-popup';
import styles from "../style";

const Modal = ({button, header, body, warning, action}) => {
  return (
    <Popup trigger={<button className={`${styles.button}`}>{button}</button>} modal nested>
      {close => (
        <div className="modal">
          <button className="close" onClick={close}>
            &times;
          </button>
          <div className="header break-all">
            {header}
          </div>
          <div className="content">
            <p className={`${styles.paragraph} text-white text-sm`}>{body}</p>
            <p className={`${styles.paragraph} text-gradient font-semibold text-xs ${!warning ? 'hidden' : ''}`}>{warning}</p>
          </div>
          <div className="actions flex-col sm:flex-row">
            <button className={`${styles.button} text-black`} onClick={(e) => {
              close()
              action(e)
            }}>Update
            </button>
            <button className={`${styles.button} text-black`} onClick={() => close()}>Close</button>
          </div>
        </div>
      )}
    </Popup>
  )
}

export default Modal