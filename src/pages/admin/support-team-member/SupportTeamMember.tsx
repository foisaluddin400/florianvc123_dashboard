import { AddSquareIcon, CircleIcon, UnavailableIcon, UserIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Link, useNavigate } from 'react-router-dom';
import IconWrapper from '../../../components/shared/cards/IconWrapper';
import DynamicTable from '../../../components/shared/DynamicTable';
import { PageContent, PageLayout } from '../../../components/shared/PageLayout';
import { Button } from '../../../components/ui/button';
import TakeConfirm from '../../../components/ui/take-confirm';
import { cn } from '../../../lib/utils';
import { useGetAllSupportManagerQuery } from '../../../redux/supportManager/supportMangerApi';
import { useBlockUnblockUserMutation } from '../../../redux/propertyManager/client/clientApi';
import { Loader } from 'lucide-react'; 
import toast from 'react-hot-toast';

function SupportTeamMember() {
  const navigate = useNavigate();
  

  const { data: supportManagerData, isLoading, refetch } = useGetAllSupportManagerQuery();
  const [blockUnblockUser, { isLoading: isStatusUpdating }] = useBlockUnblockUserMutation();

  const handleToggleStatus = async (userId: string) => {
    if (!userId) return;
    try {
      const response = await blockUnblockUser(userId).unwrap();
      if (response.success || response.statusCode === 200 || response.data) {
        toast.success(response.message || 'Status updated successfully');
        refetch();
      } else {
        toast.success('Status updated successfully');
        refetch();
      }
    } catch (err: any) {
      toast.error(err?.data?.message || 'Failed to update status');
    }
  };

  const managers = supportManagerData?.data || [];

  const columns = [
    {
      header: 'Manager Name',
      accessorKey: 'name', 
      cell: ({ row }: any) => {
        const name = row?.original?.name || "N/A";
        const image = row?.original?.profile_image;
        const firstLetter = name.trim().charAt(0).toUpperCase();

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
        });
      }
    },
    {
      header: 'Status',
      accessorKey: 'user.isBlocked',
      cell: ({ row }: any) => {
        const isBlocked = row?.original?.user?.isBlocked;
        return (
          <span className={cn(
            "px-2 py-1 rounded-md text-xs font-semibold",
            isBlocked ? "text-red-500" : "text-green-500"
          )}>
            {isBlocked ? "Blocked" : "Active"}
          </span>
        );
      }
    },
    {
      header: 'Actions',
      accessorKey: 'actions',
      cell: ({ row }: any) => {
        const isBlocked = row?.original?.user?.isBlocked;
        const managerId = row?.original?.id;
        const userId = row?.original?.userId;

        return (
          <div className="flex gap-2">
            <IconWrapper
              onClick={() => {
                navigate(`/admin/support/${managerId}`);
              }}
              className={cn("border p-2 w-fit h-fit rounded border-[#666666] cursor-pointer hover:bg-gray-50")}
            >
              <HugeiconsIcon size={16} icon={UserIcon} />
            </IconWrapper>
            <TakeConfirm
              title={`Are you sure you want to ${isBlocked ? 'unblock' : 'block'} this member?`}
              cancelText="Cancel"
              confirmText="Confirm"
              onConfirm={() => handleToggleStatus(userId)}
            >
              <IconWrapper
                className={cn(
                  "border p-2 w-fit h-fit rounded cursor-pointer",
                  isBlocked ? "border-[#666666] hover:bg-gray-50" : "border-[#DC3545] hover:bg-red-50",
                )}
              >
                <HugeiconsIcon
                  color={isBlocked ? "#666666" : "#DC3545"}
                  size={16}
                  icon={isBlocked ? CircleIcon : UnavailableIcon}
                />
              </IconWrapper>
            </TakeConfirm>
          </div>
        );
      },
    },
  ];

  return (
    <PageLayout
      title="Support Team Member"
      action={
        <Link to={`/admin/support/add`}>
          <Button className="bg-brand text-white" variant="outline">
            <HugeiconsIcon icon={AddSquareIcon} /> Add New Member
          </Button>
        </Link>
      }
    >
      {isStatusUpdating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
          <Loader className="animate-spin text-brand" size={48} />
        </div>
      )}
      <PageContent>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader className="animate-spin text-brand" size={40} />
          </div>
        ) : (
          <DynamicTable columns={columns} data={managers} />
        )}
      </PageContent>
    </PageLayout>
  );
}

export default SupportTeamMember;