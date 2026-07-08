'use client'

import { Loader } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import DynamicTable from '../../components/shared/DynamicTable'
import { PageContent, PageLayout } from '../../components/shared/PageLayout'
import { Button } from '../../components/ui/button'
import { ButtonGroup } from '../../components/ui/button-group'
import { Field } from '../../components/ui/field'
import { Input } from '../../components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select'
import { PropertiseDataColumn, type Propertise } from './PropertiseDataColumn'
import { AddSquareIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useGetMyPropertiesQuery } from '../../redux/property/propertyApis'

function PropertyManage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const navigate = useNavigate()

  const { data: properties, isLoading } = useGetMyPropertiesQuery(null)
  
  const rawData = properties?.data || []
  
  const filteredData = rawData.filter((item: any) => {
    const nameMatch = (item.name || '').toLowerCase().includes(searchQuery.toLowerCase())
    const typeMatch = (item.type || '').toLowerCase().includes(searchQuery.toLowerCase())
    const statusMatch = statusFilter === 'all' || item.status === statusFilter
    
    return (nameMatch || typeMatch) && statusMatch
  })

  const propertiesData: Propertise[] = filteredData.map((item: any) => ({
    id: item.id || '',
    propertyImage: item.images && item.images.length > 0 ? item.images[0] : "https://via.placeholder.com/150", 
    name: item.name || 'N/A',
    type: item.type || 'N/A',
    status: item.status ? item.status.replace(/_/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase()) : "N/A",
    progress: item.constructionProgressPercentage ? `${item.constructionProgressPercentage}%` : "0%"
  }))

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const handlerNavigate = (id: string) => {
    navigate(`/property-admin/properties/details/${id}`)
  }

  const renderAction = () => {
    return (
      <div className='flex gap-2'>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">All Properties</SelectItem>
              <SelectItem value="UNDER_CONSTRUCTION">Under Construction</SelectItem>
              <SelectItem value="COMPLETED">Completed</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Field>
          <ButtonGroup>
            <Input value={searchQuery} onChange={handleSearch} className='h-9 focus:outline-none! focus:ring-0!' id="input-button-group" placeholder="Type to search..." />
            <Button size='default' className="h-9" variant="outline">Search</Button>
          </ButtonGroup>
        </Field>
        <Link to={`/property-admin/add-property`}>
          <Button className="bg-brand text-white cursor-pointer" variant="outline">
             <HugeiconsIcon icon={AddSquareIcon} /> Add New Property
          </Button>
        </Link>
      </div>
    )
  }

  if (isLoading) {
    return (
      <PageLayout title="Manage Properties" action={renderAction()}>
        <PageContent>
           <div className="flex justify-center items-center h-[50vh]">
             <Loader className='animate-spin w-8 h-8 text-brand' />
           </div>
        </PageContent>
      </PageLayout>
    )
  }

  return (
    <PageLayout title="Manage Properties" action={renderAction()}>
      <PageContent children={<DynamicTable columns={PropertiseDataColumn(handlerNavigate)} data={propertiesData} />} />
    </PageLayout>
  )
}

export default PropertyManage
