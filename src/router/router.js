import {Route, Routes} from "react-router-dom";
import Layout from "../components/Layout";
import HomePage from "../pages/public/home.page";
import Authenticator from "../components/Autheticator";
import SignInPage from "../pages/public/signIn.page";
import OAuth2RedirectHandlerPage from "../pages/public/oAuth2RedirectHandler.page";
import UserDashboardPage from "../pages/private/user-dashboard.page";
import SessionExpiredPage from "../pages/public/sessionExpired.page";
import ConfirmAccountPage from "../pages/public/confirmAccount.page";
import ForgotPasswordPage from "../pages/public/forgotPassword.page";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        {/* public router */}
        <Route index element={<HomePage/>}/>
        <Route path="/sign-in" element={<SignInPage/>}/>
        <Route path="/sign-in/oauth2/callback" element={<OAuth2RedirectHandlerPage/>}/>
        <Route path="/session-expired" element={<SessionExpiredPage/>}/>
        <Route path="/account/confirmation" element={<ConfirmAccountPage/>}/>
        <Route path="/change/password" element={<ForgotPasswordPage/>}/>

        {/* private router */}
        <Route element={<Authenticator/>}>
          <Route path="/dashboard" element={<UserDashboardPage/>}/>
        </Route>
      </Route>
    </Routes>
  )
}

export default Router