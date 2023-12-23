import { Footer, Navbar } from '../../../components';
import styles from '../../../style';
import { publicNavLinks } from '../../../constants';
import RegisterForm from './RegisterForm';

const SignUpPage = () => {
  const navConfig = {
    page: 'Sign up',
    isToggled: true,
    navbarLinks: publicNavLinks,
    textWhite: true,
    logoWhite: true,
    fullAccess: true,
  };

  return (
    <div className={`${styles.page} px-6 sm:px-16`}>
      <div className="absolute z-[0] w-[60%] h-[60%] -left-[50%] rounded-full yellow-gradient bottom-40" />

      <div className={`${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar {...navConfig} />
        </div>
      </div>

      <div className={`${styles.flexCenter} py-20`}>
        <div className={`${styles.boxWidth}`}>
          <RegisterForm />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignUpPage;
