import styles from '../../../style';
import { Footer, Navbar } from '../../../components';
import { privateNavLinks } from '../../../constants';
import { useSelector } from 'react-redux';
import { isConfirmed, selectFullAccess } from '../../../redux/features/auth/authSlice';
import AccountNotConfirmed from './AccountNotConfirmed';
import DashboardUserDetailsCard from './DashboardUserDetailsCard';
import DashboardWeatherCard from './DashboardWeatherCard';

const DashboardWithoutFullAccessPage = () => {
  const navConfig = {
    page: 'Home',
    isToggled: true,
    navbarLinks: privateNavLinks,
    logoWhite: false,
    textWhite: false,
  };

  const confirmed = useSelector(isConfirmed);
  const fullAccess = useSelector(selectFullAccess);

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
              {!confirmed ? <AccountNotConfirmed /> : ''}
              <DashboardUserDetailsCard allRequiredData={fullAccess} />
              <p
                className={`flex flex-col text-sm text-dimWhite font-poppins font-thin leading-10 sm:leading-8 gap-5`}>
                <span className={'text-3xl font-semibold text-white leading-[50px] sm:leading-8'}>
                  Fill all required data
                </span>
                <span>
                  Attention! To book and manage reservations, please ensure that all required
                  information is filled in accurately. This helps us provide you with a seamless and
                  efficient reservation experience.
                </span>
              </p>
              <DashboardWeatherCard />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardWithoutFullAccessPage;
