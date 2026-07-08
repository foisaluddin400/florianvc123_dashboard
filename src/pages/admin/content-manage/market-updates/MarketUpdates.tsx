import { Search01Icon, ViewIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import type { ColumnDef } from '@tanstack/react-table'
import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import IconWrapper from '../../../../components/shared/cards/IconWrapper'
import DynamicTable from '../../../../components/shared/DynamicTable'
import { PageContent, PageLayout } from '../../../../components/shared/PageLayout'
import { Input } from '../../../../components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../../../../components/ui/select'
import { useGetAllManageMarketQuery } from "../../../../redux/manageMarketApi/manageMarketApi"
import { Loader } from "lucide-react"

export type MarketUpdate = {
  id: string;
  image: string;
  title: string;
  postedOn: string;
  postedBy: string;
};



function MarketUpdates() {
  const [searchQuery, setSearchQuery] = useState('')
  const [timeFilter, setTimeFilter] = useState("all")
  const navigate = useNavigate()

  const { data: response, isLoading } = useGetAllManageMarketQuery(undefined)
  const apiData = response?.data || []

  const handleView = (id: string) => {
    console.log('View market update:', id)
    navigate(`/admin/content-manage/market-updates/${id}`)
  }

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "images",
      header: "Image",
      cell: ({ row }) => (
        <div className="flex items-center">
          <img
            src={row.original.images?.[0] || 'https://via.placeholder.com/200x120?text=No+Image'}
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
        <span className="font-medium text-gray-700 max-w-75 truncate block">
          {row.original.title}
        </span>
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

      let matchesTime = true;
      if (timeFilter !== "all" && item.createdAt) {
        const itemDate = new Date(item.createdAt);
        const now = new Date();
        const diffMs = now.getTime() - itemDate.getTime();
        const diffDays = diffMs / (1000 * 60 * 60 * 24);

        if (timeFilter === "24h") matchesTime = diffDays <= 1;
        else if (timeFilter === "week") matchesTime = diffDays <= 7;
        else if (timeFilter === "month") matchesTime = diffDays <= 30;
        else if (timeFilter === "year") matchesTime = diffDays <= 365;
      }

      return matchesSearch && matchesTime;
    });
  }, [apiData, searchQuery, timeFilter]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-40">
        <Loader className="animate-spin text-brand" size={40} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageLayout title="Market Updates" action={
        <div className="flex flex-col sm:flex-row justify-end items-start sm:items-center gap-4 mb-4">
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Select onValueChange={setTimeFilter} defaultValue="all">
              <SelectTrigger className="w-full sm:w-48 bg-white border-gray-200">
                <SelectValue placeholder="Filter by Time" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="24h">Last 24 Hours</SelectItem>
                  <SelectItem value="week">Last Week</SelectItem>
                  <SelectItem value="month">Last Month</SelectItem>
                  <SelectItem value="year">Last Year</SelectItem>
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

export default MarketUpdates;
