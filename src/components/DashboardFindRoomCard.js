import styles from "../style";
import {useSelector} from "react-redux";
import {selectUserDetails} from "../redux/features/userSlice";

const DashboardFindRoomCard = () => {
  const userDetails = useSelector(selectUserDetails)

  return (
    <div className="flex flex-col items-center sm:items-start justify-center gap-4">
      <div className="flex flex-col text-center sm:text-start justify-between w-full">
        <p className={`text-sm text-white font-poppins font-thin leading-8`}>
          <strong className={"text-2xl font-semibold"}>Book your dream room</strong><br/>Discover a world of comfort, luxury, and relaxation at Diamond hotel. Our doors are open, and we're ready to make your stay unforgettable.</p>
      </div>
      <a href="/find-room" className={`${styles.button} items-center text-center box-shadow text-sm p-3 box-shadow`}>Book a room</a>
    </div>
  )
}

export default DashboardFindRoomCard