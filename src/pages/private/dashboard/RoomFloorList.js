const RoomFloorList = ({ roomFloorList, onRoomFloorClick }) => {
  return (
    <div
      key={`room-floor-list`}
      className={`w-full min-h-[400px] cursor-pointer sm:max-w-[15%] flex flex-wrap border-white border-[1px] rounded-[4px] box-shadow text-center`}>
      <span
        className={`w-full flex justify-center items-center font-poppins text-white text-base p-4 'border-white border-b-[1px]`}>
        Floor
      </span>
      {roomFloorList.map((roomFloor, index) => (
        <span
          className={`w-full flex justify-center items-center font-poppins text-base p-4 text-center ${
            index < roomFloorList.length - 1 ? 'border-white border-b-[1px]' : ''
          } ${roomFloor.selected ? 'bg-yellow-gradient text-black' : 'text-white'}`}
          onClick={onRoomFloorClick}>
          {roomFloor.value}
        </span>
      ))}
    </div>
  );
};

export default RoomFloorList;
