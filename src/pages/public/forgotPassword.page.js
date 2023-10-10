import {Footer, Navbar, ForgotPasswordStepOne, ForgotPasswordStepTwo} from "../../components";
import styles from "../../style";
import {loginImg} from "../../assets";
import {urlParam} from "../../util";

const ForgotPasswordPage = () => {
  const navConfig = {
    page: null,
    isToggled: false,
    logoWhite: true
  }

  const confirmationToken = urlParam("confirmation-token", window.location.search)

  return (
    <div className={`${styles.page}`}>
      <div className="absolute z-[0] w-[60%] h-[60%] -left-[50%] rounded-full blue__gradient bottom-40"/>

      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar {...navConfig}/>
        </div>
      </div>
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <div className="flex justify-center items-center my-16 sm:my-0">
            <div className="min-h-[100vh] sm:min-h-[100%] sm:w-[100%] max-w-[75%] flex sm:flex-row flex-col">
              <div className="flex flex-col justify-center sm:justify-start w-[100%]">
                <img src={loginImg} alt="billing" className="w-[100%] h-auto"/>
              </div>
              <div className="flex flex-col justify-center items-center sm:items-start w-[100%] sm:px-10 z-50">
                {!confirmationToken ? <ForgotPasswordStepOne/> : <ForgotPasswordStepTwo token={confirmationToken}/>}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default ForgotPasswordPage