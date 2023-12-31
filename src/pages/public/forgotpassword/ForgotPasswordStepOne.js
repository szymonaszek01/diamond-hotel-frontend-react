import { useForgotAccountPasswordMutation } from '../../../redux/api/authApiSlice';
import { toast } from 'react-toastify';
import { CustomLoadingOverlay, CustomStandardInput } from '../../../components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { inputsInfo } from '../../../constants';

const ForgotPasswordStepOne = () => {
  const [form, setForm] = useState({
    email: { ...inputsInfo.user.email, value: '', autoComplete: 'username' },
  });
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const [forgotAccountPassword, { isLoading }] = useForgotAccountPasswordMutation();

  const forgotPasswordStepOne = async (e) => {
    e.preventDefault();

    try {
      await forgotAccountPassword(form.email.value);
      setForm({
        ...form,
        email: { ...form.email, value: '' },
      });
      toast.success('Link was sent to your email account successfully');
      setTimeout(() => {
        navigate('/');
      }, 1000 * 5);
    } catch (error) {
      setError(true);
      toast.error('Sending link to your email account failed');
    }
  };

  const onChange = (e) => {
    setError(false);
    setForm({
      ...form,
      email: { ...form.email, value: e.target.value },
    });
  };

  return isLoading ? (
    <CustomLoadingOverlay message={"We're processing your password reset request..."} />
  ) : (
    <div className="flex flex-col justify-center sm:justify-start items-center sm:items-start gap-5">
      <p
        className={`flex flex-col text-sm text-center sm:text-start text-dimWhite font-poppins font-thin leading-10 sm:leading-8 gap-5`}>
        <span className={'text-4xl font-semibold text-white leading-[50px]'}>
          Do you forget the password?
        </span>
        <span>
          Please enter the email address that was provided during registration process, to have a
          new password.
        </span>
      </p>
      <CustomStandardInput
        attributes={form.email}
        placeholder={'email'}
        error={error}
        onChange={onChange}
      />
      <button
        className="bg-yellow-gradient rounded-[10px] font-poppins p-2 z-[99]"
        onClick={forgotPasswordStepOne}>
        Send
      </button>
    </div>
  );
};

export default ForgotPasswordStepOne;
