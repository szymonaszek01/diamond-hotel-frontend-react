import styles from "../../style";
import {ToastContainer} from "react-toastify";
import {FindRoomForm, Footer, Navbar} from "../../components";
import {privateNavLinks} from "../../constants";

const FindRoomPage = () => {
  const navConfig = {
    page: "Find room",
    isToggled: true,
    navbarLinks: privateNavLinks,
    logoWhite: true,
    textWhite: true
  }

  return (
    <div className={`${styles.page} w-full room-type-background-image`}>
      <div className="custom-overlay min-h-[100vh]">
        <ToastContainer className={"toast-style"}/>
        <div className={`${styles.paddingX} ${styles.flexCenter}`}>
          <div className={`${styles.boxWidth}`}>
            <Navbar {...navConfig} />
          </div>
        </div>
        <div className={`${styles.paddingX} ${styles.flexCenter} z-99`}>
          <div className={`${styles.boxWidth}`}>
            <div className="mt-5 flex flex-row justify-center items-center">
              <div className="w-[80%] flex flex-col sm:flex-row items-center justify-between min-h-[70vh] gap-10 sm:gap-28">
                <FindRoomForm/>
                <div className="flex flex-col gap-1 w-full text-center sm:text-start">
                  <h2 className={styles.heading2}>Welcome to Our Booking Page</h2>
                  <p className={styles.paragraph}>
                    We're thrilled that you've chosen to book your stay with us! At Diamond Hotel, we're committed to providing you with a comfortable and memorable experience. Please use the booking form below to reserve your room.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    </div>
  )
}

export default FindRoomPage