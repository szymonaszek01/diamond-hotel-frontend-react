import {Footer, Navbar, RegisterForm} from "../../components";
import styles from "../../style";

const SignUpPage = () => {
  const navConfig = {
    page: "Sign up",
    isToggled: true
  }

  return (
    <div className="bg-primary w-full overflow-hidden">
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar {...navConfig}/>
        </div>
      </div>

      <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <RegisterForm/>
          {/* gradient start */}
          <div className="absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient"/>
          <div className="absolute z-[1] w-[80%] h-[80%] rounded-full white__gradient bottom-40"/>
          {/* gradient end */}
          <Footer/>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage