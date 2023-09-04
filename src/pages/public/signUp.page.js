import {Footer, Navbar, RegisterForm} from "../../components";
import styles from "../../style";
import {publicNavLinks} from "../../constants";

const SignUpPage = () => {
  const navConfig = {
    page: "Sign up",
    isToggled: true,
    navbarLinks: publicNavLinks,
    textWhite: true,
    logoWhite: true
  }

  return (
    <div className={styles.page}>
      <div className="absolute z-[0] w-[60%] h-[60%] -left-[50%] rounded-full blue__gradient bottom-40"/>

      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar {...navConfig}/>
        </div>
      </div>

      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <RegisterForm/>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default SignUpPage