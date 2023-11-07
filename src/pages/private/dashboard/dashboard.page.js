import styles from '../../../style';
import { isConfirmed, selectFullAccess } from '../../../redux/features/auth/authSlice';
import { useSelector } from 'react-redux';
import { privateNavLinks } from '../../../constants';
import { Footer, Navbar } from '../../../components';
import DashboardUserDetailsCard from './DashboardUserDetailsCard';
import DashboardFindRoomCard from './DashboardFindRoomCard';
import DashboardWeatherCard from './DashboardWeatherCard';

const DashboardPage = () => {
  const confirmed = useSelector(isConfirmed);
  const fullAccess = useSelector(selectFullAccess);

  const navConfig = {
    page: 'Home',
    isToggled: confirmed,
    navbarLinks: privateNavLinks,
    logoWhite: false,
    textWhite: false,
    fullAccess: fullAccess,
  };

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
      <div className={`bg-black-gradient ${styles.paddingX} ${styles.flexCenter} z-99`}>
        <div className={`${styles.boxWidth} mb-20`}>
          <div className={`${styles.flexCenter} flex-col z-[99] sm:relative`}>
            <div className={`w-[80%] sm:w-[50%] mt-5 flex flex-col gap-20`}>
              <DashboardUserDetailsCard allRequiredData={true} />
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

export default DashboardPage;
