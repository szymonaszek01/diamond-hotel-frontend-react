import { useNavigate } from 'react-router-dom';
import {
  setAccountDetails,
  setFullAccess,
  setOAuth2Error,
} from '../../redux/features/auth/authSlice';
import { useDispatch } from 'react-redux';
import { isFullAccess, urlParam } from '../../util';
import { setUserDetails } from '../../redux/features/user/userSlice';
import { toUserDetailsResMapper } from '../../redux/features/user/userMapper';
import { useGetUserByIdMutation } from '../../redux/api/userApiSlice';
import { CustomLoadingOverlay, Navbar } from '../../components';
import styles from '../../style';
import { publicNavLinks } from '../../constants';
import { useEffect } from 'react';

const OAuth2RedirectHandlerPage = () => {
  const navConfig = {
    page: null,
    isToggled: false,
    navbarLinks: publicNavLinks,
    textWhite: true,
    logoWhite: true,
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const search = window.location.search;
  const [getUser, { isLoading }] = useGetUserByIdMutation();

  const error = urlParam('error', search);
  if (error) {
    dispatch(setOAuth2Error({ error: error }));
    navigate('/sign-in');
  }

  const accessToken = urlParam('access-token', search);
  const refreshToken = urlParam('refresh-token', search);
  const user = urlParam('email', search);
  const confirmed = urlParam('confirmed', search) === 'true';
  const id = Number.parseInt(urlParam('id', search));

  useEffect(() => {
    const loadUserDetails = async () => {
      try {
        const response = await getUser(id).unwrap();
        const userDetails = toUserDetailsResMapper(response);
        dispatch(setFullAccess({ fullAccess: isFullAccess(userDetails) }));
        dispatch(setUserDetails(userDetails));
      } catch (error) {
        console.log(error);
      }
    };

    if (accessToken && user) {
      dispatch(setAccountDetails({ user, id, accessToken, refreshToken, confirmed }));
      loadUserDetails()
        .then(() => navigate('/dashboard'))
        .catch(() => {
          dispatch(setOAuth2Error({ error: 'Failed to load user details.' }));
          navigate('sign-in');
        });
    } else {
      navigate('/sign-in');
    }
  }, [id, getUser, dispatch, confirmed, accessToken, user, refreshToken, navigate]);

  return isLoading ? (
    <CustomLoadingOverlay message={'Please wait while we securely log you in...'} />
  ) : (
    <div className={styles.page}>
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar {...navConfig} />
        </div>
      </div>
    </div>
  );
};

export default OAuth2RedirectHandlerPage;
