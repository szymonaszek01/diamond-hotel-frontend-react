import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isConfirmed, selectFullAccess, selectUserId } from '../redux/features/auth/authSlice';

const FullAccessAuthenticator = () => {
  const location = useLocation();
  const userId = useSelector(selectUserId);
  const confirmed = useSelector(isConfirmed);
  const fullAccess = useSelector(selectFullAccess);
  const accountConfirmed = userId && confirmed;

  return accountConfirmed && fullAccess ? (
    <Outlet />
  ) : (
    <Navigate to={'/dashboard-without-full-access'} state={{ from: location }} replace />
  );
};

export default FullAccessAuthenticator;
