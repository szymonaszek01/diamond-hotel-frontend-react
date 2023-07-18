import styles from "../../style";
import {Footer, Navbar} from "../../components";
import {sessionExpired} from "../../assets";

const SessionExpiredPage = () => {
  const navConfig = {
    page: null,
    isToggled: false
  }

  const nextPath = (path) => {
    window.location.href = path;
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
          <div className="flex justify-center items-center mt-4 mb-16">
            <div className="flex flex-col w-[50%] items-center justify-center text-center">
              <img src={sessionExpired} alt="sessionExpired"
                   className="w-[90%] h-auto z-50"/>
              {/* gradient start */}
              <div className="absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient"/>
              <div className="absolute z-[1] w-[80%] h-[80%] rounded-full white__gradient bottom-40"/>
              {/* gradient end */}
              <h4 className="font-poppins font-semibold text-gradient text-[18px] leading-[23.4px] mb-1">
                Your session has expired
              </h4>
              <p className={`${styles.paragraph} text-[15px] sm:text-[12px] lg:text-[15px] text-white`}>
                Please sign in again or go back to the home page.
              </p>
              <div className="flex flex-row gap-4">
                <button className="mt-4 bg-yellow-gradient rounded-[10px] font-poppins p-2" onClick={() => nextPath("/sign-in")}>Sign in
                </button>
                <button className="mt-4 bg-yellow-gradient rounded-[10px] font-poppins p-2" onClick={() => nextPath("/")}>Home
                </button>
              </div>
            </div>
          </div>
          <Footer/>
        </div>
      </div>
    </div>
  )
}

export default SessionExpiredPage