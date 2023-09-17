import styles from "../../style";
import {FindRoomForm, Footer, Navbar, RoomTypeCard, SelectedRoomsSummaryCard} from "../../components";
import {privateNavLinks} from "../../constants";
import {useState} from "react";
import {randomCode} from "../../util";

const FindRoomPage = () => {
  const navConfig = {
    page: "Find room",
    isToggled: true,
    navbarLinks: privateNavLinks,
    logoWhite: true,
    textWhite: true
  }

  const [roomTypeDetailsList, setRoomTypeDetailsList] = useState([])

  const isRoomTypeDetailsListEmpty = () => {
    return roomTypeDetailsList.length < 1
  }

  const updateRoomTypeDetails = ({id, selectedRooms, cost}) => {
    const updatedRoomTypeDetails = roomTypeDetailsList.find(roomTypeDetails => roomTypeDetails.id === id)
    const newRoomTypeDetailsList = roomTypeDetailsList.filter(roomTypeDetails => roomTypeDetails.id !== id)

    if (selectedRooms !== null && selectedRooms !== undefined && selectedRooms !== updatedRoomTypeDetails.selectedRooms) {
      updatedRoomTypeDetails.selectedRooms = selectedRooms
    }
    if (cost !== null && cost !== undefined && cost !== updatedRoomTypeDetails.cost) {
      updatedRoomTypeDetails.cost = cost
    }

    newRoomTypeDetailsList.push(updatedRoomTypeDetails)
    newRoomTypeDetailsList.sort((obj1, obj2) => obj1.id - obj2.id)
    setRoomTypeDetailsList(newRoomTypeDetailsList)
  }

  const findRoomTypeDetailsWithAvailableRooms = () => {
    return roomTypeDetailsList.filter(roomTypeDetails => roomTypeDetails.availableRooms > 0)
  }

  return (
    <div className={`${styles.page}`}>
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar {...navConfig} />
        </div>
      </div>
      <div className="flex w-full items-center justify-center">
        <div
          className={`flex ${isRoomTypeDetailsListEmpty() ? "flex-col justify-center items-center" : "flex-col sm:flex-row gap-16 sm:gap-28 w-[80%]"} min-h-[75vh] relative z-99`}>
          <div
            className={`${isRoomTypeDetailsListEmpty() ? "w-[80%] flex flex-col sm:flex-row items-center" : "w-full flex flex-col items-start mt-16"} gap-16 ${isRoomTypeDetailsListEmpty() ? "sm:gap-28" : "sm:gap-16"}`}>
            <FindRoomForm setRoomTypeDetailsList={setRoomTypeDetailsList}
                          filters={!isRoomTypeDetailsListEmpty()}/>
            {isRoomTypeDetailsListEmpty() ? (
              <div key={`content-${randomCode(4)}`} className="flex flex-col gap-1 w-full text-center sm:text-start">
                <h2 className={styles.heading2}>Welcome to Our Booking Page</h2>
                <p className={styles.paragraph}>
                  We're thrilled that you've chosen to book your stay with us! At Diamond Hotel, we're committed to
                  providing you with a comfortable and memorable experience. Please use the booking form below to
                  reserve your room.</p>
              </div>) : (<div key={`content-${randomCode(4)}`}
                              className={`flex flex-col items-start w-full gap-16`}>
              {findRoomTypeDetailsWithAvailableRooms().map(roomTypeDetails =>
                <RoomTypeCard id={roomTypeDetails.id}
                              availableRooms={roomTypeDetails.availableRooms}
                              selectedRooms={roomTypeDetails.selectedRooms}
                              updateRoomTypeDetails={updateRoomTypeDetails}/>)}
            </div>)}
          </div>
          <SelectedRoomsSummaryCard
            roomTypeDetailsList={roomTypeDetailsList}
            active={isRoomTypeDetailsListEmpty()}
            updateRoomTypeDetails={updateRoomTypeDetails}
          />
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default FindRoomPage