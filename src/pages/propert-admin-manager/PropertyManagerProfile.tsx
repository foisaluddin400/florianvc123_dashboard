import { LockPasswordIcon, UserEdit01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useNavigate } from 'react-router-dom'
import FormalCard from '../../components/shared/cards/FormalCard'
import { PageContent, PageLayout } from '../../components/shared/PageLayout'
import Space from '../../components/shared/Space'
import { Button } from '../../components/ui/button'
import { cn } from '../../lib/utils'
import { useGetProfileQuery } from '../../redux/services/profileApis'
import { Loader } from 'lucide-react'

const PropertyManagerProfile = () => {
  const navigate = useNavigate()


  const { data: profile, isLoading } = useGetProfileQuery()

  const profileData = profile?.data


  const name = profileData?.name || "N/A"
  const email = profileData?.email || "N/A"
  const phone = profileData?.phone || "N/A"


  const isActive = profileData?.user?.isBlocked === false
  const status = isActive ? "Active" : "Blocked"

  const profileImage = profileData?.profile_image
  const firstLetter = name.trim().charAt(0).toUpperCase()


  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader className="animate-spin text-brand" size={40} />
      </div>
    )
  }

  return (
    <PageLayout title='Manage Profile'>
      <PageContent>

        <div className="w-32 h-32 mb-6">
          {profileImage ? (
            <img
              src={profileImage}
              alt={name}
              className='w-full h-full rounded-md object-cover border'
            />
          ) : (
            <div className="w-full h-full rounded-md bg-brand/10 text-brand flex items-center justify-center text-4xl font-bold border border-brand/20 rounded-xl ">
              {firstLetter}
            </div>
          )}
        </div>

        <FormalCard header="My Information">
          <div className="responsive-grid-2 gap-y-6">
            <div>
              <h1 className='text-[#B0B0B0] font-nunito-semibold-italic text-sm'>Full Name</h1>
              <h1 className='text-[#666666] font-medium'>{name}</h1>
            </div>
            <div>
              <h1 className='text-[#B0B0B0] font-nunito-semibold-italic text-sm'>Email</h1>
              <h1 className='text-[#666666] font-medium'>{email}</h1>
            </div>
            <div>
              <h1 className='text-[#B0B0B0] font-nunito-semibold-italic text-sm'>Contact Phone</h1>
              <h1 className='text-[#666666] font-medium'>{phone}</h1>
            </div>
            <div>
              <h1 className='text-[#B0B0B0] font-nunito-semibold-italic text-sm'>Status</h1>
              <h1 className={cn(
                'font-semibold',
                isActive ? 'text-green-600' : 'text-red-600'
              )}>
                {status}
              </h1>
            </div>
          </div>

          <Space size={6} />

          <div className="flex flex-wrap gap-3">
            <Button
              onClick={() => {
                navigate('/property-admin/profile/update-profile')
              }}
              className='bg-linear-to-bl to-brand from-[#B08D59] py-6 px-6'>
              <HugeiconsIcon icon={UserEdit01Icon} className='mr-2' />
              Update profile
            </Button>
            <Button
              onClick={() => {
                navigate('/property-admin/profile/change-password')
              }}
              className='bg-linear-to-bl to-red-900 from-red-500 py-6 px-6'>
              <HugeiconsIcon icon={LockPasswordIcon} className='mr-2' />
              Update password
            </Button>
          </div>
        </FormalCard>
      </PageContent>
    </PageLayout>
  )
}

export default PropertyManagerProfile;