import {useUpdateConfirmationTokenMutation} from "../redux/api/authApiSlice";
import {toast, ToastContainer} from "react-toastify";
import styles from "../style";
import {sessionExpired} from "../assets";
import {CustomLoadingOverlay} from "../components";
import {useNavigate} from "react-router-dom";

const ResendConfirmAccountEmail = ({token}) => {
  const [updateConfirmationToken, {isLoading}] = useUpdateConfirmationTokenMutation()
  const navigate = useNavigate()

  const resend = async (e) => {
    e.preventDefault()

    try {
      await updateConfirmationToken(token)
      toast.success('Confirmation link was sent to your email account successfully.')
      setTimeout(() => {
        navigate("/")
      }, 1000 * 5)

    } catch (error) {
      toast.error('Resending confirmation link Failed.')
    }
  }

  return isLoading ? (<CustomLoadingOverlay message={"Loading..."}/>) : (
    <div className="flex flex-col w-[50%] items-center justify-center text-center">
      <ToastContainer className={"toast-style"}/>
      <img src={sessionExpired} alt="confirmAccount"
           className="w-[90%] h-auto z-50"/>
      {/* gradient start */}
      <div className="absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient"/>
      <div className="absolute z-[1] w-[80%] h-[80%] rounded-full white__gradient bottom-40"/>
      {/* gradient end */}
      <h4 className="font-poppins font-semibold text-gradient text-[18px] leading-[23.4px] mb-1">
        Account confirmation failed
      </h4>
      <p className={`${styles.paragraph} text-[15px] sm:text-[12px] lg:text-[15px] text-white`}>
        Click button below to send confirmation link again. Link will be sent to the address you provided during
        registration.
      </p>
      <div className="flex flex-row gap-4">
        <button className="mt-4 bg-yellow-gradient rounded-[10px] font-poppins p-2"
                onClick={resend}>Resend link
        </button>
      </div>
    </div>
  )
}

export default ResendConfirmAccountEmail