// ManageListingDataColumn.tsx

import type { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";

export type ManageListingType = {
  id: string;
  title: string;
  cover_image: string;
  assetClass: string;
  minimumBidAmount: string;
  status: string;
};

export const ManageListingDataColumn = (
  renderRouting: (id: string) => void
): ColumnDef<ManageListingType>[] => [
  {
    accessorKey: "title",
    header: "Property",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-3">
          <img
            src={row.original.cover_image}
            alt={row.original.title}
            className="w-12 h-12 rounded-lg object-cover"
          />

          <span className="font-medium">
            {row.original.title}
          </span>
        </div>
      );
    },
  },

  {
    accessorKey: "assetClass",
    header: "Asset Class",
  },

  {
    accessorKey: "minimumBidAmount",
    header: "Minimum Bid",
    cell: ({ row }) => (
      <span>
        ${Number(
          row.original.minimumBidAmount
        ).toLocaleString()}
      </span>
    ),
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <span className="px-2 py-1 rounded bg-yellow-100 text-yellow-700 text-xs">
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