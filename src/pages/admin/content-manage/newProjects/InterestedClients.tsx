import { useNavigate } from "react-router-dom";
import IconWrapper from "../../../../components/shared/cards/IconWrapper";
import { cn } from "../../../../lib/utils";
import DynamicTable from "../../../../components/shared/DynamicTable";
import { Eye } from "lucide-react";
import FormalCard from "../../../../components/shared/cards/FormalCard";

function InterestedClients({ project: data = [] }: { project: any[] }) {
  const navigate = useNavigate();

  const columns = [
    {
      header: "Client Name",
      accessorKey: "name",
      cell: ({ row }: any) => {
        const clientName = row?.original?.name || "N/A";
        const firstLetter = clientName.trim().charAt(0).toUpperCase();

        return (
          <div className="flex gap-2 items-center">
            <div className="w-10 h-10 rounded-full bg-brand/10 text-brand flex items-center justify-center font-bold text-sm border border-brand/20">
              {firstLetter}
            </div>
            <p className="font-medium text-[#666666]">{clientName}</p>
          </div>
        );
      },
    },
    {
      header: "Email",
      accessorKey: "email",
      cell: ({ row }: any) => <p>{row?.original?.email || "N/A"}</p>,
    },
    {
      header: "Phone",
      accessorKey: "phone",
      cell: ({ row }: any) => <p>{row?.original?.phone || "N/A"}</p>,
    },
    {
      header: "Interested At",
      accessorKey: "createdAt",
      cell: ({ row }: any) => {
        if (!row.original.createdAt) return "N/A";
        return new Date(row.original.createdAt).toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        });
      },
    },
    {
      header: "Actions",
      accessorKey: "actions",
      cell: ({ row }: any) => {
        return (
          <div className="flex gap-2">
            <IconWrapper
              onClick={() => {
                navigate(`/admin/content-manage/interested-clients/${row?.original?.id}`);
              }}
              className={cn("border p-2 w-fit h-fit rounded border-[#666666] cursor-pointer hover:bg-gray-50")}
            >
              <Eye size={16} />
            </IconWrapper>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <FormalCard
        header="Interested Clients"
        headerStyle="font-nunito-semibold-italic"
      >
        {data?.length > 0 ? (
          <DynamicTable columns={columns} data={data} header={false} />
        ) : (
          <div className="py-10 text-center text-gray-400 italic">
            No clients have shown interest in this project yet.
          </div>
        )}
      </FormalCard>
    </div>
  );
}

export default InterestedClients;
