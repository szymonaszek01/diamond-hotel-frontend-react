import styles from '../../../style';
import { googleLogo, loginImg } from '../../../assets';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginAccountMutation } from '../../../redux/api/authApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectOAuth2Error,
  setAccountDetails,
  setFullAccess,
  setOAuth2Error,
} from '../../../redux/features/auth/authSlice';
import { toAuthResMapper } from '../../../redux/features/auth/authMapper';
import { CustomLoadingOverlay, CustomStandardInput } from '../../../components';
import { toast } from 'react-toastify';
import { inputsInfo } from '../../../constants';
import { setUserDetails } from '../../../redux/features/user/userSlice';
import { toUserDetailsResMapper } from '../../../redux/features/user/userMapper';
import { isFullAccess } from '../../../util';
import { useGetUserByIdMutation } from '../../../redux/api/userApiSlice';

const LoginForm = () => {
  const [form, setForm] = useState({
    email: { ...inputsInfo.user.email, value: '', autoComplete: 'username' },
    password: {
      ...inputsInfo.user.password,
      value: '',
      name: 'current-password',
      autoComplete: 'current-password',
    },
  });
  const [error, setError] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const [loginAccount] = useLoginAccountMutation();
  const [getUser] = useGetUserByIdMutation();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const oAuthError = useSelector(selectOAuth2Error);
  if (oAuthError) {
    toast.error('Login Failed. Account with this email exists.');
    dispatch(setOAuth2Error({ error: null }));
  }

  const loginOAuth2 = async () => {
    window.location.href = process.env.REACT_APP_SERVER_URI;
  };

  const loginLocal = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let response = await loginAccount({
        email: form.email.value,
        password: form.password.value,
      }).unwrap();
      dispatch(setAccountDetails(toAuthResMapper(response)));

      response = await getUser(response.id).unwrap();
      const userDetails = toUserDetailsResMapper(response);
      dispatch(setFullAccess({ fullAccess: isFullAccess(userDetails) }));
      dispatch(setUserDetails(userDetails));

      setForm({
        ...form,
        email: { ...form.email, value: '' },
        password: { ...form.password, value: '' },
      });

      setLoading(false);
      navigate('/dashboard');
    } catch (error) {
      setError(true);
      toast.error('Login Failed. You have entered an invalid username or password.');
      setLoading(false);
    }
  };

  const getInputByName = (name) => {
    return name === 'email' ? form.email : form.password;
  };

  const onChange = (e) => {
    let inputName = e.target.name;
    if (inputName === 'current-password') {
      inputName = 'password';
    }
    setError(false);
    setForm({
      ...form,
      [inputName]: { ...getInputByName(inputName), value: e.target.value },
    });
  };

  const handleRememberMeInput = (e) => setRememberMe(e.target.checked);

  return loading ? (
    <CustomLoadingOverlay message={'Please wait while we securely log you in...'} />
  ) : (
    <section id="login-form" className={`${styles.flexCenter}`}>
      <div className="min-h-[100vh] sm:min-h-[100%] sm:w-[100%] max-w-[75%] flex sm:flex-row flex-col rounded-[10px]">
        <div className="flex justify-center sm:justify-start w-[100%]">
          <img src={loginImg} alt="google-icon" className="w-[100%] h-auto" />
        </div>
        <div className="flex flex-col justify-center items-center sm:items-start w-[100%] sm:px-10 z-50">
          <p
            className={`flex flex-col text-sm text-center sm:text-start text-dimWhite font-poppins font-thin leading-10 sm:leading-8 gap-5`}>
            <span className={'text-4xl font-semibold text-white'}>Sign In</span>
            <span>
              Get full access to a lot of features and possibilities by signing in to your account.
            </span>
          </p>
          <div className="flex flex-row justify-center sm:justify-start items-center gap-5 mt-5">
            <p className={`font-poppins text-[15px] sm:text-[12px] lg:text-[15px] text-white`}>
              Sign in with
            </p>
            <img
              src={googleLogo}
              alt="loginForm"
              onClick={loginOAuth2}
              className="w-[5%] sm:w-[10%] md:w-[8%] lg:w-[6%] h-auto cursor-pointer"
            />
          </div>
          <div className="flex flex-row justify-center items-center w-[100%] gap-5">
            <hr className="border-1 w-[100%]" />
            <p className={`font-poppins text-[15px] sm:text-[12px] lg:text-[15px] text-white`}>
              Or
            </p>
            <hr className="border-1 w-[100%]" />
          </div>
          <div className="flex flex-col gap-7 w-full mt-1">
            <CustomStandardInput
              attributes={form.email}
              label={true}
              error={error}
              autoComplete={rememberMe}
              onChange={onChange}
            />
            <CustomStandardInput
              attributes={form.password}
              label={true}
              error={error}
              autoComplete={rememberMe}
              onChange={onChange}
            />
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center w-[100%] mt-2">
            <div className="flex items-center gap-2 w-[100%]">
              <input type="checkbox" onChange={handleRememberMeInput} className="h-4 p-0" />
              <p className={`font-poppins text-[15px] sm:text-[12px] lg:text-[15px] text-white`}>
                Remember me
              </p>
            </div>
            <a
              href="/forgot/password"
              className={`font-poppins text-[15px] sm:text-[12px] lg:text-[15px] text-gradient w-[100%] flex justify-start sm:justify-end`}>
              Forgot password?
            </a>
          </div>
          <button className={`${styles.button} mt-5`} onClick={loginLocal}>
            Sign in
          </button>
          <p
            className={`font-poppins text-[15px] sm:text-[12px] lg:text-[15px] text-white w-[100%] mt-4`}>
            Don't have an account?
            <a href="/sign-up" className="ml-1 text-gradient font-semibold">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
