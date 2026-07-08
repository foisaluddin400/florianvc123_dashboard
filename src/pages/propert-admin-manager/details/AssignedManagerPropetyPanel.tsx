import { PageContent, PageLayout } from '../../../components/shared/PageLayout'
import FormalCard from '../../../components/shared/cards/FormalCard'
import imageUser from "../../../../assets/Image.png"

function AssignedManagerPropetyPanel() {
  const managerInfo = {
    name: 'Roberts Junior',
    email: 'robert@canaletto.com',
    phone: '+1 919-555-0284',
    status: 'Active',
    profileImage: imageUser
  }

  return (
    <PageLayout title={`The Wilds\nProject / Assigned Manager`} >
      <PageContent >
        <div className="mb-6">
          <img
            src={managerInfo.profileImage}
            alt={managerInfo.name}
            className="w-24 h-24 rounded-2xl object-cover border-4 border-white shadow-sm"
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

export default AssignedManagerPropetyPanel
