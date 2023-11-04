import { Route, Routes } from 'react-router-dom';
import { Authenticator, Confirmator, Layout } from '../components';
import HomePage from '../pages/public/home.page';
import SignInPage from '../pages/public/signIn.page';
import OAuth2RedirectHandlerPage from '../pages/public/oAuth2RedirectHandler.page';
import SessionExpiredPage from '../pages/public/sessionExpired.page';
import ConfirmAccountPage from '../pages/public/confirmAccount.page';
import ForgotPasswordPage from '../pages/public/forgotPassword.page';
import SignUpPage from '../pages/public/signUp.page';
import DashboardPage from '../pages/private/dashboard.page';
import EditProfilePage from '../pages/private/edit-profile.page';
import FindRoomPage from '../pages/private/find-room.page';
import ReservationPage from '../pages/private/reservation.page';
import DashboardWithoutFullAccessPage from '../pages/private/dashboard-without-full-access-page';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public router */}
        <Route index element={<HomePage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-in/oauth2/callback" element={<OAuth2RedirectHandlerPage />} />
        <Route path="/session-expired" element={<SessionExpiredPage />} />
        <Route path="/account/confirmation" element={<ConfirmAccountPage />} />
        <Route path="/forgot/password" element={<ForgotPasswordPage />} />

        {/* private router */}
        <Route element={<Authenticator />}>
          <Route element={<Confirmator />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/find-room" element={<FindRoomPage />} />
            <Route path="/reservations" element={<ReservationPage />} />
          </Route>
          <Route path="/edit-profile" element={<EditProfilePage />} />
          <Route
            path="/dashboard-without-full-access"
            element={<DashboardWithoutFullAccessPage />}
          />
        </Route>
      </Route>
    </Routes>
  );
};

export default Router;
