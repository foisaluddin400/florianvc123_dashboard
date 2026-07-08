import { UserAccountIcon, ViewIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useNavigate, useParams } from "react-router-dom";
import FormalCard from "../../../../components/shared/cards/FormalCard";
import DynamicTable from "../../../../components/shared/DynamicTable";
import ImageGallery from "../../../../components/shared/imageComponents/ImageGallery";
import {
  PageContent,
  PageLayout,
} from "../../../../components/shared/PageLayout";
import Space from "../../../../components/shared/Space";
import { Button } from "../../../../components/ui/button";
import { cn } from "../../../../lib/utils";

function PropertyDetails() {
  const { id } = useParams();
  console.log(id)
  const navigate = useNavigate();
  const propertyInvoiceData = [
    {
      title: "Property Files",
      value: "5 files",
      route: "/admin/properties/files",
    },
    {
      title: "Payment Invoices",
      value: "5 files",
      route: "/admin/properties/invoices",
    },
    {
      title: "Construction Progress",
      value: "45%",
      route: "/admin/properties/progress",
    },
    {
      title: "Site Updates",
      value: "2 files",
      route: "/admin/properties/site-updates",
    },
    {
      title: "Property Packages",
      value: "4 packages",
      route: "/admin/properties/packages",
    },
    {
      title: "Assigned Manager ",
      value: "Roberts Junior ",
      route: "/admin/properties/manager",
    },
  ];

  type PropertyClient = {
    id: string;
    profileImage: string;
    name: string;
    email: string;
    phone: string;
    assignedProperty: string;
    joinedOn: string;
    status: string;
  };

  const propertyColumns = [
    {
      header: "Name",
      accessorKey: "name",
      cell: ({ row }: any) => {
        return (
          <div className="flex items-center gap-2">
            <img
              src={row.original.profileImage}
              alt={row.original.name}
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
      header: "Assigned Property",
      accessorKey: "assignedProperty",
    },
    {
      header: "Joined On",
      accessorKey: "joinedOn",
    },
    {
      header: "Status",
      accessorKey: "status",
    },
    {
      header: "action",
      accessorKey: "id",
      cell: ({ row }: any) => {
        return (
          <Button onClick={() => console.log(row)} variant="outline" size="sm">
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
    id: "prop-01",
    name: "Property Name",
    propertyInfo: "The Wilds Project",
    images: [
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
      value: propertyInfoData.propertyInfo,
      fullWidth: false,
    },
    {
      id: "prop-type",
      label: "Property Type",
      value: "Residential Living",
      fullWidth: false,
    },
    {
      id: "prop-size",
      label: "Property Size",
      value: "from 270 sqm",
      fullWidth: false,
    },
    {
      id: "prop-rooms",
      label: "Rooms",
      value: "from 3-bedroom",
      fullWidth: false,
    },
    {
      id: "prop-construction",
      label: "Construction Progress",
      value: "Under Construction",
      fullWidth: false,
    },
    {
      id: "prop-payment",
      label: "Payment Plan",
      value: "65 / 35",
      fullWidth: false,
    },
    {
      id: "prop-progress",
      label: "Progress Percentage",
      value: "45%",
      fullWidth: false,
    },
    {
      id: "prop-units",
      label: "Units",
      value: "900 Units",
      fullWidth: false,
    },
    {
      id: "prop-location",
      label: "Property Location",
      value: "Abu Dhabi, Al Hudayriat Island, Bashayer Villas",
      fullWidth: true,
    },
  ];

  const propertyClientData: PropertyClient[] = [
    {
      id: "728ed52f",
      profileImage:
        "https://krita-artists.org/uploads/default/original/3X/c/f/cfc4990e32f31acd695481944f2163e96ff7c6ba.jpeg",
      name: "Anthony Clark",
      email: "tanim.cse@gmail.com",
      phone: "+1 919-555-0284",
      assignedProperty: "Canaletto Sky World",
      joinedOn: "Jul 10, 2025",
      status: "Active",
    },
    {
      id: "e24433341299jh",
      profileImage:
        "https://krita-artists.org/uploads/default/original/3X/c/f/cfc4990e32f31acd695481944f2163e96ff7c6ba.jpeg",
      name: "David Kim",
      email: "rubel.cse@gmail.com",
      phone: "+1 215-555-0773",
      assignedProperty: "Canaletto Sky World",
      joinedOn: "Jul 10, 2025",
      status: "Active",
    },
    {
      id: "e2e2e2e255",
      profileImage:
        "https://krita-artists.org/uploads/default/original/3X/c/f/cfc4990e32f31acd695481944f2163e96ff7c6ba.jpeg",
      name: "Sophia White",
      email: "kamrul.tech@gmail.com",
      phone: "+1 206-555-0734",
      assignedProperty: "—",
      joinedOn: "Jul 10, 2025",
      status: "Active",
    },
    {
      id: "e2e2e223423e2",
      profileImage:
        "https://krita-artists.org/uploads/default/original/3X/c/f/cfc4990e32f31acd695481944f2163e96ff7c6ba.jpeg",
      name: "Anthony Clark",
      email: "tanim.cse@gmail.com",
      phone: "+1 919-555-0284",
      assignedProperty: "Canaletto Sky World",
      joinedOn: "Jul 10, 2025",
      status: "Active",
    },
  ];
  return (
    <PageLayout title="Property Details">
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
                      onClick={() => navigate(item?.route)}
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
        <DynamicTable
          header={false}
          data={propertyClientData}
          columns={propertyColumns}
        />
      </PageContent>
    </PageLayout>
  );
}

export default PropertyDetails;
