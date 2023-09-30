import styles from "../../style";
import {Footer, Navbar, PageFormSelector, ReservationForm, ReservedRoomForm, TransactionForm} from "../../components";
import {privateNavLinks} from "../../constants";
import {useState} from "react";

const ReservationPage = () => {
  const navConfig = {
    page: "Reservation list",
    isToggled: true,
    navbarLinks: privateNavLinks,
    logoWhite: true,
    textWhite: true
  }

  const [optionList, setOptionList] = useState([
    {
      id: 0,
      label: "Reservations",
      value: 0,
      isSelected: true
    },
    {
      id: 1,
      label: "Reserved rooms",
      value: 0,
      isSelected: false
    },
    {
      id: 2,
      label: "Transactions",
      value: 0,
      isSelected: false
    }
  ])

  const renderPageForm = () => {
    const selectedOption = optionList.find(option => option.isSelected)
    if (selectedOption.label === "Reservations") {
      return <ReservationForm/>
    } else if (selectedOption.label === "Reserved rooms") {
      return <ReservedRoomForm/>
    } else {
      return <TransactionForm/>
    }
  }

  return (
    <div className={`${styles.page}`}>
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar {...navConfig} />
        </div>
      </div>
      <div className="flex flex-col w-full items-center justify-center mt-8">
        <div className={"flex flex-col items-center text-center sm:text-start sm:items-start justify-center w-[60%] gap-8"}>
          <PageFormSelector optionList={optionList} setOptionList={setOptionList} cardWidth={"200px"}/>
          <p className={`text-sm text-white font-poppins font-thin ml-2 leading-8`}>
            <strong className={"text-2xl font-semibold"}>Your Reservations</strong><br/>Welcome to your reservation
            list.
            Here, you can view and manage all your upcoming reservations with Diamond hotel. Whether you're checking in,
            making changes, or need more details about your bookings, it's all right here.</p>
          <p className={`text-sm text-white font-poppins font-thin ml-2 leading-8`}>
            <strong className={"text-2xl font-semibold"}>Manage Your Reservations</strong><br/>For each reservation
            listed, you'll have options to manage your booking. Here are some common actions:

            <ul>
              <li className={"li-circle"}><strong className={"text-sm font-semibold text-gradient"}>View
                Details:</strong> Click to see all the details of your reservation, including room types, special
                requests, and pricing information.
              </li>
              <li className={"li-circle"}><strong className={"text-sm font-semibold text-gradient"}>Modify
                Reservation:</strong> If you need to change your check-in or check-out dates, update guest information,
                or make other modifications, you can do so through the "Modify Reservation" link.
              </li>
              <li className={"li-circle"}><strong className={"text-sm font-semibold text-gradient"}>Cancel
                Reservation:</strong> If your plans have changed and you need to cancel a reservation, you can do so by
                clicking on the "Cancel Reservation" link.
              </li>
            </ul>
          </p>
          {renderPageForm()}
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default ReservationPage