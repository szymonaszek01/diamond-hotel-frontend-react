import styles from '../../style';
import { useGetUserByIdMutation } from '../../redux/api/userApiSlice';
import { isConfirmed, selectUserId, setConfirmation } from '../../redux/features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setUserDetails } from '../../redux/features/user/userSlice';
import { toUserDetailsResMapper } from '../../redux/features/user/userMapper';
import { useEffect, useState } from 'react';
import { privateNavLinks } from '../../constants';
import {
  AccountNotConfirmed,
  DashboardFindRoomCard,
  DashboardUserDetailsCard,
  DashboardWeatherCard,
  Footer,
  Navbar,
} from '../../components';

const UserDashboardPage = () => {
  const [getUser] = useGetUserByIdMutation();
  const dispatch = useDispatch();
  const [allRequiredData, setAllRequiredData] = useState(true);
  const userId = useSelector(selectUserId);
  const confirmed = useSelector(isConfirmed);

  const navConfig = {
    page: 'Home',
    isToggled: confirmed,
    navbarLinks: privateNavLinks,
    logoWhite: false,
    textWhite: false,
  };

  useEffect(() => {
    const loadUserDetails = async () => {
      try {
        const response = await getUser(userId).unwrap();
        dispatch(setUserDetails(toUserDetailsResMapper(response)));
        dispatch(setConfirmation({ confirmed: response.confirmed }));
        const res =
          Object.entries(response)
            .filter(([kay, value]) => (value === null || value.length < 1) && kay !== 'picture')
            .map(([_, value]) => value).length === 0;
        setAllRequiredData(res);
      } catch (error) {
        console.log(error);
      }
    };

    loadUserDetails().then(() => console.log('Loaded user'));
  }, [userId, getUser, dispatch, confirmed]);

  return (
    <div className={styles.page}>
      <div className={`${styles.paddingX} ${styles.flexCenter} bg-[#FFFFFF]`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar {...navConfig} />
          <div className="absolute rotate-180 z-[0] left-0 w-full">
            <svg
              className="waves"
              viewBox="0 20 100 32"
              preserveAspectRatio="none"
              shapeRendering="auto">
              <defs>
                <path
                  id="gentle-wave"
                  d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
                />
              </defs>
              <g className="parallax">
                <use xlinkHref="#gentle-wave" x="155" y="5" fill="#FFFFFF" />
              </g>
            </svg>
          </div>
        </div>
      </div>
      {userId && !confirmed ? <AccountNotConfirmed /> : ''}
      <div className={`bg-black-gradient ${styles.paddingX} ${styles.flexCenter} z-99`}>
        <div className={`${styles.boxWidth} mb-20`}>
          <div className={`${styles.flexCenter} flex-col z-[99] sm:relative`}>
            <div className={`w-[80%] sm:w-[50%] mt-5 flex flex-col gap-20`}>
              <DashboardUserDetailsCard allRequiredData={allRequiredData} />
              <DashboardFindRoomCard />
              <DashboardWeatherCard />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserDashboardPage;
