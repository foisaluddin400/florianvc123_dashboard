// ManageListingDataColumn.tsx

import type { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";

export type ManageListingType = {
  id: string;
  name: string;
  email: string;
  phone: string;
  nationality: string | null;
  profile_image: string | null;
  createdAt: string;
  status: string;
};

export const UserListingTableColumn = (
  renderRouting: (id: string) => void
): ColumnDef<ManageListingType>[] => [
  {
    accessorKey: "name",
    header: "User",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-3">
          <img
            src={
              row.original.profile_image ||
              "https://i.ibb.co/4pDNDk1/avatar.png"
            }
            alt={row.original.name}
            className="w-12 h-12 rounded-full object-cover border"
          />

          <div>
            <h1 className="font-medium">
              {row.original.name}
            </h1>

            <p className="text-sm text-gray-500">
              {row.original.email}
            </p>
          </div>
        </div>
      );
    },
  },

  {
    accessorKey: "phone",
    header: "Phone",
  },

  {
    accessorKey: "nationality",
    header: "Nationality",
    cell: ({ row }) => (
      <span>
        {row.original.nationality || "N/A"}
      </span>
    ),
  },

  {
    accessorKey: "createdAt",
    header: "Joined On",
    cell: ({ row }) => (
      <span>
        {new Date(
          row.original.createdAt
        ).toLocaleDateString()}
      </span>
    ),
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <span className="px-2 py-1 rounded bg-yellow-100 text-yellow-700 text-xs font-medium">
        {row.original.status}
      </span>
    ),
  },

  {
    id: "action",
    header: "Action",
    cell: ({ row }) => (
      <button
        onClick={() => renderRouting(row.original.id)}
        className="p-2 rounded-md border hover:bg-gray-100 transition"
      >
        <Eye size={18} />
      </button>
    ),
  },
];