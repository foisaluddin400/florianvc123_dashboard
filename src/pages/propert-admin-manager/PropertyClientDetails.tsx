import { AddSquareFreeIcons, Delete02Icon, EyeIcon, Minus, UserBlock01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import type { ColumnDef } from '@tanstack/react-table'
import { Link, useNavigate, useParams } from 'react-router-dom'
import FormalCard from '../../components/shared/cards/FormalCard'
import DynamicTable from '../../components/shared/DynamicTable'
import { PageContent, PageLayout } from '../../components/shared/PageLayout'
import Space from '../../components/shared/Space'
import { Button } from '../../components/ui/button'
import TakeConfirm from '../../components/ui/take-confirm'
import { cn } from '../../lib/utils'
import { useBlockUnblockUserMutation, useDeleteClientMutation, useGetSingleClientQuery } from '../../redux/propertyManager/client/clientApi'
import { useAssignUnassignClientMutation } from '../../redux/property/propertyApis'
import { Loader } from 'lucide-react'
import toast from 'react-hot-toast'
import { useState } from 'react'

interface AssignedProperty {
  id: string
  propertyId: string
  property?: {
    id: string
    name: string
    type: string
    status: string
    constructionProgressPercentage: number
    images: string[]
  }
}

const PropertyClientDetails = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  const { data: clientResponse, isLoading } = useGetSingleClientQuery(id as string)
  console.log(clientResponse)

  const [deleteClient, { isLoading: isDeleting }] = useDeleteClientMutation()
  const [blockUnblockClient, { isLoading: isBlocking }] = useBlockUnblockUserMutation()
  const [unassignProperty, { isLoading: isUnassigning }] = useAssignUnassignClientMutation()
  const [loadingPropertyId, setLoadingPropertyId] = useState<string | null>(null)

  const client = clientResponse?.data?.clientData
  const assignedProperties = clientResponse?.data?.properties || []

  console.log("assignedProperties", assignedProperties)



  const handleDeleteClient = async () => {
    try {
      const res = await deleteClient(id as string).unwrap()
      if (res.success) {
        toast.success("Client deleted successfully!")
        navigate("/property-admin/clients", { replace: true })
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to delete client. Please try again.")
    }
  }

  const handleBlockUnblock = async () => {
    try {
      const res = await blockUnblockClient(client?.userId as string).unwrap()
      if (res.success) {
        toast.success(res.message || "Operation successful!")
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update client status.")
    }
  }

  const handleUnassign = async (propertyId: string) => {
    setLoadingPropertyId(propertyId)
    try {
      const res = await unassignProperty({
        id: propertyId,
        data: { clientId: id }
      }).unwrap()
      if (res.success) {
        toast.success(res.message || "Property removed successfully!")
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to remove property.")
    } finally {
      setLoadingPropertyId(null)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader className="animate-spin text-brand" size={40} />
      </div>
    )
  }

  const fullName = client?.name || "N/A"
  const isActive = client?.user?.isActive
  const status = isActive ? "Active" : "Blocked"
  const firstLetter = fullName.trim().charAt(0).toUpperCase()

  const formatStatus = (status?: string) => {
    if (!status) return '—'
    return status.split('_').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')
  }

  const assignedPropertiesColumns: ColumnDef<AssignedProperty>[] = [
    {
      id: 'name',
      header: 'Property Name',
      cell: ({ row }) => {
        console.log(row)
        const property = row.original.property
        return (
          <div className="flex items-center gap-2">
            <img
              src={property?.images?.[0]}
              alt="Project"
              className='w-10 h-10 rounded-md object-cover'
            />
            <span className="font-medium">{property?.name || "N/A"}</span>
          </div>
        )
      },
    },
    {
      id: 'type',
      header: 'Type',
      cell: ({ row }) => row.original.property?.type || "N/A",
    },
    {
      id: 'status',
      header: 'Status',
      cell: ({ row }) => formatStatus(row.original.property?.status),
    },
    {
      id: 'progress',
      header: 'Progress',
      cell: ({ row }) => row.original.property?.constructionProgressPercentage != null ? `${row.original.property.constructionProgressPercentage}%` : "0%",
    },
    {
      id: "action",
      header: 'Action',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Button
            onClick={() => handleUnassign(row.original.propertyId)}
            disabled={isUnassigning}
            size="sm"
            className='border bg-white hover:bg-white cursor-pointer border-red-500 text-red-500'
          >
            {isUnassigning && loadingPropertyId === row.original.propertyId ? <Loader className="animate-spin w-4 h-4" /> : <HugeiconsIcon icon={Minus} />}
          </Button>
          <Button
            className='cursor-pointer hover:bg-white'
            onClick={() => navigate(`/property-admin/properties/details/${row.original.propertyId}`)}
            size="sm"
            variant="outline">
            <HugeiconsIcon icon={EyeIcon} />
          </Button>
        </div>
      ),
    }
  ]


  return (
    <PageLayout title='Client Details'>
      <PageContent>

        <div className="w-32 h-32 mb-6">
          {client?.profile_image ? (
            <img
              src={client.profile_image}
              alt={fullName}
              className='w-full h-full rounded-md object-cover border'
            />
          ) : (
            <div className="w-full h-full rounded-md bg-brand/10 text-brand flex items-center justify-center text-4xl font-bold border border-brand/20 rounded-xl">
              {firstLetter}
            </div>
          )}
        </div>

        <FormalCard header="Personal Information">
          <div className="responsive-grid-2 gap-y-6">
            <div>
              <h1 className='text-[#B0B0B0] font-nunito-semibold-italic text-sm'>Full Name</h1>
              <h1 className='text-[#666666] font-medium'>{fullName}</h1>
            </div>
            <div>
              <h1 className='text-[#B0B0B0] font-nunito-semibold-italic text-sm'>Email</h1>
              <h1 className='text-[#666666] font-medium'>{client?.email || "N/A"}</h1>
            </div>
            <div>
              <h1 className='text-[#B0B0B0] font-nunito-semibold-italic text-sm'>Contact Phone</h1>
              <h1 className='text-[#666666] font-medium'>{client?.phone || "N/A"}</h1>
            </div>
            <div>
              <h1 className='text-[#B0B0B0] font-nunito-semibold-italic text-sm'>Joined On</h1>
              <h1 className='text-[#666666] font-medium'>
                {client?.joinedOn ? new Date(client.joinedOn).toLocaleDateString('en-US', {
                  month: 'short',
                  day: '2-digit',
                  year: 'numeric'
                }) : "N/A"}
              </h1>
            </div>
            <div>
              <h1 className='text-[#B0B0B0] font-nunito-semibold-italic text-sm'>Status</h1>
              <h1 className={cn('font-semibold', isActive ? 'text-green-600' : 'text-red-600')}>
                {status}
              </h1>
            </div>
          </div>
        </FormalCard>

        <Space size={4} />

        <div className="flex items-center gap-2">
          {/* Block/Unblock Button */}
          <Button
            onClick={handleBlockUnblock}
            disabled={isBlocking}
            className='bg-brand hover:bg-brand cursor-pointer'
            variant="default"
          >
            {isBlocking ? (
              <Loader className="animate-spin w-4 h-4 mr-2" />
            ) : (
              <HugeiconsIcon icon={UserBlock01Icon} />
            )}
            {isActive ? "Block" : "Unblock"} this Client
          </Button>

          {/* Delete Client with TakeConfirm */}
          <TakeConfirm
            title="Delete this client?"
            description="This action will permanently delete this client and all associated data. This cannot be undone."
            confirmText='Delete'
            onConfirm={handleDeleteClient}
          >
            <Button
              variant="destructive"
              className="cursor-pointer min-w-[180px]"
              disabled={isDeleting}
            >
              {isDeleting ? (
                <Loader className="animate-spin w-4 h-4 mr-2" />
              ) : (
                <HugeiconsIcon icon={Delete02Icon} />
              )}
              {isDeleting ? "Deleting..." : "Delete this Client"}
            </Button>
          </TakeConfirm>
        </div>

        <Space size={4} />

        <FormalCard header="Assigned Properties" action={
          <Link to={`/property-admin/clients-details/${client?.id}/add`}>
            <Button className='bg-brand hover:bg-brand cursor-pointer'>
              <HugeiconsIcon icon={AddSquareFreeIcons} /> Add a Property
            </Button>
          </Link>
        }>
          <DynamicTable header={false} columns={assignedPropertiesColumns} data={assignedProperties} />
        </FormalCard>
      </PageContent>
    </PageLayout>
  )
}

export default PropertyClientDetails;