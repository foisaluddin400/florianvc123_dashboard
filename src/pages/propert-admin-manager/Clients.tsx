import { AddSquareIcon, CircleIcon, UnavailableIcon, UserAccountIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useState, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import DynamicTable from '../../components/shared/DynamicTable'
import { PageLayout } from '../../components/shared/PageLayout'
import TableUserInfo from '../../components/shared/TableUserInfo'
import { Button } from '../../components/ui/button'
import { ButtonGroup } from '../../components/ui/button-group'
import { Field } from '../../components/ui/field'
import { Input } from '../../components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select'
import TakeConfirm from '../../components/ui/take-confirm'
import { cn } from '../../lib/utils'

import { Loader } from 'lucide-react'
import { useGetAllClientsQuery } from '../../redux/propertyManager/client/clientApi'

function Clients() {
  const navigate = useNavigate()
  

  const { data: clientsResponse, isLoading } = useGetAllClientsQuery(undefined)
  

  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')


  const filteredData = useMemo(() => {
    const allClients = clientsResponse?.data || []
    
    return allClients.filter((client: any) => {
      
      const matchesSearch = 
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase())

      const isActive = client.user?.isActive
      const matchesStatus = 
        statusFilter === 'all' || 
        (statusFilter === 'active' && isActive) || 
        (statusFilter === 'blocked' && !isActive)

      return matchesSearch && matchesStatus
    })
  }, [clientsResponse, searchTerm, statusFilter])

  const columns = [
    {
      id: 'name',
      header: 'User Name',
      accessorKey: 'name',
      cell: ({ row }: any) => (
        <TableUserInfo
          name={row.original.name}
          img={row.original.profile_image} 
        />
      ),
    },
    {
      id: 'email',
      header: 'Email',
      accessorKey: 'email',
    },
    {
      id: 'phone',
      header: 'Phone',
      accessorKey: 'phone',
    },
    {
      id: 'property',
      header: 'Assigned Property',
      accessorKey: 'property',
      cell: () => "N/A"   
    },
    {
      id: 'joinedOn',
      header: 'Joined On',
      accessorKey: 'joinedOn',
      cell: ({ row }: any) => {
        return new Date(row.original.joinedOn).toLocaleDateString('en-US', {
          month: 'short',
          day: '2-digit',
          year: 'numeric'
        })
      }
    },
    {
      id: 'status',
      header: 'Status',
      accessorKey: 'user.isActive',
      cell: ({ row }: any) => {
        const isActive = row.original.user?.isActive
        return (
          <div className="flex items-center gap-2">
             <span className={cn(
            "px-2 py-1 rounded-md text-xs font-semibold",
            isActive ? "text-green-500" : "text-red-500"
          )}>
            {isActive ? "Active" : "Blocked"}
          </span>
          </div>
        )
      },
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }: any) => {
        const { id } = row.original
        const isActive = row.original.user?.isActive

        return (
          <div className="flex items-center gap-2">
            <Button
              onClick={() => navigate(`/property-admin/clients-details//${id}`)}
              size="sm"
              variant="outline"
            >
              <HugeiconsIcon icon={UserAccountIcon} />
            </Button>
            <TakeConfirm
              title={isActive ? "Deactivate Client?" : "Activate Client?"}
              description={`This action will ${isActive ? 'block' : 'unblock'} this client's access.`}
              confirmText="Yes, confirm"
              cancelText="No"
              onConfirm={() => console.log(id, "Status Toggle")}
            >
              <Button size="sm" variant="outline">
                <HugeiconsIcon
                  icon={isActive ? CircleIcon : UnavailableIcon}
                  className={isActive ? "" : "text-red-500"}
                />
              </Button>
            </TakeConfirm>
          </div>
        )
      },
    },
  ]

  const renderAction = () => {
    return (
      <div className='flex gap-2'>
        <Select onValueChange={(val) => setStatusFilter(val)} defaultValue="all">
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
              onChange={(e) => setSearchTerm(e.target.value)} 
              className='h-9 focus:outline-none! focus:ring-0!' 
              placeholder="Type to search..." 
            />
            <Button size='default' className="h-9" variant="outline">Search</Button>
          </ButtonGroup>
        </Field>
        <Link to="/property-admin/add-client">
          <Button size='sm' className='bg-brand hover:bg-brand/90'>
            <HugeiconsIcon icon={AddSquareIcon} /> Add Client
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <PageLayout title="Manage Clients" action={renderAction()}>
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <Loader className="animate-spin text-brand" size={40} />
        </div>
      ) : (
        <DynamicTable data={filteredData} columns={columns} />
      )}
    </PageLayout>
  )
}

export default Clients