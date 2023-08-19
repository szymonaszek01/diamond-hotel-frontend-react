import {Navbar, Hero, Stats, Business, Product, Contact, Opinion, CTA, Footer} from "../../components"
import styles from "../../style"
import {publicNavLinks} from "../../constants";

const HomePage = () => {
  const navConfig = {
    page: "Home",
    isToggled: true,
    navbarLinks: publicNavLinks
  }

  return (
    <div className={styles.page}>
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar {...navConfig}/>
        </div>
      </div>

      <div className={`bg-primary ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <Hero/>
        </div>
      </div>

      <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Stats/>
          <Business/>
          <Product/>
          <Contact/>
          <Opinion/>
          <CTA/>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default HomePage