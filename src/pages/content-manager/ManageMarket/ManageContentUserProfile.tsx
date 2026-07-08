
import FormalCard from '../../../components/shared/cards/FormalCard'
import { PageContent, PageLayout } from '../../../components/shared/PageLayout'
import Space from '../../../components/shared/Space'
import { cn } from '../../../lib/utils'

interface ClientDetails {
  profileImage: string
  fullName: string
  email: string
  contactPhone: string
  status: string
}

const ManageContentUserProfile = () => {
  const clientDetails: ClientDetails = {
    profileImage: 'https://krita-artists.org/uploads/default/original/3X/c/f/cfc4990e32f31acd695481944f2163e96ff7c6ba.jpeg',
    fullName: 'Roberts Junior',
    email: 'robert @canaletto.com',
    contactPhone: '+ 1 919 - 555 -0284',
    status: 'Active',
  }
  return (
    <PageLayout title='Manager Details'>
      <PageContent>
        <div className="w-32 h-32 mb-4">
          <img src={clientDetails.profileImage} alt="Profile" className='w-full h-full rounded-md' />
        </div>
        <FormalCard header="Manager Information">
          <div className="responsive-grid-2">
            <div className="">
              <h1 className='text-[#B0B0B0] font-nunito-semibold-italic'>Full Name</h1>
              <h1 className='text-[#666666]'>{clientDetails.fullName}</h1>
            </div>
            <div className="">
              <h1 className='text-[#B0B0B0] font-nunito-semibold-italic'>Email</h1>
              <h1 className='text-[#666666]'>{clientDetails.email}</h1>
            </div>
            <div className="">
              <h1 className='text-[#B0B0B0] font-nunito-semibold-italic'>Contact Phone</h1>
              <h1 className='text-[#666666]'>{clientDetails.contactPhone}</h1>
            </div>
            <div className='text-[#B0B0B0] font-nunito-semibold-italic'>
              <h1>Status</h1>
              <h1 className={cn('font-semibold', clientDetails.status === 'Active' ? 'text-green-600' : 'text-red-600')}>{clientDetails.status}</h1>
            </div>
          </div>
          <Space size={4} />

        </FormalCard>
      </PageContent>
    </PageLayout>
  )
}

export default ManageContentUserProfile