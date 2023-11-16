import { useEffect, useState } from 'react';
import { doubleArrow } from '../../../assets';
import { useGetRoomDetailsListByFloorMutation } from '../../../redux/api/roomApiSlice';
import { toRoomDetailsListMapper } from '../../../redux/features/room/roomMapper';
import { RoomDetailsAction } from '../../../components';

const RoomNumberList = ({ floor }) => {
  const start = 0;
  const size = 10;
  const emptyRoomDetails = {
    number: 0,
    floor: floor,
    roomTypeName: '',
    roomTypeShortcut: '',
    occupied: null,
    reservationId: null,
    checkIn: null,
    checkOut: null,
    email: null,
    empty: true,
  };

  const [roomList, setRoomList] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [getRoomDetailsListByFloor] = useGetRoomDetailsListByFloorMutation();

  useEffect(() => {
    const loadRoomDetailsList = async () => {
      setLoading(true);
      try {
        const filters = { page, size };
        const response = await getRoomDetailsListByFloor({ floor, filters }).unwrap();
        if (response.length < 1) {
          setPage(page - 1);
        } else {
          full(toRoomDetailsListMapper(response));
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log('Failed to load room details list');
      }
    };

    loadRoomDetailsList().then(() => console.log('Loaded room details list'));
  }, [floor, page, getRoomDetailsListByFloor]);

  const full = (response) => {
    let newRoomList = response ?? roomList;
    for (let i = newRoomList.length; i < start + size; i++) {
      const newRoom = { ...emptyRoomDetails, number: i + 1 };
      newRoomList.push(newRoom);
    }
    setRoomList(newRoomList);
  };

  return (
    <div
      key={`room-number-list-floor-${page}-${floor}`}
      className={`w-full h-[725px] xs:h-[350px] sm:h-auto sm:max-w-[75%] border-white border-[1px] rounded-[4px] box-shadow`}>
      {loading ? (
        <div
          key={`room-number-list-loading-overlay`}
          className={`w-full h-full flex flex-col justify-center items-center`}>
          <span className={`font-poppins text-white text-sm`}>Loading rooms ...</span>
        </div>
      ) : (
        <div className={'w-full h-full flex flex-col justify-between'}>
          <div className={`w-full h-[40%] flex flex-wrap`}>
            {roomList.slice(start, size / 2).map((room, index) => (
              <RoomDetailsAction {...room} isLast={index === size / 2 - 1} isTop={true} />
            ))}
          </div>
          <div className={`w-full flex flex-wrap justify-between px-4`}>
            <img
              src={doubleArrow}
              alt={`double-arrow-previous`}
              className={`w-[20px] h-auto rotate-180 cursor-pointer ${
                page === 0 ? 'invisible' : ''
              }`}
              onClick={() => setPage(page > 0 ? page - 1 : 0)}
            />
            <img
              src={doubleArrow}
              alt={`double-arrow-next`}
              className={`w-[20px] h-auto cursor-pointer`}
              onClick={() => setPage(page + 1)}
            />
          </div>
          <div className={`w-full h-[40%] flex flex-wrap`}>
            {roomList.slice(start + size / 2, size).map((room, index) => (
              <RoomDetailsAction {...room} isLast={index === size / 2 - 1} isTop={false} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomNumberList;
