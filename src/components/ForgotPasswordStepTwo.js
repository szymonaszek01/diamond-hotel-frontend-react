import {useChangePasswordMutation} from "../redux/api/authApiSlice";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import {CustomLoadingOverlay} from "../components";
import styles from "../style";
import {validatePassword} from "../redux/features/authSlice";

const ForgotPasswordStepTwo = ({token}) => {
  const [form, setForm] = useState({
    password: '',
    repeated: ''
  })
  const [error, setError] = useState(false)
  const navigate = useNavigate()
  const [changePassword, {isLoading}] = useChangePasswordMutation()

  const forgotPasswordStepTwo = async (e) => {
    e.preventDefault()

    const result = validatePassword(form.password, form.repeated)
    if (result) {
      setError(true)
      toast.error(result)
      return
    }

    try {
      await changePassword({token: token, new_password: form.password}).unwrap()
      setForm({
        ...form,
        password: '',
        repeated: ''
      })
      toast.success('Password was changed successfully')
      setTimeout(() => {
        navigate("/")
      }, 1000 * 5)

    } catch (error) {
      setError(true)
      toast.error('Changing password failed')
    }
  }

  const onChange = (e) => {
    setError(false)
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  return isLoading ? (<CustomLoadingOverlay message={"Loading..."}/>) : (
    <div className="flex flex-col justify-center sm:justify-start items-center sm:items-start gap-5">
      <ToastContainer className={"toast-style"}/>
      {/* gradient start */}
      <div className="absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient"/>
      <div className="absolute z-[1] w-[80%] h-[80%] rounded-full white__gradient bottom-40"/>
      {/* gradient end */}

      <h2 className={`flex ${styles.heading2} z-[99] justify-center sm:justify-start`}>Change password</h2>

      <input placeholder="new password" type="password" name="password"
             value={form.password} className={`${styles.input} ${error ? styles.error : ''} z-[99]`}
             required
             onChange={onChange}/>

      <input placeholder="repeated password" type="password" name="repeated"
             value={form.repeated} className={`${styles.input} ${error ? styles.error : ''} z-[99]`}
             required
             onChange={onChange}/>
      <div>

      </div>
      <button className={`${styles.button} z-[99]`}
              onClick={forgotPasswordStepTwo}>Confirm
      </button>
    </div>
  )
}

export default ForgotPasswordStepTwo