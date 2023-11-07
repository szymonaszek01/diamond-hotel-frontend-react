import { Outlet, Route, Routes } from 'react-router-dom';
import FullAccessAuthenticator from './FullAccessAuthenticator';
import Authenticator from './Authenticator';
import UserAuthenticator from './UserAuthenticator';
import AdminAuthenticator from './AdminAuthenticator';
import {
  ConfirmAccountPage,
  ForgotPasswordPage,
  HomePage,
  OAuth2RedirectHandlerPage,
  SessionExpiredPage,
  SignInPage,
  SignUpPage,
} from '../pages/public';
import {
  DashboardPage,
  DashboardWithoutFullAccessPage,
  EditProfilePage,
  FindRoomPage,
  ReservationPage,
} from '../pages/private';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        {/* public */}
        <Route index element={<HomePage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-in/oauth2/callback" element={<OAuth2RedirectHandlerPage />} />
        <Route path="/session-expired" element={<SessionExpiredPage />} />
        <Route path="/account/confirmation" element={<ConfirmAccountPage />} />
        <Route path="/forgot/password" element={<ForgotPasswordPage />} />

        {/* private */}
        <Route element={<Authenticator />}>
          {/* account confirmed */}
          <Route element={<FullAccessAuthenticator />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/reservations" element={<ReservationPage />} />

            {/* user */}
            <Route element={<UserAuthenticator />}>
              <Route path="/find-room" element={<FindRoomPage />} />
            </Route>

            {/* admin */}
            <Route element={<AdminAuthenticator />}></Route>
          </Route>

          {/* account not confirmed */}
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
