import { ViewIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import type { ColumnDef } from '@tanstack/react-table'
import IconWrapper from '../../components/shared/cards/IconWrapper'

export type Propertise = {
  id: string
  propertyImage: string
  name: string
  type: string
  status: string
  progress: string
}


export const PropertiseDataColumn = (onClick?: (id: string) => void): ColumnDef<Propertise>[] => [
  {
    id: 'name',
    header: 'Property Name',
    cell: ({ row }) => {
      return (
        <div className='flex items-center gap-2'>
          <img src={row.original.propertyImage} alt={row.original.name} className='w-10 h-10 rounded object-cover' />
          <span>{row.original.name}</span>
        </div>
      )
    },
  },
  {
    id: 'type',
    header: 'Type',
    cell: ({ row }) => row.original.type,
  },
  {
    id: 'status',
    header: 'Status',
    cell: ({ row }) => row.original.status,
  },
  {
    id: 'progress',
    header: 'Progress',
    cell: ({ row }) => row.original.progress,
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => (
      <IconWrapper onClick={() => onClick?.(row.original.id)} className='border w-fit p-2 hover:bg-brand/20'>
        <HugeiconsIcon size={16} icon={ViewIcon} />
      </IconWrapper>
    ),
  },
]