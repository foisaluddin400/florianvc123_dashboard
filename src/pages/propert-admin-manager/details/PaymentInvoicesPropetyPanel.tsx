import { Delete02Icon, Download04FreeIcons, Edit02FreeIcons, PlusSignSquareFreeIcons } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Eye } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import FormalCard from '../../../components/shared/cards/FormalCard'
import NoData from '../../../components/shared/NoData'
import { PageContent, PageLayout } from '../../../components/shared/PageLayout'
import { Button } from '../../../components/ui/button'
import TakeConfirm from '../../../components/ui/take-confirm'


const invoicesData = [
  { id: '1', name: 'Invoice01 .Pdf', status: 'Open', statusColor: 'text-orange-500', pdfLink: 'https://tourism.gov.in/sites/default/files/2019-04/dummy-pdf_2.pdf' },
  { id: '2', name: 'Invoice02 .Pdf', status: 'Partially Paid', statusColor: 'text-blue-500', pdfLink: 'https://tourism.gov.in/sites/default/files/2019-04/dummy-pdf_2.pdf' },
  { id: '3', name: 'Invoice03 .Pdf', status: 'Paid', statusColor: 'text-green-500', pdfLink: 'https://tourism.gov.in/sites/default/files/2019-04/dummy-pdf_2.pdf' },
]

const paymentPlanData = [
  { id: '1', name: 'Invoice01 .Pdf', date: '30 Aug 2025', pdfLink: 'https://tourism.gov.in/sites/default/files/2019-04/dummy-pdf_2.pdf' },
  { id: '2', name: 'Invoice02 .Pdf', date: '30 Aug 2025', pdfLink: 'https://tourism.gov.in/sites/default/files/2019-04/dummy-pdf_2.pdf' },
  { id: '3', name: 'Invoice03 .Pdf', date: '30 Aug 2025', pdfLink: 'https://tourism.gov.in/sites/default/files/2019-04/dummy-pdf_2.pdf' },
]

function PaymentInvoicesPropetyPanel() {
  const [activeTab, setActiveTab] = useState<'invoices' | 'plan'>('invoices')
  // const {data:paymentPlanData, isLoading} = useGetPropertyPlanQuery(id)

  const navigate = useNavigate()

  const handleDownload = async (url: string, name: string) => {
    try {
      const response = await fetch(url)
      const blob = await response.blob()

      const link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = name
      document.body.appendChild(link)

      link.click()

      document.body.removeChild(link)
    } catch (error) {
      console.error('Download failed:', error)
      alert('Download failed' + error)
    }
  }

  const handleDelete = (id: string) => {
    console.log('Delete file id:', id)
    alert('Delete file id: ' + id)
  }
  return (
    <PageLayout title={`The Wilds\nProject / Payment Invoices`} >
      <PageContent >
        <FormalCard header="Payment Invoices" bodyStyle="p-0" action={activeTab === "plan" ?
          <Link to={"/property-admin/properties/invoices/add"}> <Button className='bg-brand hover:bg-brand cursor-pointer'><HugeiconsIcon icon={PlusSignSquareFreeIcons} /> Add New Plan</Button></Link>
          : null}>
          <div className="flex flex-col">
            {/* Toggle Header */}
            <div className="flex items-center gap-6 p-4 border-b border-muted-foreground/10">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="radio"
                  name="payment_view"
                  checked={activeTab === 'invoices'}
                  onChange={() => setActiveTab('invoices')}
                  className="w-4 h-4 accent-gray-600 cursor-pointer"
                />
                <span className={`text-sm font-medium ${activeTab === 'invoices' ? 'text-gray-600' : 'text-gray-400'} group-hover:text-gray-600`}>
                  Payment Invoices
                </span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="radio"
                  name="payment_view"
                  checked={activeTab === 'plan'}
                  onChange={() => setActiveTab('plan')}
                  className="w-4 h-4 accent-gray-600 cursor-pointer"
                />
                <span className={`text-sm font-medium ${activeTab === 'plan' ? 'text-gray-600' : 'text-gray-400'} group-hover:text-gray-600`}>
                  Payment Plan
                </span>
              </label>
            </div>

            {/* List */}
            <div className="flex flex-col">
              {((activeTab === 'invoices' ? invoicesData : paymentPlanData) as any[]).length > 0 ? (
                (activeTab === 'invoices' ? invoicesData : paymentPlanData).map((item, index, array) => (
                  <div
                    key={item.id}
                    className={`flex items-center justify-between p-4 ${index !== array.length - 1 ? 'border-b border-muted-foreground/10' : ''
                      }`}
                  >
                    <div className="flex flex-col gap-1">
                      <span className="text-gray-600 font-medium">{item.name}</span>
                      {'status' in item ? (
                        <span className={`text-xs ${item.statusColor}`}>{item.status}</span>
                      ) : (
                        <span className="text-xs text-gray-400">{item.date}</span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      {activeTab === "plan" && <Link to={`/property-files/edit/${item.id}`}>
                        <button
                          className="p-2 rounded-md bg-green-50 text-green-500 hover:bg-[#F3E8FF] transition-colors cursor-pointer"
                          title="Edit"
                        >
                          <HugeiconsIcon icon={Edit02FreeIcons} />
                        </button>
                      </Link>}
                      {activeTab === "plan" && <TakeConfirm
                        onConfirm={() => handleDelete(item.id)}
                        title="Delete File"
                        description="Are you sure you want to delete this file?"
                      >
                        <button
                          className="p-2 rounded-md bg-red-50 text-red-500 hover:bg-[#F3E8FF] transition-colors cursor-pointer"
                          title="Delete"
                        >
                          <HugeiconsIcon icon={Delete02Icon} />
                        </button>
                      </TakeConfirm>}
                      <button
                        className="p-2 rounded-md bg-[#FAF5FF] text-purple-500 hover:bg-[#F3E8FF] transition-colors cursor-pointer"
                        title="View"
                        onClick={() => navigate(activeTab === 'invoices'
                          ? `/admin/properties/invoices/${item.id}`
                          : `/admin/properties/payment-plan/${item.id}`
                        )}
                      >
                        <Eye size={18} />
                      </button>
                      {activeTab === "plan" && <button
                        className="p-2 rounded-md bg-[#FAF5FF] text-purple-500 hover:bg-[#F3E8FF] transition-colors cursor-pointer"
                        title="Download"
                        onClick={() => handleDownload(item.pdfLink, item.name)}
                      >
                        <HugeiconsIcon icon={Download04FreeIcons} />
                      </button>}
                    </div>
                  </div>
                ))
              ) : (
                <NoData message={activeTab === 'invoices' ? "No Payment Invoice Available" : "No Payment Plan Available"} />
              )}
            </div>
          </div>
        </FormalCard>
      </PageContent>
    </PageLayout>
  )
}

export default PaymentInvoicesPropetyPanel
