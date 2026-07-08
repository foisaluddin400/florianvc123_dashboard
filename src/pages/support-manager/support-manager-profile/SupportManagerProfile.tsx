import { LockPasswordIcon, UserEdit01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useNavigate } from 'react-router-dom'
import FormalCard from '../../../components/shared/cards/FormalCard'
import { PageContent, PageLayout } from '../../../components/shared/PageLayout'
import Space from '../../../components/shared/Space'
import { Button } from '../../../components/ui/button'
import { cn } from '../../../lib/utils'
import { useGetProfileQuery } from '../../../redux/services/profileApis'
import { Loader } from 'lucide-react'

const SupportManagerProfile = () => {
  const navigate = useNavigate()
  const { data: profileResponse, isLoading } = useGetProfileQuery();
  const user = profileResponse?.data;

  if (isLoading) {
    return (
      <PageLayout title='Manage Profile'>
        <div className="flex justify-center items-center py-40">
          <Loader className="animate-spin text-brand" size={40} />
        </div>
      </PageLayout>
    );
  }

  if (!user) {
    return (
      <PageLayout title='Manage Profile'>
        <div className="p-10 text-center text-gray-500">Profile data not found.</div>
      </PageLayout>
    );
  }

  const fullName = user?.name || "N/A";
  const email = user?.email || "N/A";
  const contactPhone = user?.phone || "N/A";
  const status = user?.user?.isBlocked ? "Blocked" : "Active";
  const profileImage = user?.profile_image;
  const firstLetter = fullName.trim().charAt(0).toUpperCase();

  return (
    <PageLayout title='Manage Profile'>
      <PageContent>
        <div className="w-32 h-32 mb-6">
          {profileImage ? (
            <img src={profileImage} alt={fullName} className='w-full h-full rounded-lg object-cover border' />
          ) : (
            <div className="w-full h-full rounded-lg bg-brand/10 text-brand flex items-center justify-center text-4xl font-bold border border-brand/20">
              {firstLetter}
            </div>
          )}
        </div>
        <FormalCard header="My Information">
          <div className="responsive-grid-2">
            <div>
              <h1 className='text-[#B0B0B0] font-nunito-semibold-italic'>Full Name</h1>
              <h1 className='text-[#666666] font-medium'>{fullName}</h1>
            </div>
            <div>
              <h1 className='text-[#B0B0B0] font-nunito-semibold-italic'>Email</h1>
              <h1 className='text-[#666666] font-medium'>{email}</h1>
            </div>
            <div>
              <h1 className='text-[#B0B0B0] font-nunito-semibold-italic'>Contact Phone</h1>
              <h1 className='text-[#666666] font-medium'>{contactPhone}</h1>
            </div>
            <div>
              <h1 className='text-[#B0B0B0] flex font-nunito-semibold-italic'>Status</h1>
              <h1 className={cn('font-semibold', status === 'Active' ? 'text-green-600' : 'text-red-600')}>{status}</h1>
            </div>
          </div>
          <Space size={4} />
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={() => {
                navigate('/support-manager/profile/update-profile')
              }}
              className='bg-linear-to-bl to-brand from-[#B08D59]'>
              <HugeiconsIcon icon={UserEdit01Icon} className="mr-2" />Update profile
            </Button>
            <Button
              onClick={() => {
                navigate('/support-manager/profile/change-password')
              }}
              className='bg-linear-to-bl to-red-900 from-red-500'>
              <HugeiconsIcon icon={LockPasswordIcon} className="mr-2" />Update password
            </Button>
          </div>
        </FormalCard>
      </PageContent>
    </PageLayout>
  )
}

export default SupportManagerProfile