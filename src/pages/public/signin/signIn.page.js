import styles from '../../../style';
import { Footer, Navbar } from '../../../components';
import { publicNavLinks } from '../../../constants';
import LoginForm from './LoginForm';

const SignInPage = () => {
  const navConfig = {
    page: 'Sign in',
    isToggled: true,
    navbarLinks: publicNavLinks,
    textWhite: true,
    logoWhite: true,
    fullAccess: true,
  };

  return (
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
