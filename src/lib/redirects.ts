import type { Role } from "./roles";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function RedirectByRole(role: Role, navigate: any) {
  switch (role) {
    case "SUPER_ADMIN":
      navigate("/admin/dashboard");
      break;

       case "ADMIN":
      navigate("/admin/dashboard");
      break;
    case "PROPERTY_MANAGER":
      navigate("/property-admin/dashboard");
      break;
    case "CONTENT_MANAGER":
      navigate("/content-manager/dashboard");
      break;
    case "SUPPORT_MEMBER":
      navigate("/support/dashboard");
      break;

 case "USER_MANAGER":
      navigate("/user-manager/dashboard");
      break;

    default:
      navigate("/");
      break;
  }
}
