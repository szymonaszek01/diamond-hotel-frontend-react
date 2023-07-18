import {Route, Routes} from "react-router-dom";
import Layout from "../components/Layout";
import HomePage from "../pages/public/home.page";
import Authenticator from "../components/Autheticator";
import SignInPage from "../pages/public/signIn.page";
import OAuth2RedirectHandler from "../components/OAuth2RedirectHandler";
import UserDashboardPage from "../pages/private/user-dashboard.page";
import SessionExpiredPage from "../pages/public/sessionExpired.page";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        {/* public router */}
        <Route index element={<HomePage/>}/>
        <Route path="/sign-in" element={<SignInPage/>}/>
        <Route path="/sign-in/oauth2/callback" element={<OAuth2RedirectHandler/>}/>
        <Route path="/session-expired" element={<SessionExpiredPage/>}/>

        {/* private router */}
        <Route element={<Authenticator/>}>
          <Route path="/dashboard" element={<UserDashboardPage/>}/>
        </Route>
      </Route>
    </Routes>
  )
}

export default Router