import UserManagerDashboard from "../pages/userManager/UserManagerDashboard";


export const SupportManagerRoutes = {
  children: [
    {
      path: "/user-manager/dashboard",
      element: <UserManagerDashboard />,
    },

  ],
};