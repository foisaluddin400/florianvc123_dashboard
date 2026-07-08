import { Download, Eye } from 'lucide-react'
import FormalCard from '../../../components/shared/cards/FormalCard'
import { PageContent, PageLayout } from '../../../components/shared/PageLayout'

function PaymentPlanDetailsPropetyPanel() {
  const planInfo = {
    planDate: '30 Aug 2025',
    paymentDetails: 'Standard Payment Plan',
    fileName: 'Payment_plan_document.Pdf'
  }

  return (
    <PageLayout title={`The Wilds\nProject / Payment Plan`} >
      <PageContent >
        <FormalCard header="Payment Plan Details">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12 mb-8">
            <div>
              <h3 className="text-[#B0B0B0] font-nunito-semibold-italic text-sm">Plan Date</h3>
              <p className="text-gray-600 font-medium">{planInfo.planDate}</p>
            </div>
            <div>
              <h3 className="text-[#B0B0B0] font-nunito-semibold-italic text-sm">Payment Details</h3>
              <p className="text-gray-600 font-medium">{planInfo.paymentDetails}</p>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-[#B0B0B0] font-nunito-semibold-italic text-sm mb-2">Property Location</h3>
            <div className="flex items-center justify-between p-3 border border-muted-foreground/20 rounded-lg">
              <span className="text-gray-600 font-medium">{planInfo.fileName}</span>
              <div className="flex gap-2">
                <button
                  className="p-2 rounded-md bg-[#FAF5FF] text-purple-500 hover:bg-[#F3E8FF] transition-colors cursor-pointer"
                  title="View"
                >
                  <Eye size={18} />
                </button>
                <button
                  className="p-2 rounded-md bg-[#EFF6FF] text-blue-500 hover:bg-[#DBEAFE] transition-colors cursor-pointer"
                  title="Download"
                >
                  <Download size={18} />
                </button>
              </div>
            </div>
          </div>
        </FormalCard>
      </PageContent>
    </PageLayout>
  )
}

export default PaymentPlanDetailsPropetyPanel
