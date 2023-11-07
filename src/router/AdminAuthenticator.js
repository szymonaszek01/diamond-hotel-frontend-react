import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserRole } from '../redux/features/user/userSlice';
import { role } from '../constants';

const AdminAuthenticator = () => {
  const location = useLocation();
  const userRole = useSelector(selectUserRole);

  return userRole === role.admin ? (
    <Outlet />
  ) : (
    <Navigate to={'/dashboard'} state={{ from: location }} replace />
  );
};

export default AdminAuthenticator;
