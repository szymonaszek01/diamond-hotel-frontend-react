import {infoMenu} from "../assets";
import styles from "../style";
import Popup from "reactjs-popup";
import {CustomTag} from "./index";
import {ToastContainer} from "react-toastify";

const RoomTypeDescription = ({id, name, pricePerHotelNight, image, equipment}) => {

  return (
    <div key={`room-type-description-${id}`}>
      <ToastContainer className={"toast-style"}/>
      <Popup
        trigger={<button
          className="flex items-center justify-center">
          <img src={infoMenu} alt="info"
               className="w-[15px] h-auto rotate-90"/>
        </button>} modal nested>
        {close => (
          <div className="flex flex-col bg-transparent rounded-[10px] items-center justify-center">
            <div className="w-full bg-black-gradient box-shadow rounded-[10px] p-5 flex flex-col gap-5">
              <div className="flex flex-col sm:flex-row gap-5 items-start">
                <div className="flex flex-col gap-5">
                  <p className="text-white font-poppins font-semibold text-4xl">{name}</p>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {pricePerHotelNight ? (<CustomTag value={`${pricePerHotelNight}€`}/>) : ''}
                    {equipment?.map(obj => <CustomTag value={obj}/>)}
                  </div>
                </div>
                <div className="relative w-full">
                  <div className="absolute left-0 top-0 w-full h-full bg-white rounded-[3px]"></div>
                  <img src={image} alt={`room-type-description-${id}`}
                       className="opacity-80 w-[550px] h-auto rounded-[3px]"/>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-5">
                <button className={`${styles.button} text-black`} onClick={() => close()}>Close</button>
              </div>
            </div>
          </div>
        )}
      </Popup>
    </div>
  )
}

export default RoomTypeDescription