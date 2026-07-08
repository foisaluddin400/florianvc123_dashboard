import {
  AiContentGenerator02Icon,
  Analytics02Icon,
  City01Icon,
  CourtLawIcon,
  CustomerSupportIcon,
  JusticeScale01Icon,
  PolicyIcon,
  UserEdit01Icon,
  UserIcon,
  UserSettings01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { ROLES } from "../lib/roles";


export const MENU = {
  [ROLES.SUPER_ADMIN as keyof typeof ROLES]: [
    {
      title: "Dashboard",
      icon: <HugeiconsIcon icon={Analytics02Icon} />,
      path: "/admin/dashboard",
    },
    {
      title: "Clients",
      icon: <HugeiconsIcon icon={UserIcon} />,
      path: "/admin/clients",
    },
    {
      title:"Admin",
      icon :  <HugeiconsIcon icon={UserEdit01Icon} />,
      path :"/admin/manage"
    },
    {
      title:"Manage Users ",
      icon :  <HugeiconsIcon icon={UserSettings01Icon} />,
      path :"/admin/manage-user"
    },
    {
      title:"Manage List",
      icon :  <HugeiconsIcon icon={UserIcon} />,
      path :"/admin/manage-listing"
    },
    {
      title: "Manage Properties",
      icon: <HugeiconsIcon icon={City01Icon} />,
      path: "/admin/properties",
    },
    {
      title: "Property Manager",
      icon: <HugeiconsIcon icon={UserEdit01Icon} />,
      path: "/admin/property-manager",
    },
    {
      title: "Manage Content",
      icon: <HugeiconsIcon icon={AiContentGenerator02Icon} />,
      path: "/admin/content-management",
    },
    {
      title: "Content Manager",
      icon: <HugeiconsIcon icon={UserEdit01Icon} />,
      path: "/admin/content-manager",
    },
    {
      title: "Support Team",
      icon: <HugeiconsIcon icon={CustomerSupportIcon} />,
      path: "/admin/support",
    },
    {
      title: "Terms & Conditions",
      icon: <HugeiconsIcon icon={CourtLawIcon} />,
      path: "/admin/terms-and-conditions",
    },
    {
      title: "Privacy Policy",
      icon: <HugeiconsIcon icon={PolicyIcon} />,
      path: "/admin/privacy-policy",
    },
    {
      title: "Legal & Company Info",
      icon: <HugeiconsIcon icon={JusticeScale01Icon} />,
      path: "/admin/legal",
    },
    {
      title: "Manage Profile",
      icon: <HugeiconsIcon icon={UserSettings01Icon} />,
      path: "/admin/profile",
    },
  ] as const,


  [ROLES.ADMIN as keyof typeof ROLES]: [
    {
      title: "Dashboard",
      icon: <HugeiconsIcon icon={Analytics02Icon} />,
      path: "/admin/dashboard",
    },
    {
      title: "Clients",
      icon: <HugeiconsIcon icon={UserIcon} />,
      path: "/admin/clients",
    },
    {
      title:"Manage Users ",
      icon :  <HugeiconsIcon icon={UserSettings01Icon} />,
      path :"/admin/manage-user"
    },
    {
      title:"Manage List",
      icon :  <HugeiconsIcon icon={UserIcon} />,
      path :"/admin/manage-listing"
    },
    {
      title: "Manage Properties",
      icon: <HugeiconsIcon icon={City01Icon} />,
      path: "/admin/properties",
    },
    {
      title: "Property Manager",
      icon: <HugeiconsIcon icon={UserEdit01Icon} />,
      path: "/admin/property-manager",
    },
    {
      title: "Manage Content",
      icon: <HugeiconsIcon icon={AiContentGenerator02Icon} />,
      path: "/admin/content-management",
    },
    {
      title: "Content Manager",
      icon: <HugeiconsIcon icon={UserEdit01Icon} />,
      path: "/admin/content-manager",
    },
    {
      title: "Support Team",
      icon: <HugeiconsIcon icon={CustomerSupportIcon} />,
      path: "/admin/support",
    },
    {
      title: "Terms & Conditions",
      icon: <HugeiconsIcon icon={CourtLawIcon} />,
      path: "/admin/terms-and-conditions",
    },
    {
      title: "Privacy Policy",
      icon: <HugeiconsIcon icon={PolicyIcon} />,
      path: "/admin/privacy-policy",
    },
    {
      title: "Legal & Company Info",
      icon: <HugeiconsIcon icon={JusticeScale01Icon} />,
      path: "/admin/legal",
    },
    {
      title: "Manage Profile",
      icon: <HugeiconsIcon icon={UserSettings01Icon} />,
      path: "/admin/profile",
    },
  ] as const,




  [ROLES.PROPERTY_MANAGER as keyof typeof ROLES]: [
    {
      title: "Dashboard",
      icon: <HugeiconsIcon icon={Analytics02Icon} />,
      path: "/property-admin/dashboard",
    },
    {
      title: "Clients",
      icon: <HugeiconsIcon icon={UserIcon} />,
      path: "/property-admin/clients",
    },
    {
      title: "Properties",
      icon: <HugeiconsIcon icon={City01Icon} />,
      path: "/property-admin/properties",
    },
    {
      title: "Profile",
      icon: <HugeiconsIcon icon={UserSettings01Icon} />,
      path: "/property-admin/profile",
    },
  ] as const,

  [ROLES.CONTENT_MANAGER as keyof typeof ROLES]: [
    {
      title: "Dashboard",
      icon: <HugeiconsIcon icon={Analytics02Icon} />,
      path: "/content-manager/dashboard",
    },
    {
      title: "Manage Markets",
      icon: <HugeiconsIcon icon={City01Icon} />,
      path: "/content-manager/manage-markets",
    },
    {
      title: "Legal",
      icon: <HugeiconsIcon icon={CourtLawIcon} />,
      path: "/content-manager/manage-legal",
    },
    {
      title: "Lifestyles",
      icon: <HugeiconsIcon icon={AiContentGenerator02Icon} />,
      path: "/content-manager/manage-lifestyles",
    },
    {
      title: "Projects",
      icon: <HugeiconsIcon icon={City01Icon} />,
      path: "/content-manager/manage-projects",
    },
    {
      title: "Profile",
      icon: <HugeiconsIcon icon={UserSettings01Icon} />,
      path: "/content-manager/manage-profile",
    },
  ],

  [ROLES.SUPPORT_MEMBER as keyof typeof ROLES]: [
    {
      title: "Dashboard",
      icon: <HugeiconsIcon icon={Analytics02Icon} />,
      path: "/support-manager/dashboard",
    },
    {
      title: "Support Chat",
      icon: <HugeiconsIcon icon={CustomerSupportIcon} />,
      path: "/support-manager/chat",
    },
    {
      title: "Profile",
      icon: <HugeiconsIcon icon={UserSettings01Icon} />,
      path: "/support-manager/profile",
    },
  ] as const,





  [ROLES.USER_MANAGER as keyof typeof ROLES]: [
    {
      title: "Dashboard",
      icon: <HugeiconsIcon icon={Analytics02Icon} />,
      path: "/user-manager/dashboard",
    },
   
  ] as const,
};
