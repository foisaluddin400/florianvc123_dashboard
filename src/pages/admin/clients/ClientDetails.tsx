import { EyeIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { ColumnDef } from "@tanstack/react-table";
import { useNavigate, useParams } from "react-router-dom";
import FormalCard from "../../../components/shared/cards/FormalCard";
import DynamicTable from "../../../components/shared/DynamicTable";
import { PageContent, PageLayout } from "../../../components/shared/PageLayout";
import Space from "../../../components/shared/Space";
import { Button } from "../../../components/ui/button";
import { cn } from "../../../lib/utils";
import { useGetSingleClientQuery } from "../../../redux/propertyManager/client/clientApi";
import { Loader } from "lucide-react";

interface AssignedProperty {
  id: string;
  propertyId: string;
  name: string;
  type: string;
  projectImage: string;
  status: string;
  progress: string;
}

const ClientDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: clientResponse, isLoading } = useGetSingleClientQuery(
    id as string
  );

  const client = clientResponse?.data?.clientData;
  const propertyData = clientResponse?.data?.properties;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader className="animate-spin text-brand" size={40} />
      </div>
    );
  }

  // 🔥 Transform API Data → UI Friendly Data
  const formattedProperties: AssignedProperty[] =
    propertyData?.map((item: any) => ({
      id: item.id,
      propertyId: item.propertyId,
      name: item.property?.name || "N/A",
      type: item.property?.type || "N/A",
      projectImage:
        item.property?.images?.[0] || "/placeholder.png",
      status: "N/A",
      progress: "0%",
    })) || [];

  const fullName = client?.name || "N/A";
  const email = client?.email || "N/A";
  const phone = client?.phone || "N/A";
  const isBlocked = client?.user?.isBlocked;
  const status = isBlocked ? "Blocked" : "Active";
  const profileImage = client?.profile_image;
  const firstLetter = fullName.trim().charAt(0).toUpperCase();

  const assignedPropertiesColumns: ColumnDef<AssignedProperty>[] = [
    {
      accessorKey: "name",
      header: "Property Name",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <img
            src={row.original.projectImage}
            alt="Project"
            className="w-10 h-10 rounded-md object-cover"
          />
          <span className="font-medium">{row.original.name}</span>
        </div>
      ),
    },
    {
      accessorKey: "type",
      header: "Type",
    },
    {
      accessorKey: "status",
      header: "Status",
    },
    {
      accessorKey: "progress",
      header: "Progress",
    },
    {
      id: "action",
      header: "Action",
      cell: ({ row }) => (
        <Button
          onClick={() =>
            navigate(`/property-admin/properties/details/${row.original.propertyId}`)
          }
          size="sm"
          variant="outline"
        >
          <HugeiconsIcon icon={EyeIcon} />
        </Button>
      ),
    },
  ];

  return (
    <PageLayout title="Client details">
      <PageContent>
        {/* Profile */}
        <div className="w-32 h-32 mb-6">
          {profileImage ? (
            <img
              src={profileImage}
              alt={fullName}
              className="w-full h-full rounded-md object-cover border"
            />
          ) : (
            <div className="w-full h-full rounded-md bg-brand/10 text-brand flex items-center justify-center text-4xl font-bold border border-brand/20">
              {firstLetter}
            </div>
          )}
        </div>

        {/* Personal Info */}
        <FormalCard header="Personal Information">
          <div className="responsive-grid-2 gap-y-6">
            <div>
              <p className="text-[#B0B0B0] text-sm">Full Name</p>
              <p className="text-[#666666] font-medium">{fullName}</p>
            </div>

            <div>
              <p className="text-[#B0B0B0] text-sm">Email</p>
              <p className="text-[#666666] font-medium">{email}</p>
            </div>

            <div>
              <p className="text-[#B0B0B0] text-sm">Phone</p>
              <p className="text-[#666666] font-medium">{phone}</p>
            </div>

            <div>
              <p className="text-[#B0B0B0] text-sm">Joined On</p>
              <p className="text-[#666666] font-medium">
                {client?.joinedOn
                  ? new Date(client.joinedOn).toLocaleDateString("en-US", {
                      month: "short",
                      day: "2-digit",
                      year: "numeric",
                    })
                  : "N/A"}
              </p>
            </div>

            <div>
              <p className="text-[#B0B0B0] text-sm">Status</p>
              <p
                className={cn(
                  "font-semibold",
                  isBlocked ? "text-red-600" : "text-green-600"
                )}
              >
                {status}
              </p>
            </div>
          </div>
        </FormalCard>

        <Space size={4} />

        {/* Table */}
        <FormalCard header="Assigned Properties">
          <DynamicTable
            header={false}
            columns={assignedPropertiesColumns}
            data={formattedProperties}
          />
        </FormalCard>
      </PageContent>
    </PageLayout>
  );
};

export default ClientDetails;