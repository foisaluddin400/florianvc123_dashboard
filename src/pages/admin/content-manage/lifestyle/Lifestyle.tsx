import {
  Search01Icon,
  StarIcon,
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
import { useGetAllLifeStyleQuery } from "../../../../redux/contentApi/contentApi";
import { Loader } from "lucide-react";

export type LifestyleItem = {
  id: string;
  image: string;
  title: string;
  lifestyleType: string;
  rating: number;
  postedOn: string;
  postedBy: string;
};



function Lifestyle() {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const navigate = useNavigate();

  const { data: response, isLoading } = useGetAllLifeStyleQuery(undefined);
  const apiData = response?.data || [];

  const handleView = (id: string) => {
    console.log("View lifestyle update:", id);
    navigate(`/admin/content-manage/lifestyle-updates/${id}`);
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
      accessorKey: "lifestyleType",
      header: "Lifestyle Type",
      cell: ({ row }) => (
        <span className="text-amber-600 font-medium">
          {row.original.lifestyleType || row.original.type || "N/A"}
        </span>
      ),
    },
    {
      accessorKey: "rating",
      header: "Rating",
      cell: ({ row }) => (
        <div className="flex items-center gap-1.5">
          <HugeiconsIcon
            icon={StarIcon}
            size={16}
            className="text-amber-500 fill-amber-500"
          />
          <span className="font-bold text-gray-700">
            {row.original.rating ? row.original.rating.toFixed(1) : "0.0"}
          </span>
        </div>
      ),
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

      const itemType = item.lifestyleType || item.type || "";

      let matchesType = true;
      if (typeFilter !== "all") {
        matchesType = itemType.toLowerCase().includes(typeFilter.toLowerCase());
      }

      return matchesSearch && matchesType;
    });
  }, [apiData, searchQuery, typeFilter]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-40">
        <Loader className="animate-spin text-brand" size={40} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageLayout title="Lifestyle Content Management" action={
        <div className="flex flex-col sm:flex-row justify-end items-start sm:items-center gap-4 mb-4 ">
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Select onValueChange={setTypeFilter} defaultValue="all">
              <SelectTrigger className="w-full sm:w-48 bg-white border-gray-200">
                <SelectValue placeholder="Filter by Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="HOTEL">Hotels</SelectItem>
                  <SelectItem value="RESORTS">Resorts</SelectItem>
                  <SelectItem value="DINING">Dining & Cafés</SelectItem>
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

export default Lifestyle;
