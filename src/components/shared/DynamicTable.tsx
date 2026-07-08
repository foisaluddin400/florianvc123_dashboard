import { ArrowLeft01Icon, ArrowRight01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useState } from 'react'
import { ManageTable } from '../../pages/admin/clients/manageTable'
import { Button } from '../ui/button'

function DynamicTable({ columns, data, header = true, isLoading }: { columns: any, data: any, header?: boolean, isLoading?: boolean }) {
  const [currentPage, setCurrentPage] = useState(0)
  const pageSize = 5
  const pageCount = Math.ceil(data?.length / pageSize)

  const startIndex = currentPage * pageSize
  const endIndex = startIndex + pageSize
  const currentData = data?.slice(startIndex, endIndex)

  const pageNumbers = Array.from({ length: pageCount }, (_, i) => i + 1)

  

  const getVisiblePages = () => {
    if (pageCount <= 4) {
      return pageNumbers
    }

    const pages = []
    if (currentPage > 0) {
      pages.push(currentPage)
    }

    pages.push(currentPage + 1)

    if (currentPage < pageCount - 1) {
      pages.push(currentPage + 2)
    }

    if (!pages.includes(pageCount) && pageCount !== currentPage + 1) {
      pages.push(pageCount)
    }

    return [...new Set(pages)].sort((a, b) => a - b)
  }

  return (
    <div>
      <ManageTable isLoading={isLoading} header={header} className='rounded-bl-none rounded-br-none' columns={columns} data={currentData} />
      {currentData.length > 8 && <div className="flex items-center justify-center bg-brand/20 rounded-bl-2xl rounded-br-2xl px-4 py-3">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 0}
          >
            <HugeiconsIcon icon={ArrowLeft01Icon} />
          </Button>

          <div className="flex space-x-1">
            {getVisiblePages().map((pageNum, index) => {
              const prevNum = getVisiblePages()[index - 1]
              const showEllipsis = prevNum && pageNum - prevNum > 1

              return (
                <div key={pageNum} className="flex items-center">
                  {showEllipsis && (
                    <span className="px-2 text-muted-foreground">...</span>
                  )}
                  <Button
                    variant={pageNum === currentPage + 1 ? "default" : "outline"}
                    size="sm"
                    className="w-8 h-8 p-0"
                    onClick={() => setCurrentPage(pageNum - 1)}
                  >
                    {pageNum}
                  </Button>
                </div>
              )
            })}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === pageCount - 1}
          >
            <HugeiconsIcon icon={ArrowRight01Icon} />
          </Button>
        </div>
      </div>}
    </div>
  )
}

export default DynamicTable