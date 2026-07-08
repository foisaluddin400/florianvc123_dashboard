import {
  AddSquareIcon,
  Search01Icon,
  StarIcon,
  ViewIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { ColumnDef } from "@tanstack/react-table";
import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import IconWrapper from "../../../components/shared/cards/IconWrapper";
import { PageContent, PageLayout } from "../../../components/shared/PageLayout";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import { Input } from "../../../components/ui/input";
import DynamicTable from "../../../components/shared/DynamicTable";
import { Button } from "../../../components/ui/button";
import { useGetAllLifeStyleQuery } from "../../../redux/contentApi/contentApi";
import { Loader } from "lucide-react";


export type LifestyleItem = {
  id: string;
  images: string[];
  title: string;
  type: string;
  rating: number;
  createdAt: string;
  contentManager: {
    name: string;
  };
};

function ManageLifeStyle() {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const navigate = useNavigate();


  const { data: lifestyleResponse, isLoading: lifestyleLoading } = useGetAllLifeStyleQuery(undefined);

  const handleView = (id: string) => {
    navigate(`/content-manager/manage-lifestyles/lifestyle/${id}`);
  };


  const formatType = (type: string) => {
    return type
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ")
      .replace("And", "&");
  };

  const filteredData = useMemo(() => {
    const allItems = lifestyleResponse?.data || [];
    return allItems.filter((item: any) => {
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = typeFilter === "all" || item.type === typeFilter;
      return matchesSearch && matchesType;
    });
  }, [lifestyleResponse, searchQuery, typeFilter]);

  const columns: ColumnDef<LifestyleItem>[] = [
    {
      accessorKey: "images",
      header: "Image",
      cell: ({ row }) => (
        <div className="flex items-center">
          <img
            src={row.original.images?.[0] || "https://via.placeholder.com/150"}
            alt={row.original.title}
            className="w-16 h-10 rounded-lg object-cover border"
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
      accessorKey: "type",
      header: "Lifestyle Type",
      cell: ({ row }) => (
        <span className="text-amber-600 font-medium">
          {formatType(row.original.type)}
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
            {Number(row.original.rating || 0).toFixed(1)}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Posted On",
      cell: ({ row }) => (
        <span className="text-gray-600 text-sm">
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
        <span className="text-gray-600 text-sm">{row.original.contentManager?.name || "N/A"}</span>
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

  if (lifestyleLoading) {
    return (
      <div className="flex justify-center items-center py-40">
        <Loader className="animate-spin text-brand" size={40} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageLayout title="Manage lifestyles" action={
        <div className="flex flex-col sm:flex-row justify-end items-start sm:items-center gap-4 mb-4 ">
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Select onValueChange={(val) => setTypeFilter(val)} defaultValue="all">
              <SelectTrigger className="w-full sm:w-48 bg-white border-gray-200">
                <SelectValue placeholder="Filter by Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="HOTELS">Hotels</SelectItem>
                  <SelectItem value="RESORTS">Resorts</SelectItem>
                  <SelectItem value="BEACH_AND_WATERFRONT">Beach & Waterfront</SelectItem>
                  <SelectItem value="DINING_AND_CAFES">Dining & Cafés</SelectItem>
                  <SelectItem value="SHOPPING_AND_ENTERTAINMENT">Shopping & Entertainment</SelectItem>
                  <SelectItem value="CITY_GUIDES">City Guides</SelectItem>
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
          <Link to={`/content-manager/manage-lifestyles/add-lifestyle`}>
            <Button className="bg-brand text-white" variant="outline">
              <HugeiconsIcon icon={AddSquareIcon} /> Add New Life Style
            </Button>
          </Link>
        </div>
      }>
        <PageContent>
          <DynamicTable columns={columns} data={filteredData} />
        </PageContent>
      </PageLayout>
    </div>
  );
}

export default ManageLifeStyle;