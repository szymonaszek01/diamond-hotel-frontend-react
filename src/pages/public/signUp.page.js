import {Footer, Navbar, RegisterForm} from "../../components";
import styles from "../../style";
import {publicNavLinks} from "../../constants";

const SignUpPage = () => {
  const navConfig = {
    page: "Sign up",
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

      <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <RegisterForm/>
          <div className="absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient"/>
          <div className="absolute z-[1] w-[80%] h-[80%] rounded-full white__gradient bottom-40"/>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default SignUpPage