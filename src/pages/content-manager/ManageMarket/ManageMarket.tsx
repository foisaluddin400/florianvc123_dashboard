import { AddSquareIcon, Search01Icon, ViewIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import type { ColumnDef } from '@tanstack/react-table'
import { useState, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import IconWrapper from '../../../components/shared/cards/IconWrapper'
import { PageContent, PageLayout } from '../../../components/shared/PageLayout'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select'
import { Input } from '../../../components/ui/input'
import DynamicTable from '../../../components/shared/DynamicTable'
import { Button } from '../../../components/ui/button'
import { useGetAllManageMarketQuery } from '../../../redux/manageMarketApi/manageMarketApi'
import { Loader } from 'lucide-react'

export type MarketUpdateItem = {
  id: string;
  images: string[];
  title: string;
  createdAt: string;
  contentManager: {
    name: string;
  };
};

function MarketUpdates() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [, setTimeFilter] = useState('all')


  const { data: marketResponse, isLoading } = useGetAllManageMarketQuery(undefined)


  const marketData = marketResponse?.data || []

  const handleView = (id: string) => {
    navigate(`/content-manager/manage-markets/${id}`)
  }


  const filteredData = useMemo(() => {
    return marketData.filter((item: any) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [marketData, searchQuery])

  const columns: ColumnDef<MarketUpdateItem>[] = [
    {
      accessorKey: "images",
      header: "Image",
      cell: ({ row }) => (
        <div className="flex items-center">
          <img
            src={row.original.images?.[0] || "https://via.placeholder.com/150?text=No+Image"}
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
      <PageLayout title="Manage Markets">
        <div className="flex justify-center items-center py-40">
          <Loader className="animate-spin text-brand" size={40} />
        </div>
      </PageLayout>
    )
  }

  return (
    <div className="space-y-6">
      <PageLayout title="Manage Markets" action={
         <div className="flex flex-col sm:flex-row justify-end items-start sm:items-center gap-4 mb-4">
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Select onValueChange={(val) => setTimeFilter(val)} defaultValue="all">
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

            <Link to={`/content-manager/manage-markets/add-market`}>
              <Button className="bg-brand text-white" variant="outline">
                <HugeiconsIcon icon={AddSquareIcon} /> Add New Market
              </Button>
            </Link>
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