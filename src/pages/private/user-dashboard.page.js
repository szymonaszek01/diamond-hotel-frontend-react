import styles from "../../style";
import {useGetUserDetailsMutation} from "../../redux/api/userApiSlice";
import {isConfirmed, selectUserId, setConfirmation} from "../../redux/features/authSlice";
import {useDispatch, useSelector} from "react-redux";
import {setUserDetails, toUserDetailsResMapper} from "../../redux/features/userSlice";
import {useEffect} from "react";
import {privateNavLinks} from "../../constants";
import {AccountNotConfirmed, CustomLoadingOverlay, DashboardUserDetailsCard, Footer, Navbar} from "../../components";

const UserDashboardPage = () => {
  const [getUserDetails, {isLoading}] = useGetUserDetailsMutation()
  const dispatch = useDispatch()
  const userId = useSelector(selectUserId)
  const confirmed = useSelector(isConfirmed)

  const navConfig = {
    page: "Home",
    isToggled: confirmed,
    navbarLinks: privateNavLinks
  }

  useEffect(() => {
    const loadUserDetails = async () => {
      try {
        const response = await getUserDetails(userId).unwrap()
        dispatch(setUserDetails(toUserDetailsResMapper(response)))
        dispatch(setConfirmation({confirmed: response.confirmed}))

      } catch (error) {
        console.log(error)
      }
    }

    loadUserDetails().then(() => console.log("Success login"))
  }, [userId, getUserDetails, dispatch, confirmed])

  return isLoading ? (<CustomLoadingOverlay message={"Loading..."}/>) : (
    <div className={styles.page}>
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar {...navConfig} />
          <div className="absolute rotate-180 z-[0] left-0 w-full">
            <svg className="waves"
                 viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
              <defs>
                <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"/>
              </defs>
              <g className="parallax">
                <use xlinkHref="#gentle-wave" x="155" y="5" fill="#FFFFFF25"/>
              </g>
            </svg>
          </div>
        </div>
      </div>
      {userId && !confirmed ? (<AccountNotConfirmed/>) : ''}
      <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter} z-99`}>
        <div className={`${styles.boxWidth}`}>
          <div className="absolute z-[1] invisible sm:visible w-[40%] h-[35%] top-0 pink__gradient"/>
          <div
            className="absolute z-[2] invisible sm:visible w-[80%] h-[80%] rounded-full white__gradient bottom-40"/>
          <div className={`${styles.flexCenter} flex-col z-[99] sm:relative`}>
            <div className={`w-[80%] sm:w-[50%] mt-5`}>
              <DashboardUserDetailsCard/>
            </div>
          </div>
        </div>
      </div>
      )
      <Footer/>
    </div>
  )
}

export default UserDashboardPage