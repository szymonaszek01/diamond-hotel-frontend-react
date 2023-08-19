import styles from "../../style";
import {Footer, LoginForm, Navbar} from "../../components";
import {publicNavLinks} from "../../constants";
import {selectUser} from "../../redux/features/authSlice";
import {useSelector} from "react-redux";
import {Navigate, useLocation} from "react-router-dom";

const SignInPage = () => {
  const navConfig = {
    page: "Sign in",
    isToggled: true,
    navbarLinks: publicNavLinks
  }

  const user = useSelector(selectUser)
  const location = useLocation()

  return user ? (<Navigate to="/dashboard" state={{from: location}} replace/>) : (
    <div className={styles.page}>
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar {...navConfig}/>
        </div>
      </div>

      <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <LoginForm/>
          <div className="absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient"/>
          <div className="absolute z-[1] w-[80%] h-[80%] rounded-full white__gradient bottom-40"/>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default SignInPage