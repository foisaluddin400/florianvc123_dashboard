"use client";
import { UserAccountIcon, ViewIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useNavigate, useParams } from "react-router-dom";
import FormalCard from "../../../components/shared/cards/FormalCard";
import DynamicTable from "../../../components/shared/DynamicTable";
import ImageGallery from "../../../components/shared/imageComponents/ImageGallery";
import { PageContent, PageLayout } from "../../../components/shared/PageLayout";
import Space from "../../../components/shared/Space";
import { Button } from "../../../components/ui/button";
import { cn } from "../../../lib/utils";
import { useEffect } from "react";
import { useGetSingleClientPropertyQuery, useGetSinglePropertyQuery } from "../../../redux/property/propertyApis";


function PropertiseDetailsForPropertyPanel() {
  const navigate = useNavigate();
  const params = useParams();

  const { data: propertyData } = useGetSinglePropertyQuery(params?.id);
  const property = propertyData?.data;
  console.log("property details", property);
const {data:clientData} = useGetSingleClientPropertyQuery(params?.id)
console.log(clientData)
const clients = clientData?.data || []
const clie = clients.map((item: any) => ({
  id: item?.client?.id,
  profileImage: item?.client?.profileImage,
  name: item?.client?.name,
  email: item?.client?.email,
  phone: item?.client?.phone,
  assignedProperty: item?.client?.assignedProperty,
  joinedOn: item?.client?.joinedOn,
  status: item.status
}));


  useEffect(() => {
    if (property?.id) {
      localStorage.setItem("selectedPropertyId", property.id);
    }
  }, [property?.id]);
  console.log(property);
  const formatStatus = (status?: string) => {
    if (!status) return "—";
    return status
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const propertyInvoiceData = [
    {
      title: "Property Files",
      value: `${property?.totalFiles ?? 0} files`,
      route: "/admin/properties/files",
    },
    {
      title: "Payment Invoices",
      value: `${property?.totalInvoice ?? 0}`,
      route: "/admin/properties/invoices",
    },
    {
      title: "Construction Progress",
      value:
        property?.constructionProgressPercentage != null
          ? `${property.constructionProgressPercentage}%`
          : formatStatus(property?.status),
      route: "/admin/properties/progress",
    },
    {
      title: "Site Updates",
      value: property?.totalImages || "0",
      route: "/admin/properties/site-updates",
    },
    {
      title: "Property Packages",
      value: property?.totalPackages || "0",
      route: "/admin/properties/packages",
    },
    {
      title: "Assigned Manager ",
      value: property?.manager?.name || "—",
      route: "/admin/properties/manager",
    },
  ];


  const fallBackImage =
    "https://krita-artists.org/uploads/default/original/3X/c/f/cfc4990e32f31acd695481944f2163e96ff7c6ba.jpeg";
  const handlerError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (e.currentTarget.src === fallBackImage) {
      return;
    }
    e.currentTarget.src = fallBackImage;
  };

  const propertyColumns = [
    {
      header: "Name",
      accessorKey: "name",
      cell: ({ row }: any) => {
        return (
          <div className="flex items-center gap-2">
            <img
              src={row.original.profileImage || fallBackImage}
              alt={row.original.name}
              onError={handlerError}
              className="w-10 h-10 rounded-full object-cover"
            />
            <span>{row.original.name}</span>
          </div>
        );
      },
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Phone",
      accessorKey: "phone",
    },
   
    {
      header: "Joined On",
      accessorKey: "joinedOn",
    },
   
    {
      header: "action",
      accessorKey: "id",
      cell: ({ row }: any) => {
        return (
          <Button
            onClick={() =>
              navigate(`/property-admin/clients-details/${row.original.id}`)
            }
            variant="outline"
            size="sm"
          >
            <HugeiconsIcon icon={UserAccountIcon} />
          </Button>
        );
      },
    },
  ];
  // <---------property info--------->
  type PropertyInformation = {
    id: string;
    name: string;
    propertyInfo: string;
    images: string[];
  };
  const propertyInfoData: PropertyInformation = {
    id: property?.id || "prop-01",
    name: property?.name || "Property Name",
    propertyInfo: property?.name || "—",
    images: property?.images || [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=400&q=80",
    ],
  };

  // Dynamic property details data
  const propertyDetails = [
    {
      id: "prop-name",
      label: "Property Name",
      value: property?.name || "—",
      fullWidth: false,
    },
    {
      id: "prop-type",
      label: "Property Type",
      value: property?.type || "—",
      fullWidth: false,
    },
    {
      id: "prop-size",
      label: "Property Size",
      value: property?.size ? `${property.size}` : "—",
      fullWidth: false,
    },
    {
      id: "prop-rooms",
      label: "Rooms",
      value: property?.totalRooms ? `${property.totalRooms}` : "—",
      fullWidth: false,
    },
    {
      id: "prop-status",
      label: "Status",
      value: formatStatus(property?.status),
      fullWidth: false,
    },
    {
      id: "prop-payment",
      label: "Payment Plan",
      value: property?.paymentPlan || "—",
      fullWidth: false,
    },
    {
      id: "prop-progress",
      label: "Construction Progress",
      value:
        property?.constructionProgressPercentage != null
          ? `${property.constructionProgressPercentage}%`
          : "—",
      fullWidth: false,
    },
    {
      id: "prop-units",
      label: "Units",
      value: property?.units ? `${property.units}` : "—",
      fullWidth: false,
    },
    {
      id: "prop-location",
      label: "Property Location",
      value: property?.address || "—",
      fullWidth: true,
    },
  ];

  
  return (
    <PageLayout title="Property Detail">
      <PageContent>
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
          <div className="flex-1">
            <ImageGallery images={propertyInfoData.images} />
          </div>
          <div className="flex-2">
            <FormalCard header="Property Invoices">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {propertyInvoiceData.map((item, index) => (
                  <div
                    className={cn(
                      "border flex justify-between border-[#DDDDDD] p-4 rounded-md",
                    )}
                    key={index}
                  >
                    <div>
                      <h3 className="text-[#B0B0B0] font-nunito-semibold-italic text-sm ">
                        {item.title}
                      </h3>
                      <p className="text-base">{item.value}</p>
                    </div>
                    <Button
                      onClick={() =>
                        navigate(item?.route, { state: { id: property?.id } })
                      }
                      className="bg-brand/20 text-brand hover:bg-brand/30 hover:text-brand cursor-pointer"
                      type="button"
                      variant="outline"
                    >
                      <HugeiconsIcon size={16} icon={ViewIcon} />
                    </Button>
                  </div>
                ))}
              </div>
            </FormalCard>
          </div>
        </div>
        <Space size={4} />
        <FormalCard header="Property information">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {propertyDetails.map((detail) => (
              <div
                key={detail.id}
                className={cn(
                  "p-1",
                  detail.fullWidth ? "sm:col-span-2 md:col-span-3" : "",
                )}
              >
                <h3 className="text-[#B0B0B0] font-nunito-semibold-italic text-sm">
                  {detail.label}
                </h3>
                <p className="font-bold text-[#666666] text-[16px]">
                  {detail.value}
                </p>
              </div>
            ))}
          </div>
        </FormalCard>
        <Space size={4} />
        <FormalCard header="Property Clients">
          <DynamicTable data={clie} columns={propertyColumns} />
        </FormalCard>
      </PageContent>
    </PageLayout>
  );
}

export default PropertiseDetailsForPropertyPanel;