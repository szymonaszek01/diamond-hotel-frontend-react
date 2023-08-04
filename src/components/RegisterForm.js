import {useState} from "react";
import {useRegisterMutation} from "../redux/api/authApiSlice";
import {setCredentials, toAuthResMapper, toRegisterReqMapper, validatePassword} from "../redux/features/authSlice";
import {toast, ToastContainer} from "react-toastify";
import {CustomLoadingOverlay, Steps} from "../components";
import styles, {layout} from "../style";
import {loginImg} from "../assets";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import PhoneInput from "react-phone-number-input";
import {motion} from "framer-motion"

const FirstStep = ({registerForm, onChange, error}) => {
  return (
    <motion.div initial={{scale: 0}} animate={{rotate: 360, scale: 1}} className="w-full">
      <input type="email" className={`${styles.input} ${error ? styles.error : ''} mt-7`} name="email"
             value={registerForm.email} placeholder="email" onChange={onChange}/>
      <input type="password" className={`${styles.input} ${error ? styles.error : ''} mt-7`} name="password"
             value={registerForm.password} placeholder="new password" onChange={onChange}/>
      <input type="password" className={`${styles.input} ${error ? styles.error : ''} mt-7`} name="repeated"
             value={registerForm.repeated} placeholder="repeated password" onChange={onChange}/>
    </motion.div>
  )
}

const SecondStep = ({registerForm, onChange, error}) => {
  return (
    <motion.div initial={{scale: 0}} animate={{rotate: 360, scale: 1}} className="w-full">
      <input type="text" className={`${styles.input} ${error ? styles.error : ''} mt-7`} name="firstname"
             value={registerForm.firstname} placeholder="firstname" onChange={onChange}/>
      <input type="text" className={`${styles.input} ${error ? styles.error : ''} mt-7`} name="lastname"
             value={registerForm.lastname} placeholder="lastname" onChange={onChange}/>
      <input type="number" className={`${styles.input} ${error ? styles.error : ''} mt-7`} name="age"
             value={registerForm.age} placeholder="age" onChange={onChange}/>
    </motion.div>
  )
}

const ThirdStep = ({registerForm, onChange, error}) => {
  const [phone, setPhone] = useState('')
  if (registerForm.phone && !phone) {
    setPhone(registerForm.phone)
  }
  registerForm.phone = phone

  return (
    <motion.div initial={{scale: 0}} animate={{rotate: 360, scale: 1}} className="w-full">
      <input type="text" className={`${styles.input} ${error ? styles.error : ''} mt-7`} name="country"
             value={registerForm.country} placeholder="country" onChange={onChange}/>
      <input type="text" className={`${styles.input} ${error ? styles.error : ''} mt-7`} name="passport"
             value={registerForm.passport} placeholder="passport" onChange={onChange}/>
      <PhoneInput className={`${styles.input} phone ${error ? styles.error : ''} mt-7`} placeholder="phone number"
                  value={phone}
                  name="phone" onChange={setPhone}/>
    </motion.div>
  )
}

const FourthStep = ({registerForm, onChange, error}) => {
  return (
    <motion.div initial={{scale: 0}} animate={{rotate: 360, scale: 1}} className="w-full">
      <input type="text" className={`${styles.input} ${error ? styles.error : ''} mt-7`} name="city"
             value={registerForm.city} placeholder="city" onChange={onChange}/>
      <input type="text" className={`${styles.input} ${error ? styles.error : ''} mt-7`} name="street"
             value={registerForm.street} placeholder="street" onChange={onChange}/>
      <input type="text" className={`${styles.input} ${error ? styles.error : ''} mt-7`} name="postal"
             value={registerForm.postal} placeholder="postal" onChange={onChange}/>
    </motion.div>
  )
}

const RegisterForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [register, {isLoading}] = useRegisterMutation()
  let [error, setError] = useState(false)
  let [count, setCount] = useState(1)
  let [firstStepData, setFirstStepData] = useState({
    email: "",
    password: "",
    repeated: ""
  })
  let [secondStepData, setSecondStepData] = useState({
    firstname: "",
    lastname: "",
    age: ""
  })
  let [thirdStepData, setThirdStepData] = useState({
    country: "",
    passport: "",
    phone: ""
  })
  let [fourthStepData, setFourthStepData] = useState({
    city: "",
    street: "",
    postal: ""
  })

  const isEmpty = (obj) => {
    return Object.values(obj).filter(value => value.length < 1).length > 0
  }

  const previousStep = () => setCount(count - 1)

  const nextStep = () => {
    let result = {valid: true, message: "Please fill all values"}
    if (count === 1) {
      result.valid = !isEmpty(firstStepData)
      if (result.valid) {
        const pwdValidation = validatePassword(firstStepData.password, firstStepData.repeated)
        if (pwdValidation) {
          result.valid = false
          result.message = pwdValidation
        }
      }
    } else if (count === 2) {
      result.valid = !isEmpty(secondStepData)
    } else if (count === 3) {
      result.valid = !isEmpty(thirdStepData)
    } else {
      result.valid = !isEmpty(fourthStepData)
    }

    if (!result.valid) {
      setError(true)
      toast.error(result.message)
      return
    }

    setCount(count + 1)
  }

  const registerUser = async (e) => {
    e.preventDefault()

    try {
      const response = await register(toRegisterReqMapper({...firstStepData, ...secondStepData, ...thirdStepData, ...fourthStepData})).unwrap()
      dispatch(setCredentials(toAuthResMapper(response)))
      navigate('/dashboard')

    } catch (error) {
      setCount(1)
      setError(true)
      toast.error('Register Failed. User with this password or email exists.')
    }
  }

  const handleRegisterFormInput = (e) => {
    setError(false)
    const property = e.target.name
    const value = e.target.value
    if (count === 1) {
      setFirstStepData({
        ...firstStepData,
        [property]: value
      })
    } else if (count === 2) {
      setSecondStepData({
        ...secondStepData,
        [property]: value
      })
    } else if (count === 3) {
      setThirdStepData({
        ...thirdStepData,
        [property]: value
      })
    } else {
      setFourthStepData({
        ...fourthStepData,
        [property]: value
      })
    }
  }

  const renderInputs = () => {
    if (count === 1) {
      return (<FirstStep registerForm={firstStepData} onChange={handleRegisterFormInput} error={error}/>)
    } else if (count === 2) {
      return (<SecondStep registerForm={secondStepData} onChange={handleRegisterFormInput} error={error}/>)
    } else if (count === 3) {
      return (<ThirdStep registerForm={thirdStepData} onChange={handleRegisterFormInput} error={error}/>)
    } else {
      return (<FourthStep registerForm={fourthStepData} onChange={handleRegisterFormInput} error={error}/>)
    }
  }

  return isLoading ? (<CustomLoadingOverlay message={"Loading..."}/>) : (
    <section id="login-form" className={`${layout.section} ${styles.flexCenter}`}>
      <ToastContainer className={"toast-style"}/>
      <div className="h-[100vh] sm:h-[100%] sm:w-[100%] max-w-[75%] flex sm:flex-row flex-col rounded-[10px]">
        <div className="flex justify-center sm:justify-start w-[100%]">
          <img src={loginImg} alt="billing" className="w-[100%] h-auto"/>
        </div>
        <div className="flex flex-col justify-center items-center sm:items-start w-[100%] sm:px-10 z-50">
          <h4 className={`${styles.heading2} z-[99]`}>Sign up</h4>

          <Steps/>
          {renderInputs()}

          <div className="flex flex-row justify-center items-center sm:justify-start gap-5">
            <button className={`${count > 1 ? '' : 'hidden'} mt-4 ${styles.button}`}
                    onClick={previousStep}>
              Previous
            </button>
            <button className={`mt-4 ${styles.button}`}
                    onClick={count === 4 ? registerUser : nextStep}>
              {count === 4 ? 'Sign up' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default RegisterForm