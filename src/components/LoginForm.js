import styles, {layout} from "../style";
import {googleLogo, loginImg} from "../assets";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useLoginMutation} from "../redux/api/authApiSlice";
import {useDispatch} from "react-redux";
import {toAuthResponseMapper, setCredentials} from "../redux/features/authSlice";
import {CustomLoadingOverlay} from "./index";
import {ToastContainer, toast} from 'react-toastify';

const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate()
  const [login, {isLoading}] = useLoginMutation()
  const dispatch = useDispatch()

  const loginOAuth2 = async () => {
    window.location.href = "http://localhost:5432/api/v1/user-profile/login/oauth2/google"
  }

  const loginLocal = async (e) => {
    e.preventDefault()

    try {
      const response = await login({email: email, password: password}).unwrap()
      dispatch(setCredentials(toAuthResponseMapper(response)))
      setEmail('')
      setPassword('')
      navigate('/dashboard')

    } catch (error) {
      toast.error('Login Failed. You have entered an invalid username or password.')
    }
  }

  const handleUserInput = (e) => setEmail(e.target.value)

  const handlePwdInput = (e) => setPassword(e.target.value)

  const handleRememberMeInput = (e) => setRememberMe(e.target.checked)

  return isLoading ? (<CustomLoadingOverlay message={"Loading..."}/>) : (
    <section id="login-form" className={`${layout.section} ${styles.flexCenter}`}>
      <ToastContainer className={"toast-style"}/>
      <div className="h-[100vh] sm:h-[100%] sm:w-[100%] max-w-[75%] flex sm:flex-row flex-col rounded-[10px]">
        <div className="flex justify-center sm:justify-start w-[100%]">
          <img src={loginImg} alt="billing" className="w-[100%] h-auto"/>
        </div>
        <div className="flex flex-col justify-center items-center sm:items-start w-[100%] sm:px-10 z-50">
          <div className="flex flex-row justify-center sm:justify-start items-center gap-5">
            <p className={`${styles.paragraph} text-[15px] sm:text-[12px] lg:text-[15px] text-white`}>Sign in with</p>
            <img src={googleLogo} alt="loginForm" onClick={loginOAuth2}
                 className="w-[5%] sm:w-[10%] md:w-[8%] lg:w-[6%] h-auto cursor-pointer"/>
          </div>
          <div className="flex flex-row justify-center items-center w-[100%] mt-2 gap-4">
            <hr className="border-1 w-[100%]"/>
            <p className={`${styles.paragraph} text-[15px] sm:text-[12px] lg:text-[15px] text-white`}>Or</p>
            <hr className="border-1 w-[100%]"/>
          </div>
          <input placeholder="email" type="email" id="email" name="email" autoComplete={rememberMe ? 'username' : ''}
                 value={email} className="mt-7 h-11 font-poppins text-[14px] sm:text-[12px] lg:text-[14px]" required
                 onChange={handleUserInput}/>
          <input placeholder="password" type="password" id="current-password" name="current-password"
                 autoComplete={rememberMe ? 'current-password' : ''}
                 value={password} className="mt-7 h-11 font-poppins text-[14px] sm:text-[12px] lg:text-[14px]"
                 required
                 onChange={handlePwdInput}/>
          <div className="flex flex-col sm:flex-row justify-between items-center w-[100%] mt-2">
            <div className="flex items-center gap-2 w-[100%]">
              <input type="checkbox" onChange={handleRememberMeInput} className="h-4 p-0"/>
              <p className={`${styles.paragraph} text-[15px] sm:text-[12px] lg:text-[15px] text-white`}>Remember
                me</p>
            </div>
            <a
              href="/change/password"
              className={`${styles.paragraph} text-[15px] sm:text-[12px] lg:text-[15px] text-gradient w-[100%] flex justify-start sm:justify-end`}>Forgot
              password?</a>
          </div>
          <button className="mt-4 bg-yellow-gradient rounded-[10px] font-poppins p-2" onClick={loginLocal}>Sign in
          </button>
          <p
            className={`${styles.paragraph} text-[15px] sm:text-[12px] lg:text-[15px] text-white w-[100%] mt-4`}>Don't
            have an account?<a href="/sign-up" className="ml-1 text-gradient font-semibold">Sign up</a>
          </p>
        </div>
      </div>
    </section>
  )
}

export default LoginForm