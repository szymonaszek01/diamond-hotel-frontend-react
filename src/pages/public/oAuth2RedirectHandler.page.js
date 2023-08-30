import {Navigate, useLocation} from "react-router-dom";
import {setAccountDetails, setOAuth2Error} from "../../redux/features/authSlice";
import {store} from "../../redux/store";
import {useDispatch} from "react-redux";

const OAuth2RedirectHandlerPage = () => {
  const getUrlParam = (name) => {
    const queryParams = new URLSearchParams(window.location.search)
    const encodedParam = queryParams.get(name)

    return encodedParam ? decodeURIComponent(encodedParam) : null
  }

  const location = useLocation()
  const dispatch = useDispatch()
  const error = getUrlParam("error")
  if (error) {
    dispatch(setOAuth2Error({error: error}))
    return (
      <Navigate to={"/sign-in"} state={{from: location}}/>
    )
  }

  const accessToken = getUrlParam("access-token")
  const refreshToken = getUrlParam("refresh-token")
  const user = getUrlParam("email")
  const confirmed = getUrlParam("confirmed") === "true"
  const id = Number.parseInt(getUrlParam("id"))
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