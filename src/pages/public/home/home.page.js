import styles from '../../../style';
import { publicNavLinks } from '../../../constants';
import { Footer, Navbar } from '../../../components';
import Main from './Main';
import Stats from './Stats';
import Contact from './Contact';

const HomePage = () => {
  const navConfig = {
    page: 'Home',
    isToggled: true,
    navbarLinks: publicNavLinks,
    textWhite: true,
    logoWhite: true,
    fullAccess: true,
  };

  return (
    <div className={`${styles.page} px-6 sm:px-16`}>
      <div>
        <div className={`${styles.boxWidth}`}>
          <Navbar {...navConfig} />
        </div>
      </div>

      <div className={`${styles.flexStart} mt-16`}>
        <div className={`${styles.boxWidth}`}>
          <Main />
        </div>
      </div>

      <div className={`mt-8 sm:mt-24`}>
        <div className={`flex w-full flex-col gap-8 sm:gap-24`}>
          <Stats />
          <Contact />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
