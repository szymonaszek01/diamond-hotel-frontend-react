import { useUpdateForgottenAccountPasswordMutation } from '../../../redux/api/authApiSlice';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CustomLoadingOverlay, CustomStandardInput } from '../../../components';
import styles from '../../../style';
import { validatePassword } from '../../../util';
import { inputsInfo } from '../../../constants';

const ForgotPasswordStepTwo = ({ token }) => {
  const [form, setForm] = useState({
    password: { ...inputsInfo.user.password, value: '' },
    repeated: { ...inputsInfo.user.repeated, value: '' },
  });
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const [updateForgottenAccountPassword, { isLoading }] =
    useUpdateForgottenAccountPasswordMutation();

  const forgotPasswordStepTwo = async (e) => {
    e.preventDefault();

    const result = validatePassword(form.password.value, form.repeated.value);
    if (result) {
      setError(true);
      toast.error(result);
      return;
    }

    try {
      await updateForgottenAccountPassword({ token: token, new_password: form.password.value });
      setForm({
        ...form,
        password: { ...form.password, value: '' },
        repeated: { ...form.repeated, value: '' },
      });
      toast.success('Password was changed successfully');
      setTimeout(() => {
        navigate('/');
      }, 1000 * 5);
    } catch (error) {
      setError(true);
      toast.error('Changing password failed');
    }
  };

  const getInputByName = (name) => {
    return name === 'password' ? form.password : form.repeated;
  };

  const onChange = (e) => {
    const inputName = e.target.name;
    setError(false);
    setForm({
      ...form,
      [inputName]: { ...getInputByName(inputName), value: e.target.value },
    });
  };

  return isLoading ? (
    <CustomLoadingOverlay message={"We're updating your password..."} />
  ) : (
    <div className="flex flex-col justify-center sm:justify-start items-center sm:items-start gap-5">
      <p
        className={`flex flex-col text-sm text-center sm:text-start text-dimWhite font-poppins font-thin leading-10 sm:leading-8`}>
        <span className={'text-4xl font-semibold text-white leading-[50px]'}>
          Remember to meet the following criteria
        </span>
        <span>
          <ul>
            <li className={'li-circle'}>At least 8 characters long</li>
            <li className={'li-circle'}>Include both uppercase and lowercase letters</li>
            <li className={'li-circle'}>At least one number</li>
            <li className={'li-circle'}>At least one special character</li>
          </ul>
        </span>
      </p>
      <CustomStandardInput
        attributes={form.password}
        placeholder={true}
        error={error}
        onChange={onChange}
      />
      <CustomStandardInput
        attributes={form.repeated}
        placeholder={true}
        error={error}
        onChange={onChange}
      />
      <button className={`${styles.button} z-[99]`} onClick={forgotPasswordStepTwo}>
        Confirm
      </button>
    </div>
  );
};

export default ForgotPasswordStepTwo;
