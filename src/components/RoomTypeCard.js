import {
  CustomLoadingOverlay,
  CustomTagWithLabel,
  PlusMinusButton,
  RoomTypeDetailsAction,
} from './index';
import { useEffect, useState } from 'react';
import { randomCode } from '../util';
import { useDispatch, useSelector } from 'react-redux';
import { selectRoomTypeList, setRoomTypeEquipment } from '../redux/features/roomType/roomTypeSlice';
import {
  useGetRoomTypeByIdMutation,
  useGetRoomTypeEquipmentMutation,
} from '../redux/api/roomTypeApiSlice';
import { toRoomTypeMapper } from '../redux/features/roomType/roomTypeMapper';

const RoomTypeCard = ({ id, availableRooms, selectedRooms, updateRoomTypeDetails }) => {
  const tagCommonBorderStyle = 'border-white';
  const tagCommonTextStyle = 'text-center sm:text-start';

  const dispatch = useDispatch();
  const roomTypeFromState = useSelector(selectRoomTypeList).find(
    (obj) => obj.id === id && obj.equipment?.length > 0
  );

  const [roomType, setRoomType] = useState({
    id: roomTypeFromState ? roomTypeFromState.id : 0,
    name: roomTypeFromState ? roomTypeFromState.name : '',
    adults: roomTypeFromState ? roomTypeFromState.adults : 0,
    children: roomTypeFromState ? roomTypeFromState.children : 0,
    pricePerHotelNight: roomTypeFromState ? roomTypeFromState.pricePerHotelNight : 0,
    image: roomTypeFromState ? roomTypeFromState.image : '',
    equipment: roomTypeFromState ? roomTypeFromState.equipment : [],
  });

  const [getRoomTypeById, { isLoading: isGetRoomTypeByIdLoading }] = useGetRoomTypeByIdMutation();
  const [getRoomTypeEquipment, { isLoading: isGetRoomTypeEquipmentLoading }] =
    useGetRoomTypeEquipmentMutation();

  useEffect(() => {
    const loadRoomTypeByName = async () => {
      let result = {};

      try {
        const response = await getRoomTypeById({ id }).unwrap();
        result = { ...toRoomTypeMapper(response) };
      } catch (error) {
        console.log('Failed to load room type.');
      }

      try {
        const response = await getRoomTypeEquipment({ id: result.id }).unwrap();
        result = { ...result, equipment: response };
        setRoomType({ ...roomType, ...result });
        dispatch(setRoomTypeEquipment(result));
      } catch (error) {
        console.log('Failed to load room type equipment.');
      }
    };

    if ((roomTypeFromState === undefined || roomTypeFromState === null) && id) {
      loadRoomTypeByName().then(() => console.log('Loaded room type or room type equipment'));
    }
  }, [getRoomTypeById, getRoomTypeEquipment]);

  return isGetRoomTypeByIdLoading || isGetRoomTypeEquipmentLoading ? (
    <CustomLoadingOverlay message={'Loading...'} />
  ) : (
    <div
      key={`room-type-card-${randomCode(5)}`}
      className="relative flex flex-col gap-5 sm:gap-0 sm:flex-row bg-black-gradient box-shadow w-full rounded-[10px] items-center justify-between p-5">
      <p
        className={`font-poppins font-semibold text-white text-xl mt-5 sm:mt-0 text-center sm:text-start w-full sm:w-[18%]`}>
        {roomType?.name}
      </p>
      <div className="flex flex-col">
        <div className="flex flex-col sm:flex-row border-white border-[1px] rounded-[3px] text-center sm:text-start">
          <CustomTagWithLabel
            value={availableRooms}
            label={'Available rooms'}
            styles={tagCommonTextStyle}
          />
          <CustomTagWithLabel
            value={roomType?.adults}
            label={'Adults'}
            styles={`${tagCommonBorderStyle} border-t-[1px] sm:border-t-[0] border-l-[0] sm:border-l-[1px] ${tagCommonTextStyle}`}
          />
          <CustomTagWithLabel
            value={roomType?.children}
            label={'Children'}
            styles={`${tagCommonBorderStyle} border-t-[1px] sm:border-t-[0] border-l-[0] sm:border-l-[1px] ${tagCommonTextStyle}`}
          />
        </div>
        <div
          className={`flex flex-col sm:flex-row ${tagCommonBorderStyle} border-x-[1px] border-b-[1px] rounded-[3px] ${tagCommonTextStyle}`}>
          <CustomTagWithLabel
            value={`${roomType?.pricePerHotelNight}$`}
            label={'Price per hotel night'}
            styles={tagCommonTextStyle}
          />
        </div>
      </div>
      <div className={`flex flex-col gap-5`}>
        <RoomTypeDetailsAction
          roomTypeFromParent={roomType}
          customStyles={`bg-yellow-gradient p-2 rounded-[3px] justify-center`}
        />
        <PlusMinusButton
          id={id}
          name={`selectedRooms`}
          value={selectedRooms}
          setValue={updateRoomTypeDetails}
          limit={availableRooms}
        />
      </div>
    </div>
  );
};

export default RoomTypeCard;
