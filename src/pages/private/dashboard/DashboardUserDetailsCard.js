import styles from '../../../style';
import { arrowRightBlack, close, defaultUser, information } from '../../../assets';
import { useSelector } from 'react-redux';
import { selectUserDetails } from '../../../redux/features/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { role } from '../../../constants';
import { toFileResponseMapper } from '../../../util';
import { useGetUserImageByEmailMutation } from '../../../redux/api/userApiSlice';

const DashboardUserDetailsCard = ({ allRequiredData }) => {
  const userDetails = useSelector(selectUserDetails);
  const navigate = useNavigate();
  const [warning, setWarning] = useState(true);
  const [image, setImage] = useState('');

  const [getUserImageByEmail] = useGetUserImageByEmailMutation();
  useEffect(() => {
    const loadUserImage = async () => {
      try {
        const response = await getUserImageByEmail({ email: userDetails.email }).unwrap();
        const { encodedFile } = toFileResponseMapper(response);
        setImage(encodedFile);
      } catch (error) {
        console.log('Failed to load user image');
      }
    };

    loadUserImage().then(() => console.log('User image loaded'));
  }, [getUserImageByEmail]);

  return (
    <div className={`flex flex-col relative z-40`}>
      <div className="bg-black-gradient rounded-[10px] box-shadow w-full">
        <div className={`${allRequiredData || !warning ? 'hidden' : ''} p-5`}>
          <div className="text-white p-5 flex flex-col box-shadow justify-center items-start gap-5 rounded-[10px]">
            <div className="flex flex-col sm:flex-row justify-center sm:justify-end items-center w-full">
              <img
                src={close}
                alt="close"
                className="w-[17px] h-auto cursor-pointer"
                onClick={() => setWarning(false)}
              />
            </div>
            <div className="flex flex-col sm:flex-row justify-center sm:justify-start items-center gap-5 w-full">
              <img src={information} alt="information" className="w-[40px] h-auto" />
              <p className={`${styles.paragraph} text-sm text-white break-all`}>
                Please, fill all required data to in your{' '}
                <span
                  className={`${styles.paragraph} text-sm font-semibold text-white cursor-pointer break-all`}
                  onClick={() => navigate('/edit-profile')}>
                  user profile
                </span>{' '}
                to get full access.
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-start gap-8 p-5 items-center sm:items-start">
          <div className={`rounded-[10px] h-auto ${image ? '' : 'p-5 box-shadow'} w-[120px]`}>
            <img
              src={image ? 'data:image/png;base64,' + image : defaultUser}
              className={`${image ? 'rounded-[10px]' : ''}`}
              alt="user-profile-img"
            />
          </div>
          <div className="flex flex-col justify-center items-center sm:items-start text-center sm:text-start gap-2">
            <p
              className={`flex flex-col text-sm text-center sm:text-start text-dimWhite font-poppins font-thin leading-10 sm:leading-8 gap-2`}>
              <span className={'text-2xl font-semibold text-white'}>
                Welcome back {userDetails?.firstname}!
              </span>
              <span>We're thrilled to see you again.</span>
            </p>
            <a href="/edit-profile" className={`${styles.button} mt-2 text-sm p-3 box-shadow`}>
              Edit profile
            </a>
          </div>
        </div>
        <div className="sm:mt-3 pb-5 px-5 sm:p-5 flex flex-col justify-start items-center sm:items-start gap-5 rounded-b-[10px] ">
          <p className={`font-poppins text-[13.5px] text-white break-all`}>
            {userDetails.role === role.user ? 'Before your arrival' : 'As an administrator'}
          </p>
          <div
            className={`flex flex-col sm:flex-row justify-between bg-yellow-gradient items-center text-center sm:text-start rounded-[4px] py-3 px-4 message-button w-full cursor-pointer gap-3 sm:gap-0`}
            onClick={() =>
              navigate(userDetails.role === role.admin ? '/reservations' : '/dashboard')
            }>
            <p className={`font-poppins text-xs break-all text-black`}>
              {userDetails.role === role.user
                ? 'Please let us know about special requests'
                : 'PLease check upcoming reservations'}
            </p>
            <img
              id="arrow-right"
              src={arrowRightBlack}
              alt="arrow-up"
              className="w-[23px] h-[23px] object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardUserDetailsCard;
