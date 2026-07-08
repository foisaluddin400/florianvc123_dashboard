import ChangePassword from "../pages/admin/manage-profile/ChangePassword";
import UpdateProfile from "../pages/admin/manage-profile/UpdateProfile";
import Chat from "../pages/support-manager/chat-manegment/Chat";
import SupportManagerProfile from "../pages/support-manager/support-manager-profile/SupportManagerProfile";
import SupportManagerDashboard from "../pages/support-manager/SupportManagerDashboard";

export const SupportManagerRoutes = {
  children: [
    {
      path: "/support-manager/dashboard",
      element: <SupportManagerDashboard />,
    },
    {
      path: "/support-manager/chat",
      element: <Chat />
    },
    {
      path: "/support-manager/profile",
      element: <SupportManagerProfile />
    },
    {
      path: "/support-manager/profile/change-password",
      element: <ChangePassword />
    },
    {
      path: "/support-manager/profile/update-profile",
      element: <UpdateProfile />
    }
  ],
};