import styles from "../style";
import DatePicker from "react-datepicker";
import {useState} from "react";
import {inputsInfo} from "../constants";
import {CustomLoadingOverlay, CustomStandardInput} from "./index";
import {useGetRoomAvailabilityListMutation} from "../redux/api/roomApiSlice";
import {toast} from "react-toastify";

const FindRoomForm = () => {
  const [form, setForm] = useState({
    checkIn: {...inputsInfo.roomType.checkIn, value: new Date(), hidden: true},
    checkOut: {...inputsInfo.roomType.checkOut, value: new Date(), hidden: true},
    rooms: {...inputsInfo.roomType.rooms, value: ''},
    adults: {...inputsInfo.roomType.adults, value: ''},
    children: {...inputsInfo.roomType.children, value: ''},
  })
  const [error, setError] = useState(false)
  const [getRoomAvailabilityList, {isLoading}] = useGetRoomAvailabilityListMutation()

  const checkAvailabilityOnClick = async (e) => {
    e.preventDefault()

    try {
      const response = await getRoomAvailabilityList({
        checkIn: form.checkIn.value.toISOString().split("T")?.at(0),
        checkOut: form.checkOut.value.toISOString().split("T")?.at(0),
        rooms: form.rooms.value,
        adults: form.adults.value,
        children: form.children.value,
        roomTypeIdList: null,
        pricePerHotelNight: null
      }).unwrap()
      console.log(response)

    } catch (error) {
      setError(true)
      toast.error("Required number of rooms is not found with this filters")
    }
  }

  const onInputChange = (name, value) => {
    const result = Object.values(form).find(input => input.name === name)

    setError(false)

    setForm({
      ...form,
      [name]: {...result, value: value ?? new Date()}
    })
  }

  return isLoading ? (<CustomLoadingOverlay message={"Loading..."}/>) : (
    <div className="flex flex-col border-white border-[1px] rounded-[10px] box-shadow p-5 w-full gap-5 sm:gap-10">
      <div className="flex flex-col sm:flex-row justify-between items-center w-full gap-5">
        <input className={`${styles.input} ${form.checkIn.hidden ? "" : "custom-hidden"} w-full`}
               placeholder={form.checkIn.label} onClick={() => {
          setForm({
            ...form,
            checkIn: {...form.checkIn, hidden: false}
          })
        }}/>
        <div className={`${form.checkIn.hidden ? "custom-hidden" : ""} w-full`}>
          <DatePicker className={`${styles.input} ${error ? styles.error : ''} w-full`}
                      selected={form?.checkIn?.value}
                      onChange={(date) => onInputChange(form.checkIn.name, date)}/>
        </div>
        <input className={`${styles.input} ${form.checkOut.hidden ? "" : "custom-hidden"} w-full`}
               placeholder={form.checkOut.label} onClick={() => {
          setForm({
            ...form,
            checkOut: {...form.checkOut, hidden: false}
          })
        }}/>
        <div className={`${form.checkOut.hidden ? "custom-hidden" : ""} w-full`}>
          <DatePicker className={`${styles.input} ${error ? styles.error : ''} w-full`}
                      selected={form?.checkOut?.value}
                      onChange={(date) => onInputChange(form.checkOut.name, date)}/>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center w-full gap-5">
        <CustomStandardInput attributes={form.rooms} error={error}
                             onChange={(e) => onInputChange(e.target.name, e.target.value)} placeholder={true}/>
        <CustomStandardInput attributes={form.adults} error={error}
                             onChange={(e) => onInputChange(e.target.name, e.target.value)} placeholder={true}/>
        <CustomStandardInput attributes={form.children} error={error}
                             onChange={(e) => onInputChange(e.target.name, e.target.value)} placeholder={true}/>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center w-full gap-5">
        <button className={`bg-white rounded-[10px] font-poppins p-2 cursor-pointer text-sm box-shadow outline-0`}
                onClick={checkAvailabilityOnClick}>Check availability
        </button>
      </div>
    </div>
  )
}

export default FindRoomForm