import React from "react";
import { Routes, Route } from "react-router-dom";

import {
  FORGOT_PASSWORD_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  NOT_FOUND_ROUTE,
  RESET_PASSWORD_EMAIL_SENT_ROUTE,
  RESET_PASSWORD_ROUTE,
  SIGNUP_ROUTE,
  VERIFY_OTP_ROUTE,
} from "../utils/constants";

import PrivateRoute from "./Private/PrivateRoute";
import PublicRoute from "./Public/PublicRoute";
import NotFound from "../components/ui/NotFound";
import ResetPasswordEmailSent from "../components/ui/auth/ResetPasswordEmailSent";
import Test from "../pages/Test";


const Home = React.lazy(() => import("../pages/Home"));
const Login = React.lazy(() => import("../pages/auth/Login"));
const SignUp = React.lazy(() => import("../pages/auth/SignUp"));
const Otp = React.lazy(() => import("../pages/auth/Otp"));
const ForgotPassword = React.lazy(() => import("../pages/auth/ForgotPassword"));
const ResetPassword = React.lazy(() => import("../pages/auth/ResetPassword"));

const Router = () => {
  return (
    <Routes>
      <Route
        path={HOME_ROUTE}
        element={
          <PrivateRoute destination="/">
            <Home />
          </PrivateRoute>
        }
      />

      <Route
        path={LOGIN_ROUTE}
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      <Route
        path={SIGNUP_ROUTE}
        element={
          <PublicRoute>
            <SignUp />
          </PublicRoute>
        }
      />

      <Route
        path={VERIFY_OTP_ROUTE}
        element={
          <PublicRoute>
            <Otp />
          </PublicRoute>
        }
      />

      <Route
        path={FORGOT_PASSWORD_ROUTE}
        element={
          <PublicRoute>
            <ForgotPassword />
          </PublicRoute>
        }
      />

      <Route
        path={RESET_PASSWORD_ROUTE}
        element={
          <PublicRoute>
            <ResetPassword />
          </PublicRoute>
        }
      />

      <Route
        path={RESET_PASSWORD_EMAIL_SENT_ROUTE}
        element={
          <PublicRoute>
            <ResetPasswordEmailSent />
          </PublicRoute>
        }
      />

      <Route path={NOT_FOUND_ROUTE} element={<NotFound />} />
        
      <Route path="/test" element={<Test />} />
    </Routes>
  );
};

export default Router;
