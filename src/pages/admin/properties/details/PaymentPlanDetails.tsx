import { Download, Eye, Loader } from 'lucide-react'
import { useParams } from 'react-router-dom'
import FormalCard from '../../../../components/shared/cards/FormalCard'
import { PageContent, PageLayout } from '../../../../components/shared/PageLayout'
import { useGetSinglePropertyPlanQuery } from '../../../../redux/paymentApi/paymentApi'

const formatDate = (dateStr: string) => {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  })
}

const handleDownload = (fileUrl: string, fileName: string) => {
  if (!fileUrl) return
  const link = document.createElement('a')
  link.href = fileUrl
  link.download = fileName || 'download'
  link.target = '_blank'
  link.rel = 'noopener noreferrer'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

function PaymentPlanDetails() {
  const { id } = useParams()

  const { data: response, isLoading } = useGetSinglePropertyPlanQuery(id, {
    skip: !id,
  })

  const plan = response?.data

  return (
    <PageLayout title={`The Wilds\nProject / Payment Plan`}>
      <PageContent>
        <FormalCard header="Payment Plan Details">

          {/* Loading skeleton */}
          {isLoading && (
            <div className="flex items-center justify-center py-16">
              <div className="flex flex-col items-center gap-3">
                <Loader size={32} className="animate-spin text-brand" />
                <span className="text-sm text-gray-400">Loading plan details...</span>
              </div>
            </div>
          )}

          {/* Real data */}
          {!isLoading && plan && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12 mb-8">
                <div>
                  <h3 className="text-[#B0B0B0] font-nunito-semibold-italic text-sm">Plan Name</h3>
                  <p className="text-gray-600 font-medium">{plan.name || '—'}</p>
                </div>
                <div>
                  <h3 className="text-[#B0B0B0] font-nunito-semibold-italic text-sm">Plan Date</h3>
                  <p className="text-gray-600 font-medium">{formatDate(plan.createdAt)}</p>
                </div>
                <div>
                  <h3 className="text-[#B0B0B0] font-nunito-semibold-italic text-sm">Last Updated</h3>
                  <p className="text-gray-600 font-medium">{formatDate(plan.updatedAt)}</p>
                </div>
              </div>

              {/* File section */}
              <div className="mt-4">
                <h3 className="text-[#B0B0B0] font-nunito-semibold-italic text-sm mb-2">Plan File</h3>
                <div className="flex items-center justify-between p-3 border border-muted-foreground/20 rounded-lg">
                  <span className="text-gray-600 font-medium">{plan.name || 'No file name'}</span>
                  <div className="flex gap-2">
                    {plan.file_url ? (
                      <>
                        <button
                          onClick={() => window.open(plan.file_url, '_blank')}
                          className="p-2 rounded-md bg-[#FAF5FF] text-purple-500 hover:bg-[#F3E8FF] transition-colors cursor-pointer"
                          title="View"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => handleDownload(plan.file_url, plan.name)}
                          className="p-2 rounded-md bg-[#EFF6FF] text-blue-500 hover:bg-[#DBEAFE] transition-colors cursor-pointer"
                          title="Download"
                        >
                          <Download size={18} />
                        </button>
                      </>
                    ) : (
                      <span className="text-xs text-gray-400 italic px-2 py-1">No file attached</span>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* No data */}
          {!isLoading && !plan && (
            <p className="text-center text-gray-400 py-10">Plan details not found.</p>
          )}

        </FormalCard>
      </PageContent>
    </PageLayout>
  )
}

export default PaymentPlanDetails

