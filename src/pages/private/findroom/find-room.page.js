import styles from '../../../style';
import { privateNavLinks } from '../../../constants';
import { useState } from 'react';
import { getCurrentDate, randomCode } from '../../../util';
import { useSelector } from 'react-redux';
import { selectFullAccess } from '../../../redux/features/auth/authSlice';
import { Footer, Navbar } from '../../../components';
import FindRoomForm from './FindRoomForm';
import RoomTypeCard from './RoomTypeCard';
import SelectedRoomsSummaryCard from './SelectedRoomsSummaryCard';

const FindRoomPage = () => {
  const fullAccess = useSelector(selectFullAccess);

  const navConfig = {
    page: 'Find room',
    isToggled: true,
    navbarLinks: privateNavLinks,
    logoWhite: true,
    textWhite: true,
    fullAccess: fullAccess,
  };

  const [reservationDetails, setReservationDetails] = useState({
    checkIn: getCurrentDate(1),
    checkOut: getCurrentDate(6),
    adults: 0,
    children: 0,
    flightNumber: '',
  });
  const [roomTypeDetailsList, setRoomTypeDetailsList] = useState([]);

  const isRoomTypeDetailsListEmpty = () => {
    return roomTypeDetailsList.length < 1;
  };

  const updateReservationDetails = (name, value) => {
    if (Object.keys(reservationDetails).find((key) => key === name)) {
      setReservationDetails({ ...reservationDetails, [name]: value });
    }
  };

  const updateRoomTypeDetails = ({ id, selectedRooms, cost }) => {
    const updatedRoomTypeDetails = roomTypeDetailsList.find(
      (roomTypeDetails) => roomTypeDetails.id === id
    );
    const newRoomTypeDetailsList = roomTypeDetailsList.filter(
      (roomTypeDetails) => roomTypeDetails.id !== id
    );

    if (
      selectedRooms !== null &&
      selectedRooms !== undefined &&
      selectedRooms !== updatedRoomTypeDetails.selectedRooms
    ) {
      updatedRoomTypeDetails.selectedRooms = selectedRooms;
    }
    if (cost !== null && cost !== undefined && cost !== updatedRoomTypeDetails.cost) {
      updatedRoomTypeDetails.cost = cost;
    }

    newRoomTypeDetailsList.push(updatedRoomTypeDetails);
    newRoomTypeDetailsList.sort((obj1, obj2) => obj1.id - obj2.id);
    setRoomTypeDetailsList(newRoomTypeDetailsList);
  };

  const findRoomTypeDetailsWithAvailableRooms = () => {
    return roomTypeDetailsList.filter((roomTypeDetails) => roomTypeDetails.availableRooms > 0);
  };

  return (
    <div className={`${styles.page} px-6 sm:px-16`}>
      <div className={`${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar {...navConfig} />
        </div>
      </div>
      <div className="flex w-full items-center justify-center mb-16">
        <div
          className={`flex ${
            isRoomTypeDetailsListEmpty()
              ? 'flex-col justify-center items-center'
              : 'flex-col sm:flex-row gap-16 sm:gap-28 w-[80%]'
          } min-h-[75vh] relative z-99`}>
          <div
            className={`${
              isRoomTypeDetailsListEmpty()
                ? 'w-[80%] flex flex-col sm:flex-row items-center'
                : 'w-full flex flex-col items-start'
            } mt-16 gap-16 ${isRoomTypeDetailsListEmpty() ? 'sm:gap-28' : 'sm:gap-16'}`}>
            <FindRoomForm
              updateReservationDetails={updateReservationDetails}
              setRoomTypeDetailsList={setRoomTypeDetailsList}
              filters={!isRoomTypeDetailsListEmpty()}
            />
            {isRoomTypeDetailsListEmpty() ? (
              <div
                key={`content-${randomCode(4)}`}
                className="flex flex-col gap-1 w-full text-center sm:text-start">
                <p
                  className={`flex flex-col text-sm text-dimWhite font-poppins font-thin leading-10 sm:leading-8 gap-5 break-words`}>
                  <span className={'text-5xl font-semibold text-white leading-[65px]'}>
                    Welcome to Our Booking Page
                  </span>
                  <span>
                    We're pleasant that you've chosen our hotel to spend your free time! At Diamond
                    Hotel, we're responsible for providing you memorable experience and emotions.
                    Use booking form to find available rooms.
                  </span>
                </p>
              </div>
            ) : (
              <div
                key={`content-${randomCode(4)}`}
                className={`flex flex-col items-start w-full gap-16`}>
                {findRoomTypeDetailsWithAvailableRooms().map((roomTypeDetails) => (
                  <RoomTypeCard
                    id={roomTypeDetails.id}
                    availableRooms={roomTypeDetails.availableRooms}
                    selectedRooms={roomTypeDetails.selectedRooms}
                    updateRoomTypeDetails={updateRoomTypeDetails}
                  />
                ))}
              </div>
            )}
          </div>
          <SelectedRoomsSummaryCard
            roomTypeDetailsList={roomTypeDetailsList}
            reservationDetails={reservationDetails}
            updateRoomTypeDetails={updateRoomTypeDetails}
            updateReservationDetails={updateReservationDetails}
            active={isRoomTypeDetailsListEmpty()}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FindRoomPage;
