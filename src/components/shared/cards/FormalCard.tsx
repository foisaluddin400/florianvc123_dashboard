import { Loader } from 'lucide-react'
import { memo, Suspense } from 'react'
import { cn } from '../../../lib/utils'


function FormalCard({ children, header, bodyStyle, headerStyle, action }: { children: React.ReactNode, header?: React.ReactNode, bodyStyle?: string, headerStyle?: string, action?: React.ReactNode }) {
  return (
    <Suspense fallback={<Loader className='animate-spin w-full flex-1' />}>
      <div className={cn('border-[.5px] border-muted-foreground/20 rounded-lg', bodyStyle)}>
        {header &&
          <div className={cn("border-b-[.5px] flex justify-between items-center border-muted-foreground/20 p-4", headerStyle)}>
            {header} {action && action}
          </div>
        }

        <div className="p-4">
          {children}
        </div>
      </div>
    </Suspense>
  )
}

export default memo(FormalCard)
