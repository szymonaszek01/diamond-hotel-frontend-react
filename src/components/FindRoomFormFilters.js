import styles from "../style";
import Popup from "reactjs-popup";
import {CustomLoadingOverlay, CustomSelectComponent, CustomStandardInput} from "./index";
import {useEffect, useState} from "react";
import {inputsInfo} from "../constants";
import {filtersIcon} from "../assets";
import {toast, ToastContainer} from "react-toastify";
import {useGetRoomTypeListMutation} from "../redux/api/roomTypeApiSlice";
import {toRoomTypeSelectMapper} from "../redux/features/roomTypeSlice";

const FindRoomFormFilters = ({onSave}) => {
  const [filters, setFilters] = useState({
    names: {...inputsInfo.roomType.names, value: '', options: [], selected: []},
    pricePerHotelNight: {...inputsInfo.roomType.pricePerHotelNight, value: 0}
  })
  const [error, setError] = useState(false)
  const [getRoomTypeList, {isLoading}] = useGetRoomTypeListMutation()

  const onInputChange = (name, value) => {
    const result = Object.values(filters).find(input => input.name === name)

    setError(false)

    setFilters({
      ...filters,
      [name]: {...result, value: value}
    })
  }

  useEffect(() => {
      const loadRoomTypeList = async () => {

        try {
          const response = await getRoomTypeList().unwrap()
          setFilters({...filters, names: {...filters.names, options: toRoomTypeSelectMapper(response)}})

        } catch (error) {
          setError(true)
          toast.error("Failed to load room types")
        }
      }

      loadRoomTypeList().then(() => console.log("Loaded room type list"))
    }, [getRoomTypeList]
  )

  return isLoading ? (<CustomLoadingOverlay message={"Loading..."}/>) : (
    <div key={`room-filters`}>
      <ToastContainer className={"toast-style"}/>
      <Popup
        trigger={<button
          className="flex items-center justify-center p-2 border-white border-[1px] rounded-[3px] gap-2">
          <img src={filtersIcon} alt="filters" className="w-[14px] h-auto"/>
          <p className="font-poppins font-thin text-xs text-white">Filters</p>
        </button>} modal nested>
        {close => (
          <div className="flex flex-col bg-transparent rounded-[10px] items-center justify-center">
            <div className="w-[60%] bg-black-gradient box-shadow rounded-[10px] p-5 flex flex-col gap-5">
              <div className="flex flex-col gap-5 w-full">
                <CustomStandardInput attributes={filters.pricePerHotelNight} error={error}
                                     onChange={(e) => onInputChange(e.target.name, e.target.value)} label={true}/>
                <CustomSelectComponent attributes={filters.names} error={error}
                                       onChange={(newValue) => onInputChange(filters.names.name, newValue)}
                                       label={true}/>
              </div>
              <div className="flex flex-col sm:flex-row gap-5">
                <button className={`${styles.button} text-black`} onClick={(e) => {
                  close()
                  onSave({
                    pricePerHotelNight: {
                      value: filters.pricePerHotelNight.value,
                      label: filters.pricePerHotelNight.value + "€"
                    },
                    roomTypeIdList: filters.names.value ?? []
                  })
                }}>Save
                </button>
                <button className={`${styles.button} text-black`} onClick={() => close()}>Close</button>
              </div>
            </div>
          </div>
        )}
      </Popup>
    </div>
  )
}

export default FindRoomFormFilters