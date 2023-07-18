import {useSelector} from "react-redux";
import {Navigate, Outlet, useLocation} from "react-router-dom";
import {selectCurrentRefreshToken} from "../redux/features/authSlice";

export const Authenticator = () => {
  const refreshToken = useSelector(selectCurrentRefreshToken)
  const location = useLocation()

  return (
    refreshToken
      ? <Outlet/>
      : <Navigate to="/session-expired" state={{from: location}} replace/>
  )
}

export default Authenticator