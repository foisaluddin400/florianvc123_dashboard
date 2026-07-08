
import { AddSquareIcon, CircleIcon, City01Icon, UnavailableIcon, UserAccountIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Link, useNavigate } from 'react-router-dom'
import DynamicTable from '../../../components/shared/DynamicTable'
import { PageContent, PageLayout } from '../../../components/shared/PageLayout'
import { Button } from '../../../components/ui/button'
import TakeConfirm from '../../../components/ui/take-confirm'
import { cn } from '../../../lib/utils'
import { useGetAllPropertyManagerQuery } from '../../../redux/propertyManager/propertyMangerApi'
import { useBlockUnblockUserMutation } from '../../../redux/propertyManager/client/clientApi'
import { Loader } from 'lucide-react'
import toast from 'react-hot-toast'

function PropertyManager() {
  const navigate = useNavigate()
  
  const { data: userDatas, isLoading, refetch } = useGetAllPropertyManagerQuery()
  const [blockUnblockUser, { isLoading: isStatusUpdating }] = useBlockUnblockUserMutation();

  const handleToggleStatus = async (userId: string) => {
    if (!userId) return;
    try {
      const response = await blockUnblockUser(userId).unwrap();
      if (response.success || response.statusCode === 200 || response.data) {
        toast.success(response.message || 'User status updated successfully');
        refetch();
      } else {
        toast.success('User status updated successfully');
        refetch();
      }
    } catch (err: any) {
      toast.error(err?.data?.message || 'Failed to update user status');
    }
  };

  const usrDta = Array.isArray(userDatas?.data?.data) 
    ? userDatas.data.data 
    : Array.isArray(userDatas?.data) 
      ? userDatas.data 
      : [];

  const column = [
    {
      header: 'Manager Name',
      accessorKey: 'name', 
      cell: ({ row }: any) => {
        const name = row.original.name || "Unknown";
        const image = row.original.profile_image;
        const firstLetter = name.charAt(0).toUpperCase();

        return (
          <div className="flex items-center gap-2">
            {image ? (
              <img 
                src={image} 
                alt={name} 
                className="w-10 h-10 rounded-full object-cover border" 
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-brand/10 text-brand flex items-center justify-center font-bold text-sm border border-brand/20">
                {firstLetter}
              </div>
            )}
            <span className="font-medium text-[#666666]">{name}</span>
          </div>
        );
      },
    },
    {
      header: 'Email',
      accessorKey: 'email',
    },
    {
      header: 'Phone',
      accessorKey: 'phone',
    },
    {
      header: 'Assigned On',
      accessorKey: 'createdAt',
      cell: ({ row }: any) => {
        return new Date(row.original.createdAt).toLocaleDateString('en-US', {
          month: 'short',
          day: '2-digit',
          year: 'numeric'
        })
      }
    },
    {
      header: 'Status',
      accessorKey: 'user.isBlocked',
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
      header: 'Actions',
      accessorKey: 'actions',
      cell: ({ row }: any) => {
        const isBlocked = row.original.user?.isBlocked;
        const managerId = row.original.id;
        const userId = row.original.userId;

        return (
          <div className="flex items-center gap-2">
            <Button
              onClick={() => navigate(`/admin/property-manager/${managerId}`)}
              size="sm" variant="outline"
              className="cursor-pointer"
            >
              <HugeiconsIcon icon={UserAccountIcon} />
            </Button>
            <TakeConfirm
              title={`Are you sure you want to ${isBlocked ? 'unblock' : 'block'} ${row?.original.name}?`}
              description={`This action will change their system access status.`}
              onConfirm={() => handleToggleStatus(userId)}
              confirmText="Continue"
              cancelText="Cancel"
            >
              <Button size="sm" variant="outline" className="cursor-pointer">
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

  return (
    <PageLayout 
      title="Property Manager"
      action={
        <Link to={`/admin/property-manager/add`}>
          <Button className='bg-brand text-white' variant="outline">
            <HugeiconsIcon icon={AddSquareIcon} /> Add New Manager
          </Button>
        </Link>
      } 
      icon={<HugeiconsIcon icon={City01Icon} />}
    >
      <PageContent>
        {isStatusUpdating && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
            <Loader className="animate-spin text-brand" size={48} />
          </div>
        )}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader className="animate-spin text-brand" size={40} />
          </div>
        ) : (
          <DynamicTable data={usrDta} columns={column} />
        )}
      </PageContent>
    </PageLayout>
  )
}

export default PropertyManager;