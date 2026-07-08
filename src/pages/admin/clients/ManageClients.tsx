'use client'

import { Loader } from 'lucide-react'
import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import DynamicTable from '../../../components/shared/DynamicTable'
import { PageContent, PageLayout } from '../../../components/shared/PageLayout'
import { Button } from '../../../components/ui/button'
import { ButtonGroup } from '../../../components/ui/button-group'
import { Field } from '../../../components/ui/field'
import { Input } from '../../../components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select'
import { clientColumns } from './clientColumns'
import { useGetAllClientsQuery, useBlockUnblockUserMutation } from '../../../redux/propertyManager/client/clientApi'
import toast from 'react-hot-toast'

function ManageClients() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  

  const { data: clientsResponse, isLoading } = useGetAllClientsQuery(undefined)

  const filteredData = useMemo(() => {
    const allClients = clientsResponse?.data || []

    console.log(allClients)

    return allClients.filter((client: any) => {
      const matchesSearch = 
        client.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.email?.toLowerCase().includes(searchQuery.toLowerCase())

      const isBlocked = client.user?.isBlocked
      const matchesStatus = 
        statusFilter === 'all' || 
        (statusFilter === 'active' && !isBlocked) || 
        (statusFilter === 'blocked' && isBlocked)

      return matchesSearch && matchesStatus
    })
  }, [clientsResponse, searchQuery, statusFilter])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const [blockUnblockUser, { isLoading: isStatusUpdating }] = useBlockUnblockUserMutation()

  const handleToggleStatus = async (userId: string) => {
    try {
      const response = await blockUnblockUser(userId).unwrap()
      if (response.success || response.statusCode === 200 || response.data) {
        toast.success(response.message || 'User status updated successfully')
      } else {
        toast.success('User status updated successfully')
      }
    } catch (err: any) {
      toast.error(err?.data?.message || 'Failed to update user status')
    }
  }

  const renderRouting = (id: string) => {
    navigate(`/admin/clients/${id}`)
  }

  if (isLoading) {
    return (
      <PageLayout title="Manage Clients">
        <PageContent>
          <div className="flex justify-center items-center py-20">
            <Loader className='animate-spin text-brand' size={40} />
          </div>
        </PageContent>
      </PageLayout>
    )
  }

  const renderAction = () => {
    return (
      <div className='flex gap-2'>
        <Select onValueChange={(value) => setStatusFilter(value)} defaultValue="all">
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">All Users</SelectItem>
              <SelectItem value="active">Active Users</SelectItem>
              <SelectItem value="blocked">Blocked Users</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        
        <Field>
          <ButtonGroup>
            <Input 
              onChange={handleSearch} 
              className='h-9 focus:outline-none! focus:ring-0!' 
              id="input-button-group" 
              placeholder="Type to search..." 
            />
            <Button size='default' className="h-9" variant="outline">Search</Button>
          </ButtonGroup>
        </Field>
      </div>
    )
  }

  return (
    <PageLayout title="Manage Clients" action={renderAction()}>
      <PageContent>
        {isStatusUpdating && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/40 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-3">
              <Loader size={40} className="animate-spin text-brand" />
              <span className="text-sm font-medium text-gray-500">Updating status...</span>
            </div>
          </div>
        )}
        <DynamicTable 
          columns={clientColumns(renderRouting, handleToggleStatus)} 
          data={filteredData} 
        />
      </PageContent>
    </PageLayout>
  )
}

export default ManageClients