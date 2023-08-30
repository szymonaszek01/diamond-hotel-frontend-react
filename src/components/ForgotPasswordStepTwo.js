import {useUpdateForgottenAccountPasswordMutation} from "../redux/api/authApiSlice";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import {CustomLoadingOverlay, CustomStandardInput} from "../components";
import styles from "../style";
import {validatePassword} from "../redux/features/authSlice";
import {inputsInfo} from "../constants";

const ForgotPasswordStepTwo = ({token}) => {
  const [form, setForm] = useState({
    password: {...inputsInfo.user.password, value: ''},
    repeated: {...inputsInfo.user.repeated, value: ''}
  })
  const [error, setError] = useState(false)
  const navigate = useNavigate()
  const [updateForgottenAccountPassword, {isLoading}] = useUpdateForgottenAccountPasswordMutation()

  const forgotPasswordStepTwo = async (e) => {
    e.preventDefault()

    const result = validatePassword(form.password.value, form.repeated.value)
    if (result) {
      setError(true)
      toast.error(result)
      return
    }

    try {
      await updateForgottenAccountPassword({token: token, new_password: form.password.value})
      setForm({
        ...form,
        password: {...form.password, value: ''},
        repeated: {...form.repeated, value: ''}
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

  const getInputByName = (name) => {
    return name === "password" ? form.password : form.repeated
  }

  const onChange = (e) => {
    const inputName = e.target.name
    setError(false)
    setForm({
      ...form,
      [inputName]: {...getInputByName(inputName), value: e.target.value}
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
      <CustomStandardInput attributes={form.password} placeholder={true} error={error}
                           onChange={onChange}/>
      <CustomStandardInput attributes={form.repeated} placeholder={true} error={error}
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