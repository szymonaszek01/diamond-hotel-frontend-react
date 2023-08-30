import styles from "../style";
import {arrowRightBlack, close, defaultUser, information, messageBlack} from "../assets";
import {useSelector} from "react-redux";
import {selectUserDetails} from "../redux/features/userSlice";
import {ToastContainer} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

const DashboardUserDetailsCard = ({allRequiredData}) => {
  const userDetails = useSelector(selectUserDetails)
  const navigate = useNavigate()
  const [warning, setWarning] = useState(true)

  return (
    <div className={`${styles.boxWidth}`}>
      <ToastContainer className={"toast-style"}/>
      <p className={`flex font-poppins mt-11 sm:mt-0 text-white text-[18px] leading-[30.8px] font-bold`}>What's
        up, {userDetails?.firstname}?</p>
      <div className="flex flex-col sm:flex-row sm:text-start justify-between w-full">
        <h2 className={`flex mt-1 sm:mt-0 font-poppins font-bold text-[28px] text-gradient items-center`}>
          Book your dream room now</h2>
        <button className={`${styles.button} mt-4 sm:mt-0`}>Add reservation</button>
      </div>
      <div className="bg-black-gradient rounded-[10px] box-shadow w-full mt-7">
        <div className={`${allRequiredData || !warning ? 'hidden' : ''} p-5`}>
          <div className="text-white p-5 flex flex-col box-shadow justify-center items-start gap-5 rounded-[10px]">
            <div className="flex flex-col sm:flex-row justify-center sm:justify-end items-center w-full">
              <img src={close} alt="close" className="w-[17px] h-auto cursor-pointer"
                   onClick={() => setWarning(false)}/>
            </div>
            <div className="flex flex-col sm:flex-row justify-center sm:justify-start items-center gap-5 w-full">
              <img src={information} alt="information" className="w-[40px] h-auto"/>
              <p className={`${styles.paragraph} text-sm text-white break-all`}>Please, fill all required data to in
                your <span className={`${styles.paragraph} text-sm font-semibold text-white cursor-pointer break-all`}
                           onClick={() => navigate("/edit-profile")}>user profile</span> to get full access.</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-start gap-8 p-5 items-center sm:items-start">
          <div className={`rounded-[10px] h-auto ${userDetails?.picture ? '' : 'p-5 box-shadow'} w-[100px]`}>
            <img src={userDetails?.picture ? "data:image/png;base64," + userDetails?.picture : defaultUser}
                 className={`${userDetails?.picture ? 'rounded-[10px]' : ''}`} alt="user-profile-img"/>
          </div>
          <div className="flex flex-col justify-center items-center sm:items-start">
            <p className={`font-poppins text-[13.5px] text-white break-all sm:mt-0`}>{userDetails?.role}</p>
            <p
              className={`font-poppins text-[20px] text-gradient font-bold break-all mt-1`}>{userDetails?.firstname} {userDetails?.lastname}</p>
            <p className={`font-poppins text-[13.5px] text-white break-all mt-1`}>{userDetails?.email}</p>
            <a href="/edit-profile" className={`${styles.button} mt-4`}>Edit profile</a>
          </div>
        </div>
        <div
          className="mt-3 p-5 flex flex-col justify-start items-center sm:items-start gap-5 bg-black-gradient rounded-b-[10px]">
          <p className={`font-poppins text-[13.5px] text-white break-all`}>Before your arrival</p>
          <div
            className={`flex flex-col sm:flex-row justify-between bg-yellow-gradient items-center text-center sm:text-start rounded-[10px] py-3 px-4 message-button w-full cursor-pointer gap-3 sm:gap-0`}>
            <img id="message" className="w-[23px] h-[23px] object-contain" src={messageBlack} alt="message"/>
            <p className={`font-poppins text-[16px] break-all text-black`}>Please let us know about special
              requests</p>
            <img id="arrow-right" src={arrowRightBlack} alt="arrow-up" className="w-[23px] h-[23px] object-contain"/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardUserDetailsCard