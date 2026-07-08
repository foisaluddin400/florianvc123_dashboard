import type { UserRole } from '../types/roles';

// hossain vai
// export const ROLE_ROUTES: Record<UserRole, string> = {
//   admin: "/admin/dashboard",
//   property_admin: "/property-admin/dashboard",
//   content_admin: "/content-manager/dashboard",
//   SUPPORT_MEMBER: "/support-manager/dashboard",
// };

// me
export const ROLE_ROUTES: Record<UserRole, string> = {
  SUPER_ADMIN: "/admin/dashboard",
  ADMIN: "/admin/dashboard",
  USER_MANAGER:"/user-manager/dashboard",
  PROPERTY_MANAGER: "/property-admin/dashboard",
  CONTENT_MANAGER: "/content-manager/dashboard",
  SUPPORT_MEMBER: "/support-manager/dashboard",
};