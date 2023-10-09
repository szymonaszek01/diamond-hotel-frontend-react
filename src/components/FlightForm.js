import {ButtonWithIcon, CustomStandardInput, PaymentForm} from "./index";
import styles from "../style";
import Popup from "reactjs-popup";
import {useState} from "react";
import {inputsInfo} from "../constants";
import {back} from "../assets";

const FlightForm = ({reservationDetails, updateReservationDetails, roomSelectedList}) => {
  const [form, setForm] = useState({
    flightNumber: {...inputsInfo.flight.flightNumber, value: ""}
  })

  const onInputChange = (e) => {
    setForm({...form, flightNumber: {...form.flightNumber, value: e.target.value}})
    updateReservationDetails(e.target.name, e.target.value)
  }

  return (
    <Popup
      trigger={<button className={`${styles.button} w-full`}>Book&Pay</button>} modal nested closeOnDocumentClick={false}>
      {close => (
        <div className="flex bg-flight-form-image rounded-[10px]">
          <div
            className="flex flex-col w-full bg-[#00000088] rounded-[10px] items-start justify-between p-5 gap-5">
            <div
              className="flex flex-col sm:flex-row justify-start sm:justify-between items-center h-[100%] border-b-[1px] border-white w-full gap-5 sm:gap-16">
              <div className="flex flex-col w-full sm:w-[70%]">
                <CustomStandardInput attributes={form.flightNumber} placeholder={false} autoComplete={false}
                                     label={true}
                                     error={false}
                                     onChange={onInputChange}/>
              </div>
              <div className="flex flex-col w-full sm:w-[80%] text-center sm:text-start mb-5">
                <h2 className="font-poppins font-semibold text-white text-[25px] xs:text-[40px] w-full break-words">Flight number</h2>
                <p className="xs:hidden font-poppins font-normal text-white text-[15px] mt-1">If you prefer not to provide your flight number,
                  simply click the "Pay" button to complete your booking.</p>
                <p className={`hidden xs:block font-poppins font-normal text-white text-[15px] mt-1`}>To ensure a smooth and hassle-free
                  experience, please provide your flight details below. While providing your flight number is optional,
                  it can help us better assist you during your journey. If you prefer not to provide your flight number,
                  simply click the "Pay" button to complete your booking.</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row w-full items-center justify-start xs:justify-end gap-5">
              <ButtonWithIcon img={back} imgWidth={"20px"} imgAlt={"back"} text={"Back"} action={close}/>
              <PaymentForm reservationDetails={reservationDetails} roomSelectedList={roomSelectedList}/>
            </div>
          </div>
        </div>
      )}
    </Popup>
  )
}

export default FlightForm