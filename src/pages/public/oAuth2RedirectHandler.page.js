import {Navigate, useLocation} from "react-router-dom";
import {setCredentials} from "../../redux/features/authSlice";
import {store} from "../../redux/store";

const OAuth2RedirectHandlerPage = () => {
  const getUrlParam = (name) => {
    const queryParams = new URLSearchParams(window.location.search)
    const encodedParam = queryParams.get(name)

    return encodedParam ? decodeURIComponent(encodedParam) : null
  }

  const location = useLocation()
  const error = getUrlParam("error")
  if (error) {
    return (
      <Navigate to={"/sign-in"} state={{from: location}}/>
    )
  }

  const accessToken = getUrlParam("access-token")
  const refreshToken = getUrlParam("refresh-token")
  const user = getUrlParam("email")
  const confirmed = getUrlParam("confirmed")
  if (accessToken && user) {
    store.dispatch(setCredentials({user, accessToken, refreshToken, confirmed}))
  }

  const getPathName = () => {
    return accessToken && user ? "/dashboard" : "/sign-in"
  }

  return (
    <Navigate to={getPathName()} state={{from: location}}/>
  )
}

export default OAuth2RedirectHandlerPage