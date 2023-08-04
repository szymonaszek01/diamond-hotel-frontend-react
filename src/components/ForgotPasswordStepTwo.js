import {useChangePasswordMutation} from "../redux/api/authApiSlice";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import {CustomLoadingOverlay} from "../components";
import styles from "../style";
import {validatePassword} from "../redux/features/authSlice";

const ForgotPasswordStepTwo = ({token}) => {
  const [newPwd, setNewPwd] = useState('')
  const [repeatedPwd, setRepeatedPwd] = useState('')
  const [error, setError] = useState(false)
  const navigate = useNavigate()
  const [changePassword, {isLoading}] = useChangePasswordMutation()

  const forgotPasswordStepTwo = async (e) => {
    e.preventDefault()

    const message = validatePassword(newPwd, repeatedPwd)
    if (message) {
      setError(true)
      toast.error(message)
      return;
    }

    try {
      await changePassword({token: token, new_password: newPwd}).unwrap()
      setNewPwd('')
      setRepeatedPwd('')
      toast.success('Password was changed successfully')
      setTimeout(() => {
        navigate("/")
      }, 1000 * 5)

    } catch (error) {
      setError(true)
      toast.error('Changing password failed')
    }
  }

  const handleNewPwdInput = (e) => {
    setError(false)
    setNewPwd(e.target.value)
  }

  const handleRepeatedPwdInput = (e) => {
    setError(false)
    setRepeatedPwd(e.target.value)
  }

  return isLoading ? (<CustomLoadingOverlay message={"Loading..."}/>) : (
    <div className="flex flex-col justify-center sm:justify-start items-center sm:items-start gap-5">
      <ToastContainer className={"toast-style"}/>
      {/* gradient start */}
      <div className="absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient"/>
      <div className="absolute z-[1] w-[80%] h-[80%] rounded-full white__gradient bottom-40"/>
      {/* gradient end */}

      <h4 className={`${styles.heading2} z-[99]`}>Change password</h4>

      <input placeholder="new password" type="password"
             value={newPwd} className={`${styles.input} ${error ? styles.error : ''} z-[99]`}
             required
             onChange={handleNewPwdInput}/>

      <input placeholder="repeated password" type="password"
             value={repeatedPwd} className={`${styles.input} ${error ? styles.error : ''} z-[99]`}
             required
             onChange={handleRepeatedPwdInput}/>
      <div>

      </div>
      <button className={`${styles.button} z-[99]`}
              onClick={forgotPasswordStepTwo}>Confirm
      </button>
    </div>
  )
}

export default ForgotPasswordStepTwo