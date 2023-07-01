import {Navbar, Hero, Stats, Business, Product, Contact, Opinion, CTA, Footer} from "../../components"
import styles from "../../style"

const HomePage = () => {
  return (
    <div className="bg-primary w-full overflow-hidden">
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar/>
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
          <Footer/>
        </div>
      </div>
    </div>
  )
}

export default HomePage