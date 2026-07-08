import { AiContentGenerator02Icon, Analytics02Icon, City01Icon, UserIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Loader } from 'lucide-react'
import { lazy, Suspense } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import ComponentTitle from '../../components/shared/ComponentTitle'
import DynamicTable from '../../components/shared/DynamicTable'
import { PageLayout } from '../../components/shared/PageLayout'
import { clientColumns } from './clients/clientColumns'
import { useGetAllAdminStatsQuery } from '../../redux/dashbordStats/adminData/adminStatsApi'
import { useGetAllClientsQuery, useBlockUnblockUserMutation } from '../../redux/propertyManager/client/clientApi'

const StatusCard = lazy(() => import('../../components/shared/cards/StatusCard'));
const Activities = lazy(() => import('../../components/admin-components/Activities'));

function AdminDashboard() {
  const navigate = useNavigate()
  const { data: adminStats } = useGetAllAdminStatsQuery();
  const { data: clients } = useGetAllClientsQuery();
  const [blockUnblockUser, { isLoading: isStatusUpdating }] = useBlockUnblockUserMutation()

  const totalClient = adminStats?.data?.totalClient
  const totalProperties = adminStats?.data?.totalProperty
  const activeProjects = adminStats?.data?.activeProject
  const totalContent = adminStats?.data?.totalContent

  const statusData = [
    {
      title: "Total Clients",
      value: totalClient,
      icon: <HugeiconsIcon icon={UserIcon} />
    },
    {
      title: "Total Properties",
      value: totalProperties,
      icon: <HugeiconsIcon icon={City01Icon} />
    },
    {
      title: "Active Projects",
      value: activeProjects,
      icon: <HugeiconsIcon icon={UserIcon} />
    },
    {
      title: "Total Content",
      value: totalContent,
      icon: <HugeiconsIcon icon={AiContentGenerator02Icon} />
    }
  ]

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


  return (
    <Suspense fallback={<Loader className='animate-spin' />}>
      <PageLayout title="Admin Dashboard" icon={<HugeiconsIcon icon={Analytics02Icon} />}>
        {isStatusUpdating && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/40 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-3">
              <Loader size={40} className="animate-spin text-brand" />
              <span className="text-sm font-medium text-gray-500">Updating status...</span>
            </div>
          </div>
        )}
        <div className="flex flex-col gap-4">
          <div className='responsive-grid-4'>
            {statusData.map((item, index) => (
              <StatusCard key={index} title={item.title} value={item.value} icon={item.icon} />
            ))}
          </div>
          <Activities />
          <ComponentTitle title="Recently added clients" buttonLabel="View All" onButtonClick={() => navigate('/admin/clients')} />
          <DynamicTable columns={clientColumns((id) => navigate(`/admin/clients/${id}`), handleToggleStatus)} data={clients?.data?.slice(0, 4) || []} />
        </div>
      </PageLayout>
    </Suspense>
  )
}

export default AdminDashboard