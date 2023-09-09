import styles from "../style";
import {useSelector} from "react-redux";
import {selectUserDetails} from "../redux/features/userSlice";

const DashboardFindRoomCard = () => {
  const userDetails = useSelector(selectUserDetails)

  return (
    <div className="flex flex-col bg-black-gradient sm:flex-row rounded-[10px] box-shadow p-5 gap-1">
      <div className="flex flex-col sm:text-start justify-between w-full">
        <p className={`flex font-poppins sm:mt-0 text-white text-xs font-thin`}>What's
          up, {userDetails?.firstname}?</p>
        <h2 className={`flex sm:mt-0 font-poppins font-bold text-[28px] text-gradient items-center`}>
          Book your dream room now</h2>
      </div>
      <a href="/find-room" className={`${styles.button} flex items-center text-center box-shadow text-xs`}>Book a room</a>
    </div>
  )
}

export default DashboardFindRoomCard