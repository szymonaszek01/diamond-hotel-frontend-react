import { close } from '../../assets';
import Popup from 'reactjs-popup';
import { useState } from 'react';
import { inputsInfo } from '../../constants';
import { CustomStandardInput, PdfAction } from '../index';
import { useGetReservationPdfDocumentByIdMutation } from '../../redux/api/reservationApiSlice';

const RoomDetailsAction = ({
  floor,
  number,
  roomTypeName,
  roomTypeShortcut,
  occupied,
  reservationId,
  checkIn,
  checkOut,
  email,
  isLast,
  isTop,
  empty,
}) => {
  const [form] = useState({
    floor: {
      ...inputsInfo.room.floor,
      value: floor,
    },
    number: {
      ...inputsInfo.room.number,
      value: number,
    },
    roomTypeName: {
      ...inputsInfo.roomType.name,
      name: 'roomTypeName',
      label: 'Room Type Name',
      value: roomTypeName,
    },
    roomTypeNameShortcut: {
      type: 'text',
      name: 'roomTypeNameShortcut',
      label: 'Room Type Name Shortcut',
      value: roomTypeShortcut,
    },
    occupied: {
      ...inputsInfo.room.occupied,
      type: 'text',
      value: occupied ? 'Occupied' : 'Vacancy',
    },
    reservationId: {
      ...inputsInfo.reservation.id,
      value: reservationId,
    },
    checkIn: {
      ...inputsInfo.roomType.checkIn,
      type: 'text',
      value: checkIn,
    },
    checkOut: {
      ...inputsInfo.roomType.checkOut,
      type: 'text',
      value: checkOut,
    },
    email: {
      ...inputsInfo.user.email,
      value: email,
    },
  });
  const [getReservationPdfDocumentById] = useGetReservationPdfDocumentByIdMutation();

  return (
    <Popup
      key={`room-details-action-${floor}-${number}`}
      trigger={
        <button
          className={`w-full xs:w-[20%] flex justify-center flex-wrap items-center px-0.5 xs:px-4 text-white border-white ${
            isLast ? '' : 'xs:border-r-[1px]'
          } ${isTop ? 'border-b-[1px]' : 'border-t-[1px]'}`}
          disabled={empty}>
          <span
            className={`w-full font-poppins text-xs font-semibold break-words ${
              empty ? 'invisible' : ''
            }`}>
            {roomTypeShortcut}
          </span>
          <span
            className={`w-full font-poppins text-base font-semibold break-words ${
              empty ? 'invisible' : ''
            }`}>
            {number}
          </span>
          <span
            className={`w-full font-poppins text-xs font-semibold break-words text-gradient break-words ${
              empty ? 'invisible' : reservationId ? '' : 'hidden'
            }`}>
            {occupied ? 'Occupied' : 'Vacancy'}
          </span>
          <span
            className={`w-full font-poppins text-xs font-semibold break-words text-gradient break-words ${
              empty ? 'invisible' : reservationId ? 'hidden' : ''
            }`}>
            Not reserved
          </span>
        </button>
      }
      modal
      nasted
      closeOnDocumentClick={false}>
      {(closePopup) => (
        <div className="w-full py-7" key={`room-details-action-${floor}-${number}-content`}>
          <div className="flex flex-col w-full justify-center items-center p-2 px-0 xs:px-5">
            <img
              src={close}
              alt={`close`}
              className={`w-[18px] h-auto absolute right-0 top-0 mr-2 mt-2 xs:mt-4 xs:mr-4 cursor-pointer`}
              onClick={() => closePopup()}
            />
            <div className={`w-full flex flex-wrap justify-between`}>
              {Object.values(form).map((obj) => (
                <CustomStandardInput
                  attributes={obj}
                  label={true}
                  customStyles={`w-full sm:w-[30%] mt-5`}
                  disabled={true}
                />
              ))}
            </div>
            <div
              className={`w-full flex flex-row bg-yellow-gradient px-4 py-3 rounded-[4px] mt-10 ${
                reservationId ? '' : 'hidden'
              }`}>
              <PdfAction
                id={reservationId}
                api={async ({ id }) => await getReservationPdfDocumentById({ id })}
              />
            </div>
          </div>
        </div>
      )}
    </Popup>
  );
};

export default RoomDetailsAction;
