import styles from '../../../style';
import { Footer, Navbar } from '../../../components';
import { privateNavLinks } from '../../../constants';
import { useSelector } from 'react-redux';
import { selectFullAccess } from '../../../redux/features/auth/authSlice';
import AddRoomForm from './AddRoomForm';
import AddRoomTypeForm from './AddRoomTypeForm';

const AddRoomPage = () => {
  const fullAccess = useSelector(selectFullAccess);

  const navConfig = {
    page: 'Add room',
    isToggled: true,
    navbarLinks: privateNavLinks,
    logoWhite: true,
    textWhite: true,
    fullAccess: fullAccess,
  };

  return (
    <div className={`${styles.page}`}>
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar {...navConfig} />
        </div>
      </div>
      <div className="flex flex-col w-full items-center justify-center mt-8">
        <div
          className={
            'flex flex-col items-center text-center sm:text-start sm:items-start justify-center w-[70%] gap-16'
          }>
          <AddRoomForm />
          <AddRoomTypeForm />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AddRoomPage;
