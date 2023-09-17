import {CustomLoadingOverlay, CustomTagWithLabel, PlusMinusButton, RoomTypeDescription} from "./index";
import {toRoomTypeMapper} from "../redux/features/roomTypeSlice";
import {toast} from "react-toastify";
import {useGetRoomTypeByIdMutation, useGetRoomTypeEquipmentMutation} from "../redux/api/roomTypeApiSlice";
import {useEffect, useState} from "react";
import {randomCode} from "../util";

const RoomTypeCard = ({id, availableRooms, selectedRooms, updateRoomTypeDetails}) => {
  const tagCommonBorderStyle = "border-white"
  const tagCommonTextStyle = "text-center sm:text-start"

  const [roomType, setRoomType] = useState({
    id: 0,
    name: "",
    adults: "",
    children: "",
    pricePerHotelNight: "",
    image: "",
    equipment: []
  })

  const [getRoomTypeById, {isLoading: isLoadingRoomType}] = useGetRoomTypeByIdMutation()
  const [getRoomTypeEquipment, {isLoading: isLoadingRoomTypeEquipment}] = useGetRoomTypeEquipmentMutation()

  useEffect(() => {
      const loadRoomType = async () => {
        let result = {}

        try {
          const response = await getRoomTypeById({id}).unwrap()
          result = {...toRoomTypeMapper(response)}

        } catch (error) {
          toast.error("Failed to load room type.")
        }

        try {
          const response = await getRoomTypeEquipment({id}).unwrap()
          result = {...result, equipment: response}
          setRoomType({...roomType, ...result})

        } catch (error) {
          toast.error("Failed to load room type equipment.")
        }
      }

      loadRoomType().then(() => console.log("Loaded room type or room type equipment"))
    }, [getRoomTypeById, getRoomTypeEquipment]
  )

  return isLoadingRoomType || isLoadingRoomTypeEquipment ? (<CustomLoadingOverlay message={"Loading..."}/>) : (
    <div key={`room-type-card-${randomCode(5)}`}
         className="relative flex flex-col gap-5 sm:gap-0 sm:flex-row bg-black-gradient box-shadow w-full rounded-[10px] items-center justify-between p-5">
      <div className="cursor-pointer absolute right-[0] top-[0] mr-5 mt-2 ">
        <RoomTypeDescription id={roomType?.id} pricePerHotelNight={roomType?.pricePerHotelNight} name={roomType?.name}
                             image={roomType?.image} equipment={roomType?.equipment}/>
      </div>
      <p
        className={`font-poppins font-semibold text-white text-xl mt-5 sm:mt-0 text-center sm:text-start w-full sm:w-[18%]`}>{roomType?.name}</p>
      <div className="flex flex-col">
        <div
          className="flex flex-col sm:flex-row border-white border-[1px] rounded-[3px] text-center sm:text-start">
          <CustomTagWithLabel value={availableRooms} label={"Available rooms"} styles={tagCommonTextStyle}/>
          <CustomTagWithLabel value={roomType?.adults} label={"Adults"}
                              styles={`${tagCommonBorderStyle} border-t-[1px] sm:border-t-[0] border-l-[0] sm:border-l-[1px] ${tagCommonTextStyle}`}/>
          <CustomTagWithLabel value={roomType?.children} label={"Children"}
                              styles={`${tagCommonBorderStyle} border-t-[1px] sm:border-t-[0] border-l-[0] sm:border-l-[1px] ${tagCommonTextStyle}`}/>
        </div>
        <div
          className={`flex flex-col sm:flex-row ${tagCommonBorderStyle} border-x-[1px] border-b-[1px] rounded-[3px] ${tagCommonTextStyle}`}>
          <CustomTagWithLabel value={`${roomType?.pricePerHotelNight}€`} label={"Price per hotel night"}
                              styles={tagCommonTextStyle}/>
        </div>
      </div>
      <PlusMinusButton id={id} name={`selectedRooms`} value={selectedRooms} setValue={updateRoomTypeDetails} limit={availableRooms}/>
    </div>
  )
}

export default RoomTypeCard