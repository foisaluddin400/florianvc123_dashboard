import { UserAccountIcon, CircleIcon, UnavailableIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Button } from '../../../components/ui/button'
import TakeConfirm from '../../../components/ui/take-confirm'
import TableUserInfo from '../../../components/shared/TableUserInfo'
import { cn } from '../../../lib/utils'

export const clientColumns = (renderRouting: (id: string) => void, onToggleStatus: (userId: string) => void) => [
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
    cell: ({ row }: any) => {
      return row.original.manager?.name || "Not Assigned"
    }
  },
  {
    id: 'joinedOn',
    header: 'Joined On',
    accessorKey: 'joinedOn',
    cell: ({ row }: any) => {
      if (!row.original.joinedOn) return "N/A";
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
    cell: ({ row }: any) => {
      const isBlocked = row.original.user?.isBlocked;

      return (
        <div className="flex items-center gap-2">
          <span className={cn(
            "px-2 py-1 rounded-md text-xs font-semibold",
            isBlocked ? "text-red-500" : "text-green-500"
          )}>
            {isBlocked ? "Blocked" : "Active"}
          </span>
        </div>
      )
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }: any) => {
      const { id, userId } = row.original
      const isBlocked = row.original.user?.isBlocked

      return (
        <div className="flex items-center gap-2">
          <Button
            onClick={() => renderRouting(id)}
            size="sm"
            variant="outline"
          >
            <HugeiconsIcon icon={UserAccountIcon} />
          </Button>
          <TakeConfirm
            title={isBlocked ? "Unblock this Client?" : "Block this Client?"}
            description={`Are you sure you want to ${isBlocked ? 'unblock' : 'block'} this user?`}
            confirmText="Confirm"
            cancelText="Cancel"
            onConfirm={() => onToggleStatus(userId)}
          >
            <Button size="sm" variant="outline">
              <HugeiconsIcon
                icon={isBlocked ? UnavailableIcon : CircleIcon}
                className={isBlocked ? "text-red-500" : "text-gray-500"}
              />
            </Button>
          </TakeConfirm>
        </div>
      )
    },
  },
]