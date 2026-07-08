import { createBrowserRouter } from "react-router";
import CheckRoutes from '../pages/CheckRoutes';
import ForgotOtp from "../pages/ForgotOtp";
import ForgotPassword from "../pages/ForgotPassword";
import Login from "../pages/Login";
import ResetPassword from "../pages/ResetPassword";
import { adminRoutes } from "./AdminRoutes";
import { ContentManagerRoutes } from "./ContentManagerRoutes";
import MainLayOut from "./MainLayOut";
import { PropertiesManagerRoutes } from "./PropertiesManagerRoutes";
import { SupportManagerRoutes } from "./SupportManagerRoutes";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />
  },
  {
    path: "/forgot-otp",
    element: <ForgotOtp />
  },
  {
    path: "/reset-password",
    element: <ResetPassword />
  },
  {
    path: "/",
    element: <CheckRoutes />
  },
  {
    path: "/",
    element: <MainLayOut />,
    children: [
      adminRoutes,
      ContentManagerRoutes,
      SupportManagerRoutes,
      PropertiesManagerRoutes,
      {
        path: "*",
        element: <h1>404</h1>
      }
    ]
  },

])

export default router