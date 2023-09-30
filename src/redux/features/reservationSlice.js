import {createSlice} from "@reduxjs/toolkit";
import {transferObjectKeyToLabel} from "../../util";

const reservationSlice = createSlice({
  name: "reservation",
  initialState: {id: null, paymentId: null, charge: null},
  reducers: {
    setReservation: (state, action) => {
      const {id, transactionId, charge} = action.payload
      state.id = id
      state.paymentId = transactionId
      state.charge = charge
    }
  }
})

export const {setReservation} = reservationSlice.actions

export default reservationSlice.reducer

export const selectReservationId = (state) => state.reservation.id

export const selectReservationPaymentId = (state) => state.reservation.paymentId

export const selectReservationCharge = (state) => state.reservation.charge

export const toReservationCreateReqDtoMapper = ({
                                                  userProfileId,
                                                  checkIn,
                                                  checkOut,
                                                  adults,
                                                  children,
                                                  flightNumber,
                                                  roomSelectedList
                                                }) => {
  return {
    user_profile_id: userProfileId,
    check_in: checkIn,
    check_out: checkOut,
    adults: adults,
    children: children,
    flight_number: flightNumber,
    room_selected_list: roomSelectedList
  }
}

export const toReservationCreateResDtoMapper = (res) => {
  return {
    id: res.id,
    checkIn: res.check_in,
    checkOut: res.check_out,
    adults: res.adults,
    children: res.children,
    flightId: res.flight.id,
    paymentId: res.payment.id,
    cost: res.payment.cost
  }
}

export const toReservationTableMapper = (res) => {
  let columnList = []
  const rowList = res.map((reservation, index) => {
    if (index === 0) {
      columnList = Object.keys(reservation).filter(key => key !== "user_profile").map(key => transferObjectKeyToLabel(key))
    }

    return Object.entries(reservation).map(([key, value]) => {
      if (key === "user_profile") {
        return {name: transferObjectKeyToLabel(key), value: ""}
      }
      if (key === "flight") {
        return {name: transferObjectKeyToLabel(key), value: value !== null ? value.flight_number : "-"}
      }

      if (key === "payment") {
        value = value.status
      }

      return {name: transferObjectKeyToLabel(key), value: value}
    })
  })

  return {columnList, rowList}
}