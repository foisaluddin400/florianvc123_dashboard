import { Loader } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import { PageContent, PageLayout } from '../../../../components/shared/PageLayout'
import FormalCard from '../../../../components/shared/cards/FormalCard'
import imageUser from "../../../../assets/Image.png"
import { useGetSinglePropertyQuery } from '../../../../redux/property/propertyApis'

function AssignedManager() {
  const state = useLocation().state
  const propertyId = state?.id

  const { data: propertyData, isLoading } = useGetSinglePropertyQuery(propertyId, {
    skip: !propertyId,
  })

  const property = propertyData?.data
  const managerData = property?.manager

  if (isLoading) {
    return (
      <PageLayout title="Assigned Manager">
        <PageContent>
           <div className="flex justify-center flex-col items-center h-[50vh] gap-3">
             <Loader className='animate-spin w-8 h-8 text-brand' />
             <span className="text-sm font-medium text-gray-500">Loading manager details...</span>
           </div>
        </PageContent>
      </PageLayout>
    )
  }

  const managerInfo = {
    name: managerData?.name || 'N/A',
    email: managerData?.email || 'N/A',
    phone: managerData?.phone || 'N/A',
    status: managerData?.status || 'Active',
    profileImage: managerData?.profile_image || imageUser
  }

  const projectName = property?.name || 'Project'

  return (
    <PageLayout title={`${projectName}\nProject / Assigned Manager`} >
      <PageContent >
        <div className="mb-6">
          <img
            src={managerInfo.profileImage}
            alt={managerInfo.name}
            className="w-24 h-24 rounded-2xl object-cover border-4 border-white shadow-sm bg-gray-100"
          />
        </div>

        <FormalCard header="Manager Information">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12 py-2">
            <div>
              <h3 className="text-[#B0B0B0] font-nunito-semibold-italic text-sm">Full Name</h3>
              <p className="text-gray-600 font-medium">{managerInfo.name}</p>
            </div>
            <div>
              <h3 className="text-[#B0B0B0] font-nunito-semibold-italic text-sm">Email Address</h3>
              <p className="text-gray-600 font-medium">{managerInfo.email}</p>
            </div>
            <div>
              <h3 className="text-[#B0B0B0] font-nunito-semibold-italic text-sm">Contact Phone / WhatsApp</h3>
              <p className="text-gray-600 font-medium">{managerInfo.phone}</p>
            </div>
            <div>
              <h3 className="text-[#B0B0B0] font-nunito-semibold-italic text-sm">Status</h3>
              <p className="text-green-500 font-medium">{managerInfo.status}</p>
            </div>
          </div>
        </FormalCard>
      </PageContent>
    </PageLayout>
  )
}

export default AssignedManager
