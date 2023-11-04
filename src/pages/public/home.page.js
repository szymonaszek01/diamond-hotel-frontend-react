import {
  Business,
  Contact,
  CTA,
  Footer,
  Hero,
  Navbar,
  Opinion,
  Product,
  Stats,
} from '../../components';
import styles from '../../style';
import { publicNavLinks } from '../../constants';

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
    <div className={styles.page}>
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar {...navConfig} />
        </div>
      </div>

      <div className={`${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <Hero />
        </div>
      </div>

      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Stats />
          <Business />
          <Product />
          <Contact />
          <Opinion />
          <CTA />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
