import {useChangePasswordMutation} from "../redux/api/authApiSlice";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import {CustomLoadingOverlay} from "./index";
import styles from "../style";

const ForgotPasswordStepTwo = ({token}) => {
  const [newPwd, setNewPwd] = useState('')
  const [repeatedPwd, setRepeatedPwd] = useState('')
  const navigate = useNavigate()
  const [changePassword, {isLoading}] = useChangePasswordMutation()

  const forgotPasswordStepTwo = async (e) => {
    e.preventDefault()

    try {
      await changePassword({token: token, new_password: newPwd}).unwrap()
      setNewPwd('')
      setRepeatedPwd('')
      toast.success('Password was changed successfully')
      setTimeout(() => {
        navigate("/")
      }, 1000 * 5)

    } catch (error) {
      toast.error('Changing password failed')
    }
  }

  const handleNewPwdInput = (e) => setNewPwd(e.target.value)

  const handleRepeatedPwdInput = (e) => setRepeatedPwd(e.target.value)

  return isLoading ? (<CustomLoadingOverlay message={"Loading..."}/>) : (
    <div className="flex flex-col justify-center sm:justify-start items-center sm:items-start gap-5">
      <ToastContainer className={"toast-style"}/>
      {/* gradient start */}
      <div className="absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient"/>
      <div className="absolute z-[1] w-[80%] h-[80%] rounded-full white__gradient bottom-40"/>
      {/* gradient end */}

      <h4 className={`${styles.heading2} z-[99]`}>Change password</h4>

      <input placeholder="new password" type="password"
             value={newPwd} className="h-11 font-poppins text-[14px] sm:text-[12px] lg:text-[14px] z-[99]"
             required
             onChange={handleNewPwdInput}/>

      <input placeholder="repeated password" type="password"
             value={repeatedPwd} className="h-11 font-poppins text-[14px] sm:text-[12px] lg:text-[14px] z-[99]"
             required
             onChange={handleRepeatedPwdInput}/>
      <div>

      </div>
      <button className="bg-yellow-gradient rounded-[10px] font-poppins p-2 z-[99]" onClick={forgotPasswordStepTwo}>Confirm
      </button>
    </div>
  )
}

export default ForgotPasswordStepTwo