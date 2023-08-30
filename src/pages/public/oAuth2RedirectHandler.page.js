import {Navigate, useLocation} from "react-router-dom";
import {setAccountDetails, setOAuth2Error} from "../../redux/features/authSlice";
import {store} from "../../redux/store";
import {useDispatch} from "react-redux";
import {urlParam} from "../../util";

const OAuth2RedirectHandlerPage = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const search = window.location.search;

  const error = urlParam("error", search)
  if (error) {
    dispatch(setOAuth2Error({error: error}))
    return (
      <Navigate to={"/sign-in"} state={{from: location}}/>
    )
  }

  const accessToken = urlParam("access-token", search)
  const refreshToken = urlParam("refresh-token", search)
  const user = urlParam("email", search)
  const confirmed = urlParam("confirmed", search) === "true"
  const id = Number.parseInt(urlParam("id", search))
  if (accessToken && user) {
    store.dispatch(setAccountDetails({user, id, accessToken, refreshToken, confirmed}))
  }

  const getPathName = () => {
    return accessToken && user ? "/dashboard" : "/sign-in"
  }

  return (
    <Navigate to={getPathName()} state={{from: location}}/>
  )
}

export default OAuth2RedirectHandlerPage