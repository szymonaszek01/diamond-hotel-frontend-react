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

const StepForm = ({form, step, standardInput, phoneInput}) => {
  return (
    <motion.div key={`form-${step}`} initial={{scale: 0}} animate={{rotate: 360, scale: 1}} className="w-full">
      {form.filter(input => input.name !== "phone").map(input => standardInput(input))}
      {form.filter(input => input.name === "phone").map(input => phoneInput(input))}
    </motion.div>
  )
}

const RegisterForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [register, {isLoading}] = useRegisterMutation()
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    email: {value: '', type: 'email', label: 'email', name: 'email'},
    password: {value: '', type: 'password', label: 'password', name: 'password'},
    repeated: {value: '', type: 'password', label: 'repeated password', name: 'repeated'},
    firstname: {value: '', type: 'text', label: 'firstname', name: 'firstname'},
    lastname: {value: '', type: 'text', label: 'lastname', name: 'lastname'},
    age: {value: '', type: 'number', label: 'age', name: 'age'},
    country: {value: '', type: 'text', label: 'country', name: 'country'},
    passport: {value: '', type: 'text', label: 'passport number', name: 'passport'},
    phone: {value: '', type: 'text', label: 'phone number', name: 'phone'},
    city: {value: '', type: 'text', label: 'city', name: 'city'},
    street: {value: '', type: 'text', label: 'street', name: 'street'},
    postal: {value: '', type: 'text', label: 'postal code', name: 'postal'}
  })
  const [error, setError] = useState({
    userExists: false,
    fields: []
  })

  const renderStandardInput = (input) => {
    return (
      <input type={input.type} key={`input-${input.name}`}
             className={`${styles.input} ${error.fields.find(field => field === input.name) ? styles.error : ''} mt-7`}
             name={input.name} value={input.value} placeholder={input.label} onChange={onChange}/>
    )
  }

  const renderPhoneInput = (input) => {
    return (
      <PhoneInput
        key={`input-${input.name}`}
        className={`${styles.input} phone ${error.fields.find(field => field === input.name) ? styles.error : ''} mt-7`}
        placeholder={input.label}
        value={input.value}
        name={input.name} onChange={onChange}/>
    )
  }

  const renderErrorMessage = (inputs) => {
    return `Please, fill ${
      inputs.map(input => {
        return "'" + input.label + "'"
      })
    } ${inputs.length > 1 ? 'fields' : 'field'}`
  }

  const getInputsByStep = () => {
    const stop = 3 * step
    const start = stop - 3
    return Object.values(form).filter((_, index) => index >= start && index < stop)
  }

  const previousStep = () => setStep(step - 1)

  const nextStep = () => {
    if (error.userExists) {
      return
    }

    const invalidInputs = getInputsByStep().filter(input => input.value.length < 1)
    if (invalidInputs.length > 0) {
      setError({
        ...error,
        fields: invalidInputs.map(invalidInput => invalidInput.name)
      })
      toast.error(renderErrorMessage(invalidInputs))
      return
    }

    if (step === 1) {
      const result = validatePassword(form.password.value, form.repeated.value)
      if (result) {
        setError({
          ...error,
          fields: [form.password.name, form.repeated.name]
        })

        toast.error(result)
        return
      }
    }

    setStep(step + 1)
  }

  const registerUser = async (e) => {
    e.preventDefault()

    try {
      const response = await register(toRegisterReqMapper(form)).unwrap()
      dispatch(setCredentials(toAuthResMapper(response)))
      navigate('/dashboard')

    } catch (error) {
      setStep(1)
      setError({
        ...error,
        userExists: true,
        fields: [form.email.name, form.password.name, form.repeated.name]
      })
      toast.error('Registration Failed. User with this password or email exists.')
    }
  }

  const onChange = (e) => {
    if (e === undefined) {
      return
    }

    const inputName = (typeof e) === "string" ? "phone" : e.target.name
    const inputValue = (typeof e) === "string" ? e : e.target.value
    const result = Object.values(form).find(input => input.name === inputName)

    setError({
      ...error,
      userExists: false,
      fields: error.fields.filter(field => field !== inputName)
    })

    if (result) {
      setForm({...form, [inputName]: {...result, value: inputValue}})
    }
  }

  return isLoading ? (<CustomLoadingOverlay message={"Loading..."}/>) : (
    <section id="login-form" className={`${layout.section} ${styles.flexCenter}`}>
      <ToastContainer className={"toast-style"}/>
      <div className="h-[100vh] sm:h-[100%] sm:w-[100%] max-w-[75%] flex sm:flex-row flex-col rounded-[10px]">
        <div className="flex justify-center sm:justify-start w-[100%]">
          <img src={loginImg} alt="billing" className="w-[100%] h-auto"/>
        </div>
        <div className="flex flex-col justify-center items-center sm:items-start w-[100%] sm:px-10 z-50 ">
          <h2 className={`flex ${styles.heading2} z-[99] justify-center sm:justify-start`}>Sign up</h2>

          <Steps steps={4} count={step} error={error.fields.length > 0}/>
          <StepForm step={step} form={getInputsByStep()} standardInput={renderStandardInput}
                    phoneInput={renderPhoneInput}/>

          <div className="flex flex-row justify-center items-center sm:justify-start gap-5">
            <button className={`${step > 1 ? '' : 'hidden'} mt-4 ${styles.button}`}
                    onClick={previousStep}>
              Previous
            </button>
            <button className={`mt-4 ${styles.button}`}
                    onClick={step === 4 ? registerUser : nextStep}>
              {step === 4 ? 'Sign up' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default RegisterForm