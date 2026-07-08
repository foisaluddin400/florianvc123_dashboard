import EditPropertyFiles from "../pages/admin/properties/details/EditPropertyFiles";
import PropertyPackageDetails from "../pages/admin/properties/details/PropertyPackageDetails";
import { lazyLoad } from "./lazyLoad";

/* Dashboard */
const AdminDashboard = lazyLoad("admin/AdminDashboard");

/* Clients */
const ManageClients = lazyLoad("admin/clients/ManageClients");
import AdminManager from "../pages/admin/addAdmin/AdminManager";
import ManageListing from "../pages/admin/manageListing/ManageListing";
import ManageListingDetails from "../pages/admin/manageListing/ManageListingDetails";
import UserManage from "../pages/admin/userManage/UserManage";
import UserManageDetails from "../pages/admin/userManage/UserManageDetails";
const ClientDetails = lazyLoad("admin/clients/ClientDetails");

/* Properties */
const ManageProperties = lazyLoad("admin/properties/ManagePropertise");
const PropertyDetails = lazyLoad("admin/properties/details/PropertyDetails");
const PropertyFiles = lazyLoad("admin/properties/details/PropertyFiles");
const PaymentInvoices = lazyLoad("admin/properties/details/PaymentInvoices");
const PaymentInvoiceDetails = lazyLoad(
  "admin/properties/details/PaymentInvoiceDetails",
);
const PaymentPlanDetails = lazyLoad(
  "admin/properties/details/PaymentPlanDetails",
);
const ConstructionProgress = lazyLoad(
  "admin/properties/details/ConstructionProgress",
);
const AssignedManager = lazyLoad("admin/properties/details/AssignedManager");
const SiteUpdates = lazyLoad("admin/properties/details/SiteUpdates");
const AddSiteUpdate = lazyLoad("admin/properties/details/AddSiteUpdate");
const EditSiteUpdate = lazyLoad("admin/properties/details/EditSiteUpdate");
const PropertyPackages = lazyLoad("admin/properties/details/PropertyPackages");
const EditPropertyPackage = lazyLoad(
  "admin/properties/details/EditPropertyPackage",
);
const AddPropertyPackage = lazyLoad(
  "admin/properties/details/AddPropertyPackage",
);
const AddPaymentInvoice = lazyLoad(
  "admin/properties/details/AddPaymentInvoice",
);
const EditPaymentInvoice = lazyLoad(
  "admin/properties/details/EditPaymentInvoice",
);

/* Property Manager */
const PropertyManager = lazyLoad("admin/property-manager/PropertyManager");
const PropertyManagerDetails = lazyLoad(
  "admin/property-manager/PropertyManagerDetails",
);
const AddPropertyManager = lazyLoad(
  "admin/property-manager/AddPropertyManager",
);

/* Content Management */
const ManageContent = lazyLoad("admin/content-manage/ManageContent");
const MarketUpdateDetails = lazyLoad(
  "admin/content-manage/market-updates/MarketUpdateDetails",
);
const LegalUpdateDetails = lazyLoad(
  "admin/content-manage/legal-updates/LegalUpdateDetails",
);
const LifestyleUpdateDetails = lazyLoad(
  "admin/content-manage/lifestyle/LifestyleUpdateDetails",
);
const NewProjectDetails = lazyLoad(
  "admin/content-manage/newProjects/NewProjectDetails",
);
const InterestedClientProfile = lazyLoad(
  "admin/content-manage/newProjects/InterestedClientProfile",
);
const ManageContentProfile = lazyLoad(
  "admin/content-manage/ManageContentProfile",
);

/* Content Manager */
const ContentManager = lazyLoad("admin/content-manager-manage/ContentManager");
const ContenManagerDetails = lazyLoad(
  "admin/content-manager-manage/conten-manager-details/ContenManagerDetails",
);
const AddContentManager = lazyLoad(
  "admin/content-manager-manage/AddContentManager",
);

/* Support Team */
const SupportTeamMember = lazyLoad(
  "admin/support-team-member/SupportTeamMember",
);
const SupportMemberDetails = lazyLoad(
  "admin/support-team-member/details/SupportMemberDetails",
);
const AddSupportMember = lazyLoad("admin/support-team-member/AddSupportMember");

/* Documents */
const Terms = lazyLoad("admin/documents/Terms");
const PrivacyPolicy = lazyLoad("admin/documents/PrivacyPolicy");
const LegalCompanyInfo = lazyLoad("admin/documents/LegalCompanyInfo");
const UpdateCompanyInfo = lazyLoad("admin/documents/UpdateCompanyInfo");

/* Profile */
const AdminProfile = lazyLoad("admin/manage-profile/AdminProfile");
const UpdateProfile = lazyLoad("admin/manage-profile/UpdateProfile");
const ChangePassword = lazyLoad("admin/manage-profile/ChangePassword");

export const adminRoutes = {
  path: "/admin",
  children: [
    /* Dashboard */
    {
      path: "dashboard",
      element: <AdminDashboard />,
    },
    {
      path: "manage",
      element: <AdminManager/>,
    },
    // {
    //   path: "manage-listing",
    //   element: <ManageListing/>,
    // },
    

    /* Clients */
    {
      path: "clients",
      children: [
        { index: true, element: <ManageClients /> },
        { path: ":id", element: <ClientDetails /> },
      ],
    },
  {
      path: "manage-listing",
      children: [
        { index: true, element: <ManageListing /> },
        { path: ":id", element: <ManageListingDetails /> },
      ],
    },
  
  {
      path: "manage-user",
      children: [
        { index: true, element: <UserManage /> },
        { path: ":id", element: <UserManageDetails /> },
      ],
    },
    /* Properties */
    {
      path: "properties",
      children: [
        { index: true, element: <ManageProperties /> },
        { path: ":id", element: <PropertyDetails /> },
        { path: "files", element: <PropertyFiles /> },
        { path: "invoices", element: <PaymentInvoices /> },
        { path: "invoices/:id", element: <PaymentInvoiceDetails /> },
        { path: "payment-plan/:id", element: <PaymentPlanDetails /> },
        { path: "progress", element: <ConstructionProgress /> },
        { path: "manager", element: <AssignedManager /> },
        { path: "site-updates", element: <SiteUpdates /> },
        { path: "site-updates/add", element: <AddSiteUpdate /> },
        { path: "site-updates/edit/:id", element: <EditSiteUpdate /> },
        { path: "file-updates/edit/:id", element: <EditPropertyFiles /> },
        { path: "packages", element: <PropertyPackages /> },
        { path: "packages/edit/:id", element: <EditPropertyPackage /> },
        { path: "packages/add", element: <AddPropertyPackage /> },
        { path: "packages/details/:id", element: <PropertyPackageDetails /> },
        { path: "payment-plan/add", element: <AddPaymentInvoice /> },
        { path: "payment-plan/edit/:id", element: <EditPaymentInvoice /> },
      ],
    },

    /* Property Manager */
    {
      path: "property-manager",
      children: [
        { index: true, element: <PropertyManager /> },
        { path: "add", element: <AddPropertyManager /> },
        { path: ":id", element: <PropertyManagerDetails /> },
      ],
    },

    /* Content Management */
    {
      path: "content-management",
      element: <ManageContent />,
    },

    {
      path: "content-manage",
      children: [
        { path: "market-updates/:id", element: <MarketUpdateDetails /> },
        { path: "legal-updates/:id", element: <LegalUpdateDetails /> },
        { path: "lifestyle-updates/:id", element: <LifestyleUpdateDetails /> },
        { path: "new-projects/:id", element: <NewProjectDetails /> },
        {
          path: "interested-clients/:id",
          element: <InterestedClientProfile />,
        },
        { path: "client-profile/:id", element: <ManageContentProfile /> },
      ],
    },

    /* Content Manager */
    {
      path: "content-manager",
      children: [
        { index: true, element: <ContentManager /> },
        { path: "add", element: <AddContentManager /> },
        { path: ":id", element: <ContenManagerDetails /> },
      ],
    },

    /* Support */
    {
      path: "support",
      children: [
        { index: true, element: <SupportTeamMember /> },
        { path: "add", element: <AddSupportMember /> },
        { path: ":id", element: <SupportMemberDetails /> },
      ],
    },

    /* Documents */
    {
      path: "terms-and-conditions",
      element: <Terms />,
    },
    {
      path: "privacy-policy",
      element: <PrivacyPolicy />,
    },
    {
      path: "legal",
      element: <LegalCompanyInfo />,
    },
    {
      path: "legal-company-info/edit",
      element: <UpdateCompanyInfo />,
    },

  
    {
      path: "profile",
      children: [
        { index: true, element: <AdminProfile /> },
        { path: "update", element: <UpdateProfile /> },
        { path: "change-password", element: <ChangePassword /> },
      ],
    },
  ],
};
