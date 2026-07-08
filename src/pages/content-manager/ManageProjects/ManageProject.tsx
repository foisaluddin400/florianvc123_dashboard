import {
  AddSquareIcon,
  Search01Icon,
  ViewIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { ColumnDef } from "@tanstack/react-table";
import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import IconWrapper from "../../../components/shared/cards/IconWrapper";
import DynamicTable from "../../../components/shared/DynamicTable";
import { PageContent, PageLayout } from "../../../components/shared/PageLayout";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { useGetAllManageProjectQuery } from "../../../redux/manageProjectapi/manageProjectApi";
import { Loader } from "lucide-react";

export type ManageProjectType = {
  id: string;
  images: string[];
  title: string;
  createdAt: string;
  contentManager: {
    name: string;
  };
  propertyType: string;
};

function ManageProject() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const navigate = useNavigate();

  const { data: projectsResponse, isLoading } = useGetAllManageProjectQuery(undefined);

  const projects = projectsResponse?.data || [];

  const handleView = (id: string) => {
    navigate(`/content-manager/manage-projects/${id}`);
  };

  const filteredData = useMemo(() => {
    return projects.filter((item: any) => {
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = statusFilter === "all" || item.propertyType === statusFilter;
      return matchesSearch && matchesType;
    });
  }, [projects, searchQuery, statusFilter]);

  const columns: ColumnDef<ManageProjectType>[] = [
    {
      accessorKey: "images",
      header: "Image",
      cell: ({ row }) => (
        <div className="flex items-center">
          <img
            src={row.original.images?.[0] || "https://via.placeholder.com/200x120?text=No+Image"}
            alt={row.original.title}
            className="w-20 h-12 rounded-lg object-cover border"
          />
        </div>
      ),
    },
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => (
        <span className="font-medium text-gray-700 truncate block max-w-[200px]">
          {row.original.title}
        </span>
      ),
    },
    {
      accessorKey: "propertyType",
      header: "Property Type",
      cell: ({ row }) => (
        <span className="font-medium text-amber-600">
          {row.original.propertyType}
        </span>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Posted On",
      cell: ({ row }) => (
        <span className="text-gray-600">
          {new Date(row.original.createdAt).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
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

  if (isLoading) {
    return (
      <PageLayout title="Manage Projects">
        <div className="flex justify-center items-center py-40">
          <Loader className="animate-spin text-brand" size={40} />
        </div>
      </PageLayout>
    );
  }

  return (
    <div className="space-y-6">
      <PageLayout
        title="Manage Projects"
        action={
          <div className="flex flex-col sm:flex-row justify-end items-start sm:items-center gap-4 mb-4">
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Select onValueChange={(val) => setStatusFilter(val)} defaultValue="all">
                <SelectTrigger className="w-full sm:w-48 bg-white border-gray-200">
                  <SelectValue placeholder="Filter by Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="VILLAS">Villas</SelectItem>
                    <SelectItem value="RESTUARANT">Restaurant</SelectItem>
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

              <Link to={`/content-manager/manage-projects/add-project`}>
                <Button className="bg-brand text-white" variant="outline">
                  <HugeiconsIcon icon={AddSquareIcon} /> Add New Project
                </Button>
              </Link>
            </div>
          </div>
        }
      >
        <PageContent>
          
          <DynamicTable columns={columns} data={filteredData} />
        </PageContent>
      </PageLayout>
    </div>
  );
}

export default ManageProject;