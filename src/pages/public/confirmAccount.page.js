import { useNavigate } from 'react-router-dom';
import { setAccountDetails } from '../../redux/features/auth/authSlice';
import { toAuthResMapper } from '../../redux/features/auth/authMapper';
import { toast, ToastContainer } from 'react-toastify';
import { useConfirmAccountMutation } from '../../redux/api/authApiSlice';
import { useDispatch } from 'react-redux';
import styles from '../../style';
import { CustomLoadingOverlay, Footer, Navbar, ResendConfirmAccountEmail } from '../../components';
import { useEffect } from 'react';
import { urlParam } from '../../util';

const ConfirmAccountPage = () => {
  const [confirmAccount, { isLoading }] = useConfirmAccountMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const confirmationToken = urlParam('confirmation-token', window.location.search);
  if (!confirmationToken) {
    navigate('/');
  }

  const navConfig = {
    page: null,
    isToggled: false,
    navbarLinks: null,
    logoWhite: true,
  };

  useEffect(() => {
    const confirm = async () => {
      try {
        const response = await confirmAccount(confirmationToken).unwrap();
        dispatch(setAccountDetails(toAuthResMapper(response)));
        navigate('/dashboard');
      } catch (error) {
        toast.error('Account confirmation Failed.');
      }
    };

    confirm().then(() => console.log('Account confirmed'));
  }, [confirmAccount, confirmationToken, dispatch, navigate]);

  return isLoading ? (
    <CustomLoadingOverlay message={'Loading...'} />
  ) : (
    <div className={styles.page}>
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar {...navConfig} />
        </div>
      </div>

      <ToastContainer className={'toast-style'} />

      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <div className="flex justify-center items-center mt-4 mb-16">
            <ResendConfirmAccountEmail token={confirmationToken} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ConfirmAccountPage;
