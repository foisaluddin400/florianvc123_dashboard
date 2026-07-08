import { Delete02Icon, Download04FreeIcons, Edit02FreeIcons, PlusSignSquareIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Eye } from 'lucide-react'
import { Link } from 'react-router-dom'
import FormalCard from '../../../components/shared/cards/FormalCard'
import NoData from '../../../components/shared/NoData'
import { PageContent, PageLayout } from '../../../components/shared/PageLayout'
import { Button } from '../../../components/ui/button'
import TakeConfirm from '../../../components/ui/take-confirm'

const propertyFiles = [
  { id: '1', name: 'Property_document 01 .Pdf', pdfLink: 'https://tourism.gov.in/sites/default/files/2019-04/dummy-pdf_2.pdf' },
  { id: '2', name: 'Property_document 02 .Pdf', pdfLink: 'https://tourism.gov.in/sites/default/files/2019-04/dummy-pdf_2.pdf' },
  { id: '3', name: 'Property_document 03 .Pdf', pdfLink: 'https://tourism.gov.in/sites/default/files/2019-04/dummy-pdf_2.pdf' },
]

function PropertyFilesPropetyPanel() {

  const handleView = (url: string) => {
    window.open(url, '_blank')
  }

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
    <PageLayout title="The Wilds
Project / Property Files" >
      <PageContent >
        <FormalCard header="Property Files" bodyStyle="p-0" action={
          <Link to={"/property-files/create"}>
            <Button className='bg-brand hover:bg-brand cursor-pointer' ><HugeiconsIcon icon={PlusSignSquareIcon} /> Add New File</Button>
          </Link>
        } >
          {propertyFiles.length > 0 ? (
            <div className="flex flex-col">
              {propertyFiles.map((file, index) => (
                <div
                  key={file.id}
                  className={`flex items-center justify-between py-4 ${index !== propertyFiles.length - 1 ? 'border-b border-muted-foreground/10' : ''
                    }`}
                >
                  <span className="text-gray-600 font-medium">{file.name}</span>
                  <div className="flex gap-2">
                    <Link to={`/property-files/edit/${file.id}`}>
                      <button
                        className="p-2 rounded-md bg-green-50 text-green-500 hover:bg-[#F3E8FF] transition-colors cursor-pointer"
                        title="Edit"
                      >
                        <HugeiconsIcon icon={Edit02FreeIcons} />
                      </button>
                    </Link>
                    <TakeConfirm
                      onConfirm={() => handleDelete(file.id)}
                      title="Delete File"
                      description="Are you sure you want to delete this file?"
                    >
                      <button
                        className="p-2 rounded-md bg-red-50 text-red-500 hover:bg-[#F3E8FF] transition-colors cursor-pointer"
                        title="Delete"
                      >
                        <HugeiconsIcon icon={Delete02Icon} />
                      </button>
                    </TakeConfirm>
                    <button
                      className="p-2 rounded-md bg-[#FAF5FF] text-purple-500 hover:bg-[#F3E8FF] transition-colors cursor-pointer"
                      title="View"
                      onClick={() => handleView(file.pdfLink)}
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      className="p-2 rounded-md bg-[#FAF5FF] text-purple-500 hover:bg-[#F3E8FF] transition-colors cursor-pointer"
                      title="Download"
                      onClick={() => handleDownload(file.pdfLink, file.name)}
                    >
                      <HugeiconsIcon icon={Download04FreeIcons} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <NoData message="No Property Files Available" />
          )}
        </FormalCard>
      </PageContent>
    </PageLayout>
  )
}

export default PropertyFilesPropetyPanel
