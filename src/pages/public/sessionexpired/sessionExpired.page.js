import styles from '../../../style';
import { Footer, Navbar } from '../../../components';
import { sessionExpired } from '../../../assets';
import { publicNavLinks } from '../../../constants';

const SessionExpiredPage = () => {
  const navConfig = {
    page: null,
    isToggled: false,
    navbarLinks: publicNavLinks,
    textWhite: true,
    logoWhite: true,
  };

  const nextPath = (path) => {
    window.location.href = path;
  };

  return (
    <div className={`${styles.page} px-6 sm:px-16`}>
      <div className={`${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar {...navConfig} />
        </div>
      </div>

      <div className={`${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <div className="flex justify-center items-center mt-4 mb-16">
            <div className="flex flex-col w-[50%] items-center justify-center text-center">
              <img src={sessionExpired} alt="sessionExpired" className="w-[90%] h-auto z-50" />
              <h4 className="font-poppins font-semibold text-gradient text-[18px] leading-[23.4px] mb-1">
                Your session has expired
              </h4>
              <p className={`text-[15px] sm:text-[12px] lg:text-[15px] text-white`}>
                Please sign in again or go back to the home page.
              </p>
              <div className="flex flex-row gap-4">
                <button
                  className={`mt-4 ${styles.button} z-[99]`}
                  onClick={() => nextPath('/sign-in')}>
                  Sign in
                </button>
                <button className={`mt-4 ${styles.button} z-[99]`} onClick={() => nextPath('/')}>
                  Home
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SessionExpiredPage;
