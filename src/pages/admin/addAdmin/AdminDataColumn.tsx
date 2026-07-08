// AdminDataColumn.tsx

import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "../../../components/ui/button";

export type AdminType = {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  profile_image: string;
  user: {
    isBlocked: boolean;
  };
};

export const AdminDataColumn = (
  onDelete?: (id: string) => void
): ColumnDef<AdminType>[] => [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-3">
          <img
            src={
              row.original.profile_image ||
              "https://ui-avatars.com/api/?name=Admin"
            }
            alt={row.original.name}
            className="w-10 h-10 rounded-full object-cover"
          />

          <span>{row.original.name}</span>
        </div>
      );
    },
  },

  {
    accessorKey: "email",
    header: "Email",
  },

  {
    accessorKey: "phoneNumber",
    header: "Phone",
  },

  {
    id: "status",
    header: "Status",
    cell: ({ row }) => (
      <span
        className={`px-2 py-1 rounded text-xs ${
          row.original.user?.isBlocked
            ? "bg-red-100 text-red-500"
            : "bg-green-100 text-green-600"
        }`}
      >
        {row.original.user?.isBlocked ? "Blocked" : "Active"}
      </span>
    ),
  },

  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <Button
        variant="destructive"
        size="sm"
        onClick={() => onDelete?.(row.original.id)}
      >
        Delete
      </Button>
    ),
  },
];