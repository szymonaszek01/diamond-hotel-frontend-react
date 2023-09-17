import {useGetRoomSelectedCostMutation} from "../redux/api/roomApiSlice";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import {CustomLoadingOverlay} from "./index";
import {randomCode} from "../util";
import {toRoomSelectedCostMapper} from "../redux/features/roomSlice";
import styles from "../style";

const RoomSelectedCost = ({checkIn, checkOut, rooms, roomTypeId, updateRoomTypeDetails}) => {
  const [getRoomSelectedCost, {isLoading}] = useGetRoomSelectedCostMutation()
  const [roomSelectedCost, setRoomSelectedCost] = useState({
    name: "",
    cost: 0
  })

  useEffect(() => {
      const loadRoomSelectedCost = async () => {
        try {
          const response = await getRoomSelectedCost({checkIn, checkOut, rooms, roomTypeId}).unwrap()
          const updatedRoomSelectedCost = toRoomSelectedCostMapper(response)
          setRoomSelectedCost({...roomSelectedCost, ...updatedRoomSelectedCost})
          updateRoomTypeDetails({id: roomTypeId, cost: updatedRoomSelectedCost.cost})

        } catch (error) {
          toast.error("Failed to load room selected cost.")
        }
      }

      loadRoomSelectedCost().then(() => console.log("Failed to load room selected cost."))
    }, [checkIn, checkOut, rooms, roomTypeId, getRoomSelectedCost]
  )

  return isLoading ? (<CustomLoadingOverlay message={"Loading..."}/>) : (
    <div key={`room-selected-cost-${randomCode(5)}`} className="flex flex-row items-center justify-between">
      <p className="font-poppins font-thin text-gradient text-xs">{roomSelectedCost.name}</p>
      <p className="font-poppins font-thin text-white text-xs">{roomSelectedCost.cost}€</p>
    </div>
  )
}

const SelectedRoomsSummaryCard = ({roomTypeDetailsList, updateRoomTypeDetails, active}) => {
  const getTotal = () => {
    let sum = 0
    for (const roomTypeDetails of roomTypeDetailsList) {
      sum += roomTypeDetails.cost
    }

    return sum
  }

  return (
    <div
      className={`${active ? "hidden" : ""} p-5 flex flex-col w-full sm:w-[400px] h-[100%] bg-black-gradient box-shadow rounded-[10px] mt-0 sm:mt-16 gap-5`}>
      <h2 className="font-poppins font-semibold text-white text-sm pb-2 border-b-[1px]">Summary</h2>
      {roomTypeDetailsList?.map(roomTypeDetails => <RoomSelectedCost
        checkIn={roomTypeDetails.checkIn.toISOString().split("T")?.at(0)}
        checkOut={roomTypeDetails.checkOut.toISOString().split("T")?.at(0)}
        rooms={roomTypeDetails.selectedRooms}
        roomTypeId={roomTypeDetails.id}
        updateRoomTypeDetails={updateRoomTypeDetails}/>)}
      <div className="flex flex-col sm:flex-row justify-between items-center border-t-[1px] pt-2">
        <h2 className="font-poppins font-semibold text-white text-sm">Total</h2>
        <h2 className="font-poppins font-semibold text-white text-sm">{getTotal()}€</h2>
      </div>
      <button className={`${styles.button} mt-5`}>
        Pay
      </button>
    </div>
  )
}

export default SelectedRoomsSummaryCard