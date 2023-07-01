import {useSelector} from "react-redux";
import {Navigate, Outlet, useLocation} from "react-router-dom";
import {selectCurrentToken} from "../redux/features/authSlice";

export const Authenticator = () => {
  const token = useSelector(selectCurrentToken)
  const location = useLocation()

  return (
    token
      ? <Outlet/>
      : <Navigate to="/" state={{from: location}} replace/>
  )
}

export default Authenticator