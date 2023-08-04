import {Footer, Navbar, ForgotPasswordStepOne, ForgotPasswordStepTwo} from "../../components";
import styles from "../../style";
import {loginImg} from "../../assets";

const ForgotPasswordPage = () => {
  const getUrlParam = (name) => {
    const queryParams = new URLSearchParams(window.location.search)
    const encodedParam = queryParams.get(name)

    return encodedParam ? decodeURIComponent(encodedParam) : null
  }

  const navConfig = {
    page: null,
    isToggled: false
  }

  const confirmationToken = getUrlParam("confirmation-token")
  const forgotPasswordConfig = {
    token: confirmationToken
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
          <div className="flex justify-center items-center">
            <div className="h-[100vh] sm:h-[100%] sm:w-[100%] max-w-[75%] flex sm:flex-row flex-col">
              <div className="flex flex-col justify-center sm:justify-start w-[100%]">
                <img src={loginImg} alt="billing" className="w-[100%] h-auto"/>
              </div>
              <div className="flex flex-col justify-center items-center sm:items-start w-[100%] sm:px-10 z-50">
                {!confirmationToken ? <ForgotPasswordStepOne/> : <ForgotPasswordStepTwo {...forgotPasswordConfig}/>}
              </div>
            </div>
          </div>
          <Footer/>
        </div>
      </div>
    </div>
  )
}

export default ForgotPasswordPage