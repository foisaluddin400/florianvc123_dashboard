import {
  Search01Icon,
  ViewIcon
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { ColumnDef } from "@tanstack/react-table";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import IconWrapper from "../../../../components/shared/cards/IconWrapper";
import DynamicTable from "../../../../components/shared/DynamicTable";
import {
  PageContent,
  PageLayout,
} from "../../../../components/shared/PageLayout";
import { Input } from "../../../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";
import { cn } from "../../../../lib/utils";
import { useGetAllManageProjectQuery } from "../../../../redux/manageProjectapi/manageProjectApi";
import { Loader } from "lucide-react";

export type ProjectItem = {
  id: string;
  image: string;
  title: string;
  status: "New Launch" | "Upcoming Launch" | "Available to Reserve";
  postedOn: string;
  postedBy: string;
};

const statusColors: Record<ProjectItem["status"], string> = {
  "New Launch": "text-[#B08D59]",
  "Upcoming Launch": "text-[#E8A05F]",
  "Available to Reserve": "text-[#966E38]",
};



function NewProjects() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const navigate = useNavigate();

  const { data: response, isLoading } = useGetAllManageProjectQuery(undefined);
  const apiData = response?.data || [];

  const handleView = (id: string) => {
    console.log("View interested client:", id);
    navigate(`/admin/content-manage/new-projects/${id}`);
  };

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "images",
      header: "Image",
      cell: ({ row }) => (
        <div className="flex items-center">
          <img
            src={row.original.images?.[0] || "https://via.placeholder.com/200x120?text=No+Image"}
            alt={row.original.title}
            className="w-16 h-10 rounded-lg object-cover"
          />
        </div>
      ),
    },
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => (
        <span className="font-medium text-gray-700 max-w-[200px] truncate block">
          {row.original.title}
        </span>
      ),
    },
    {
      accessorKey: "status",
      header: "Project status",
      cell: ({ row }) => {
        const status = row.original.status || row.original.projectStatus || "New Launch";
        const colorClass = statusColors[status as "New Launch"] || statusColors["New Launch"];
        return (
          <span className={cn("font-medium", colorClass)}>
            {status}
          </span>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "Posted On",
      cell: ({ row }) => (
        <span className="text-gray-600">
          {row.original.createdAt ? new Date(row.original.createdAt).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }) : "N/A"}
        </span>
      ),
    },
    {
      accessorKey: "contentManager.name",
      header: "Posted By",
      cell: ({ row }) => (
        <span className="text-gray-600">{row.original.contentManager?.name || "N/A"}</span>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <IconWrapper
          onClick={() => handleView(row.original.id)}
          className="border w-fit p-2 hover:bg-brand/20 cursor-pointer"
        >
          <HugeiconsIcon size={16} icon={ViewIcon} />
        </IconWrapper>
      ),
    },
  ];

  const filteredData = useMemo(() => {
    return apiData.filter((item: any) => {
      const matchesSearch = item.title?.toLowerCase().includes(searchQuery.toLowerCase());

      const itemStatus = item.status || item.projectStatus || "";

      let matchesStatus = true;
      if (statusFilter !== "all") {
        matchesStatus = itemStatus.toLowerCase().includes(statusFilter.toLowerCase());
      }

      return matchesSearch && matchesStatus;
    });
  }, [apiData, searchQuery, statusFilter]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-40">
        <Loader className="animate-spin text-brand" size={40} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageLayout title="New Projects" action={
        <div className="flex flex-col sm:flex-row justify-end mb-4 items-start sm:items-center gap-4 ">
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Select onValueChange={setStatusFilter} defaultValue="all">
              <SelectTrigger className="w-full sm:w-48 bg-white border-gray-200">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="villas">VILLAS</SelectItem>
                  <SelectItem value="restaurant">RESTUARANT</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <div className="relative w-full sm:w-64">
              <HugeiconsIcon
                icon={Search01Icon}
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <Input
                placeholder="Search By Name"
                className="pl-10 bg-white border-gray-200 focus:ring-brand focus:border-brand"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      }>


        <PageContent>
          <DynamicTable columns={columns} data={filteredData} />
        </PageContent>
      </PageLayout>
    </div>
  );
}

export default NewProjects;
