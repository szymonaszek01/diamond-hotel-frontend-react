import { useState } from 'react';
import { useRegisterAccountMutation } from '../redux/api/authApiSlice';
import {
  setAccountDetails,
  toAuthResMapper,
  toRegisterReqMapper,
  validatePassword,
} from '../redux/features/authSlice';
import { toast, ToastContainer } from 'react-toastify';
import { CustomLoadingOverlay, CustomPhoneInput, CustomStandardInput, Steps } from '../components';
import styles, { layout } from '../style';
import { loginImg } from '../assets';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { inputsInfo } from '../constants';
import { requiredInputsErrorMessage } from '../util';

const StepForm = ({ form, step, isError, onChange }) => {
  return (
    <motion.div
      key={`form-${step}`}
      initial={{ scale: 0 }}
      animate={{ rotate: 360, scale: 1 }}
      className="w-full flex flex-col mt-7 gap-7">
      {form
        .filter((input) => input.name !== 'phone')
        .map((input) => (
          <CustomStandardInput
            attributes={input}
            error={isError(input)}
            onChange={onChange}
            label={true}
          />
        ))}
      {form
        .filter((input) => input.name === 'phone')
        .map((input) => (
          <CustomPhoneInput
            attributes={input}
            error={isError(input)}
            onChange={onChange}
            label={true}
          />
        ))}
    </motion.div>
  );
};

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [registerAccount, { isLoading }] = useRegisterAccountMutation();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    email: { ...inputsInfo.user.email, value: '' },
    password: { ...inputsInfo.user.password, value: '' },
    repeated: { ...inputsInfo.user.repeated, value: '' },
    firstname: { ...inputsInfo.user.firstname, value: '' },
    lastname: { ...inputsInfo.user.lastname, value: '' },
    age: { ...inputsInfo.user.age, value: '' },
    country: { ...inputsInfo.user.country, value: '' },
    passport: { ...inputsInfo.user.passport, value: '' },
    phone: { ...inputsInfo.user.phone, value: '' },
    city: { ...inputsInfo.user.city, value: '' },
    street: { ...inputsInfo.user.street, value: '' },
    postal: { ...inputsInfo.user.postal, value: '' },
  });
  const [error, setError] = useState({
    userExists: false,
    fields: [],
  });

  const isError = (input) => {
    return error.fields.find((field) => field === input.name);
  };

  const getInputsByStep = () => {
    const stop = 3 * step;
    const start = stop - 3;
    return Object.values(form).filter((_, index) => index >= start && index < stop);
  };

  const previousStep = () => setStep(step - 1);

  const nextStep = () => {
    if (error.userExists) {
      return;
    }

    const invalidInputs = getInputsByStep().filter((input) => input.value.length < 1);
    if (invalidInputs.length > 0) {
      setError({
        ...error,
        fields: invalidInputs.map((invalidInput) => invalidInput.name),
      });
      toast.error(requiredInputsErrorMessage(invalidInputs));
      return;
    }

    if (step === 1) {
      const result = validatePassword(form.password.value, form.repeated.value);
      if (result) {
        setError({
          ...error,
          fields: [form.password.name, form.repeated.name],
        });

        toast.error(result);
        return;
      }
    }

    setStep(step + 1);
  };

  const registerUser = async (e) => {
    e.preventDefault();

    try {
      const response = await registerAccount(toRegisterReqMapper(form)).unwrap();
      dispatch(setAccountDetails(toAuthResMapper(response)));
      navigate('/dashboard');
    } catch (error) {
      setStep(1);
      setError({
        ...error,
        userExists: true,
        fields: [form.email.name, form.password.name, form.repeated.name],
      });
      toast.error('Registration Failed. User with this password or email exists.');
    }
  };

  const onChange = (e) => {
    if (e === undefined) {
      return;
    }

    const inputName = typeof e === 'string' ? 'phone' : e.target.name;
    const inputValue = typeof e === 'string' ? e : e.target.value;
    const result = Object.values(form).find((input) => input.name === inputName);

    setError({
      ...error,
      userExists: false,
      fields: error.fields.filter((field) => field !== inputName),
    });

    if (result) {
      setForm({ ...form, [inputName]: { ...result, value: inputValue } });
    }
  };

  return isLoading ? (
    <CustomLoadingOverlay message={'Loading...'} />
  ) : (
    <section id="login-form" className={`${layout.section} ${styles.flexCenter}`}>
      <ToastContainer className={'toast-style'} />
      <div className="min-h-[100vh] sm:min-h-[100%] sm:w-[100%] max-w-[75%] flex sm:flex-row flex-col rounded-[10px]">
        <div className="flex justify-center sm:justify-start w-[100%]">
          <img src={loginImg} alt="billing" className="w-[100%] h-auto" />
        </div>
        <div className="flex flex-col justify-center items-center sm:items-start w-[100%] sm:px-10 z-50 ">
          <p
            className={`flex flex-col text-sm text-center sm:text-start text-dimWhite font-poppins font-thin leading-10 sm:leading-8 gap-5`}>
            <span className={'text-4xl font-semibold text-white'}>Sign up</span>
            <span>
              Welcome to Diamond hotel! Join our community and unlock a world of opportunities.
              Signing up is quick and easy.
            </span>
          </p>
          <Steps steps={4} count={step} error={error.fields.length > 0} />
          <StepForm step={step} form={getInputsByStep()} isError={isError} onChange={onChange} />

          <div className="flex flex-row justify-center items-center sm:justify-start gap-5">
            <button
              className={`${step > 1 ? '' : 'hidden'} mt-5 ${styles.button}`}
              onClick={previousStep}>
              Previous
            </button>
            <button
              className={`mt-5 ${styles.button}`}
              onClick={step === 4 ? registerUser : nextStep}>
              {step === 4 ? 'Sign up' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterForm;
