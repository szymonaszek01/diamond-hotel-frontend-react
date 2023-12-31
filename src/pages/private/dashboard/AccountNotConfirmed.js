import styles from '../../../style';
import { locked } from '../../../assets';
import { useDispatch } from 'react-redux';
import { logOut } from '../../../redux/features/auth/authSlice';

export const AccountNotConfirmed = () => {
  const dispatch = useDispatch();
  const logOutUser = () => {
    dispatch(logOut());
  };

  return (
    <div className={`${styles.boxWidth} not-confirmed flex items-center justify-center`}>
      <div
        className={`relative bg-black-gradient box-shadow rounded-[10px] w-[50%] p-5 text-white z-[99] flex flex-col justify-center items-center text-center`}>
        <img src={locked} alt="locked" className="w-[50px] h-auto" />
        <p className={`font-poppins text-gradient text-[22px] mt-5 font-semibold`}>
          Account not confirmed
        </p>
        <p className={`font-poppins text-white text-[12.8px] mt-1`}>
          Check your email and confirm account to get full access.
        </p>
        <a className={`${styles.button} text-black mt-3`} href="/" onClick={logOutUser}>
          Sign out
        </a>
      </div>
    </div>
  );
};

export default AccountNotConfirmed;
