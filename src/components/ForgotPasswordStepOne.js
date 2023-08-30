import {useForgotAccountPasswordMutation} from "../redux/api/authApiSlice";
import {toast, ToastContainer} from "react-toastify";
import {CustomLoadingOverlay, CustomStandardInput} from "../components";
import styles from "../style";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {inputsInfo} from "../constants";

const ForgotPasswordStepOne = () => {
  const [form, setForm] = useState({
    email: {...inputsInfo.user.email, value: '', autoComplete: 'username'}
  })
  const [error, setError] = useState(false)
  const navigate = useNavigate()
  const [forgotAccountPassword, {isLoading}] = useForgotAccountPasswordMutation()

  const forgotPasswordStepOne = async (e) => {
    e.preventDefault()

    try {
      await forgotAccountPassword(form.email.value)
      setForm({
        ...form,
        email: {...form.email, value: ''}
      })
      toast.success('Link was sent to your email account successfully')
      setTimeout(() => {
        navigate("/")
      }, 1000 * 5)

    } catch (error) {
      setError(true)
      toast.error('Sending link to your email account failed')
    }
  }

  const onChange = (e) => {
    setError(false)
    setForm({
      ...form,
      email: {...form.email, value: e.target.value}
    })
  }

  return isLoading ? (<CustomLoadingOverlay message={"Loading..."}/>) : (
    <div className="flex flex-col justify-center sm:justify-start items-center sm:items-start gap-5">
      <ToastContainer className={"toast-style"}/>
      {/* gradient start */}
      <div className="absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient"/>
      <div className="absolute z-[1] w-[80%] h-[80%] rounded-full white__gradient bottom-40"/>
      {/* gradient end */}
      <h2 className={`flex ${styles.heading2} z-[99] justify-center sm:justify-start`}>Do you forget the password?</h2>
      <p className={`${styles.paragraph} text-[15px] sm:text-[12px] lg:text-[15px] text-white z-[99]`}>
        Please enter the email address that was registered for your account, To have a new password.
      </p>
      <CustomStandardInput attributes={form.email} placeholder={true} error={error}
                           onChange={onChange}/>
      <button className="bg-yellow-gradient rounded-[10px] font-poppins p-2 z-[99]" onClick={forgotPasswordStepOne}>Send
      </button>
    </div>
  )
}

export default ForgotPasswordStepOne