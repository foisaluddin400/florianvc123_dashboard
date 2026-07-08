import { LockPasswordIcon, UserEdit01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Loader } from 'lucide-react'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

import FormalCard from '../../../components/shared/cards/FormalCard'
import { PageContent, PageLayout } from '../../../components/shared/PageLayout'
import Space from '../../../components/shared/Space'
import { Button } from '../../../components/ui/button'
import { cn } from '../../../lib/utils'
import { useGetProfileQuery } from '../../../redux/services/profileApis'


const AdminProfile = () => {
  const navigate = useNavigate()

  const { data, isLoading } = useGetProfileQuery()
console.log(data)
  /* ---------- Loading ---------- */

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-150px)]">
        <Loader className="animate-spin" />
      </div>
    )
  }

  /* ---------- Memoized Profile Data ---------- */

  const profile = useMemo(() => {
    const user = data?.data

    return {
      profileImage: user?.profile_image ?? '',
      fullName: user?.name ?? 'Roberts Junior',
      email: user?.email ?? 'robert@canaletto.com',
      phone: user?.phone ?? '+1 919-555-0284',
      status: user?.user?.isBlocked ? 'Inactive' : 'Active',
      firstLetter: user?.name?.charAt(0)?.toUpperCase() ?? 'U'
    }
  }, [data])

  /* ---------- Navigation Handlers ---------- */

  const goUpdateProfile = () => navigate('/admin/profile/update')
  const goChangePassword = () => navigate('/admin/profile/change-password')

  return (
    <PageLayout title="Manage Profile">
      <PageContent>

        {/* ---------- Profile Image ---------- */}

        <div className="w-32 h-32 mb-4">
          {profile.profileImage ? (
            <img
              src={profile.profileImage}
              alt="Profile"
              className="w-full h-full rounded-xl object-cover"
            />
          ) : (
            <div className="w-full h-full bg-brand/50 rounded-xl flex items-center justify-center text-2xl font-bold text-white">
              {profile.firstLetter}
            </div>
          )}
        </div>

        {/* ---------- Profile Information ---------- */}

        <FormalCard header="My Information">
          <div className="responsive-grid-2">

            <div>
              <h1 className="text-[#B0B0B0] font-nunito-semibold-italic">Full Name</h1>
              <h1 className="text-[#666666]">{profile.fullName}</h1>
            </div>

            <div>
              <h1 className="text-[#B0B0B0] font-nunito-semibold-italic">Email</h1>
              <h1 className="text-[#666666]">{profile.email}</h1>
            </div>

            <div>
              <h1 className="text-[#B0B0B0] font-nunito-semibold-italic">Contact Phone</h1>
              <h1 className="text-[#666666]">{profile.phone}</h1>
            </div>

            <div>
              <h1 className="text-[#B0B0B0] font-nunito-semibold-italic">Status</h1>
              <h1
                className={cn(
                  'font-semibold',
                  profile.status === 'Active'
                    ? 'text-green-600'
                    : 'text-red-600'
                )}
              >
                {profile.status}
              </h1>
            </div>

          </div>

          <Space size={4} />

          {/* ---------- Actions ---------- */}

          <div className="flex gap-2">

            <Button
              onClick={goUpdateProfile}
              className="bg-linear-to-bl to-brand from-[#B08D59]"
            >
              <HugeiconsIcon icon={UserEdit01Icon} />
              Update profile
            </Button>

            <Button
              onClick={goChangePassword}
              className="bg-linear-to-bl to-red-900 from-red-500"
            >
              <HugeiconsIcon icon={LockPasswordIcon} />
              Update password
            </Button>

          </div>
        </FormalCard>

      </PageContent>
    </PageLayout>
  )
}

export default AdminProfile