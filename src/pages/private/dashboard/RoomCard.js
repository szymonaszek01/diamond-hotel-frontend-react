import RoomFloorList from './RoomFloorList';
import RoomNumberList from './RoomNumberList';
import { useEffect, useState } from 'react';
import { useGetRoomFloorListMutation } from '../../../redux/api/roomApiSlice';
import { toRoomFloorListMapper } from '../../../redux/features/room/roomMapper';

const RoomCard = () => {
  const [roomFloorList, setRoomFloorList] = useState([]);
  const [getRoomFloorList] = useGetRoomFloorListMutation();

  useEffect(() => {
    const loadRoomFloorList = async () => {
      try {
        const response = await getRoomFloorList().unwrap();
        setRoomFloorList(toRoomFloorListMapper(response));
      } catch (error) {
        console.log('Failed to load room floor list');
      }
    };

    loadRoomFloorList().then(() => console.log('Loaded room floor list'));
  }, [getRoomFloorList]);

  const onRoomFloorClick = (e) => {
    e.preventDefault();
    const selectedFloor = Number.parseInt(e.target.innerText);
    const newRoomFloorList = roomFloorList.map((roomFloor) => {
      return {
        value: roomFloor.value,
        selected: roomFloor.value === selectedFloor,
      };
    });
    setRoomFloorList(newRoomFloorList);
  };

  return (
    <div
      key={`room-card`}
      className={`bg-black-gradient w-full flex flex-wrap justify-between gap-8 box-shadow p-8 rounded-[10px]`}>
      <p
        className={`text-center sm:text-start flex flex-col gap-2 text-sm text-dimWhite font-poppins font-thin leading-10 sm:leading-8`}>
        <span className={'text-3xl font-semibold text-white leading-[50px] sm:leading-8'}>
          Browse Rooms
        </span>
        <span>
          Explore and manage the rooms available in your property. Click on a room to view details.
          You can download a detailed PDF report for each reserved room by clicking on the room
          number.
        </span>
      </p>
      <div
        key={`room-card-floor-${roomFloorList.find((roomFloor) => roomFloor.selected)?.value ?? 0}`}
        className={`w-full flex flex-wrap justify-between gap-8`}>
        <RoomFloorList roomFloorList={roomFloorList} onRoomFloorClick={onRoomFloorClick} />
        <RoomNumberList floor={roomFloorList.find((roomFloor) => roomFloor.selected)?.value ?? 0} />
      </div>
    </div>
  );
};

export default RoomCard;
