import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { selectExpired, selectRefreshToken } from '../redux/features/auth/authSlice';

export const Authenticator = () => {
  const refreshToken = useSelector(selectRefreshToken);
  const expired = useSelector(selectExpired);
  const location = useLocation();

  return refreshToken ? (
    <Outlet />
  ) : (
    <Navigate to={expired ? '/session-expired' : '/'} state={{ from: location }} replace />
  );
};

export default Authenticator;
