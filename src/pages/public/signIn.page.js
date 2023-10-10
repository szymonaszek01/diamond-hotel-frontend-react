import styles from '../../style';
import { Footer, LoginForm, Navbar } from '../../components';
import { publicNavLinks } from '../../constants';
import { selectUser } from '../../redux/features/auth/authSlice';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const SignInPage = () => {
  const navConfig = {
    page: 'Sign in',
    isToggled: true,
    navbarLinks: publicNavLinks,
    textWhite: true,
    logoWhite: true,
  };

  const user = useSelector(selectUser);
  const location = useLocation();

  return user ? (
    <Navigate to="/dashboard" state={{ from: location }} replace />
  ) : (
    <div className={styles.page}>
      <div className="absolute z-[0] w-[60%] h-[60%] -left-[50%] rounded-full blue__gradient bottom-40" />

      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar {...navConfig} />
        </div>
      </div>

      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <LoginForm />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignInPage;
