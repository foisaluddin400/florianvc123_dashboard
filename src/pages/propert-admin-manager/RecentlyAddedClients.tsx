import { CircleIcon, UnavailableIcon, UserAccountIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import DynamicTable from '../../components/shared/DynamicTable'
import TableUserInfo from '../../components/shared/TableUserInfo'
import { Button } from '../../components/ui/button'
import { cn } from '../../lib/utils'
import { useGetAllClientsQuery, useBlockUnblockUserMutation } from '../../redux/propertyManager/client/clientApi'
import { Loader } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import TakeConfirm from '../../components/ui/take-confirm'

function RecentlyAddedClients() {
  const navigate = useNavigate()
  const { data: clientsResponse, isLoading } = useGetAllClientsQuery()
  const [blockUnblockUser] = useBlockUnblockUserMutation()

  const data = (clientsResponse?.data || []).slice(0, 3).map((client: any) => ({
    id: client.id,
    userId: client.userId,
    img: client.profile_image,
    name: client.name,
    email: client.email,
    phone: client.phone,
    property: 'N/A',
    joinedOn: new Date(client.joinedOn).toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric'
    }),
    status: client.user?.isActive ? 'Active' : 'Blocked',
    isActive: client.user?.isActive
  }))

  const columns = [
    {
      id: 'name',
      header: 'User Name',
      accessorKey: 'name',
      cell: ({ row }: any) => (
        <TableUserInfo
          name={row.original.name}
          img={row.original.img}
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
    },
    {
      id: 'joinedOn',
      header: 'Joined On',
      accessorKey: 'joinedOn',
    },
    {
      id: 'status',
      header: 'Status',
      accessorKey: 'status',
      cell: ({ row }: any) => {
        const isActive = row.original.isActive

        return (
          <div
            className={cn("px-3 py-1 rounded-full text-xs font-medium w-fit", {
              "text-green-600": isActive,
              "text-red-600": !isActive
            })}
          >
            {isActive ? 'Active' : 'Blocked'}
          </div>
        )
      },
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }: any) => {
        const { id, userId, isActive } = row.original

        return (
          <div className="flex items-center gap-2">
            <Button
              onClick={() => navigate(`/property-admin/clients-details/${id}`)}
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
              onConfirm={() => blockUnblockUser(userId)}
            >
              <Button
                size="sm"
                variant="outline"
              >
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <Loader className="animate-spin text-brand" />
      </div>
    )
  }

  return <DynamicTable data={data} columns={columns} />
}

export default RecentlyAddedClients