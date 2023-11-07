import styles from '../../../style';
import { publicNavLinks } from '../../../constants';
import { Footer, Navbar } from '../../../components';
import Hero from './Hero';
import Stats from './Stats';
import Business from './Business';
import Product from './Product';
import Contact from './Contact';
import Opinion from './Opinion';
import CTA from './CTA';

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
