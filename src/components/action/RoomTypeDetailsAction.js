import { randomCode } from '../../util';
import { close, detailsIcon } from '../../assets';
import Popup from 'reactjs-popup';
import { CustomTag } from '../index';
import { useSelector } from 'react-redux';
import { selectRoomTypeList } from '../../redux/features/roomType/roomTypeSlice';

const RoomTypeDetailsAction = ({ name, customStyles }) => {
  const roomType = useSelector(selectRoomTypeList).find((obj) => obj.name === name);

  return (
    <Popup
      key={`room-type-details-action-${randomCode(3)}`}
      trigger={
        <button
          className={`flex w-full flex-row items-center ${
            customStyles ?? ''
          } justify-start gap-2 cursor-pointer border-none outline-none`}>
          <img src={detailsIcon} alt={'room-type-details'} className={`w-[17px] h-auto`} />
          <p className="font-poppins font-thin text-xs text-black">Details</p>
        </button>
      }
      modal
      nasted>
      {(closePopup) => (
        <div className="flex flex-col bg-transparent rounded-[10px] items-center justify-center box-shadow">
          <div className="w-full bg-black-gradient rounded-[10px] flex flex-col py-7 gap-5 items-center justify-center">
            <div className="flex flex-col w-full xs:w-[80%] gap-5 justify-center items-center xs:items-start p-2 xs:p-0">
              <img
                src={close}
                alt={`close`}
                className={`w-[18px] h-auto absolute right-0 top-0 mr-2 mt-2 xs:mt-4 xs:mr-4 cursor-pointer`}
                onClick={() => closePopup()}
              />
              <p className="text-white font-poppins font-semibold text-2xl xs:text-4xl break-words text-center xs:text-start xs:break-normal">
                {roomType.name}
              </p>
              <img
                src={roomType.image}
                alt={`room-type-description-${roomType.id}`}
                className="opacity-80 w-full h-auto rounded-[3px] border-white border-2"
              />
              <div className="flex flex-1 flex-wrap gap-3 justify-center items-center xs:justify-start">
                <CustomTag value={`${roomType.pricePerHotelNight}$`} />
                <CustomTag value={`${roomType.adults} adults`} />
                <CustomTag value={`${roomType.children} children`} />
                {roomType.equipment.map((obj) => (
                  <CustomTag value={obj} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </Popup>
  );
};

export default RoomTypeDetailsAction;
