import { Loader } from 'lucide-react'
import { memo, Suspense } from 'react'
import { cn } from '../../../lib/utils'
import { HugeiconsIcon } from '@hugeicons/react'
import { ArrowLeft02Icon } from '@hugeicons/core-free-icons'

interface ChatFormalCardProps {
    children: React.ReactNode
    name?: string
    avater?: string
    status?: string
    bodyStyle?: string
    headerStyle?: string
}

function ChatFormalCard({ children, name, avater, status, bodyStyle, headerStyle }: ChatFormalCardProps) {
    return (
        <Suspense fallback={<Loader className='animate-spin w-full flex-1' />}>

            <div className={cn('border-[.5px] border-muted-foreground/20 rounded-lg overflow-hidden flex flex-col', bodyStyle)}>
                {(name || avater) && (
                    <div className={cn("border-b-[.5px] border-muted-foreground/20 p-4 flex items-center gap-4 bg-white", headerStyle)}>
                        <button className="p-2 border border-muted-foreground/10 rounded-full hover:bg-zinc-50 transition-colors">
                           <HugeiconsIcon icon={ArrowLeft02Icon} size={20} />
                        </button>

                        {avater && (
                            <div className="w-12 h-12 bg-[#DDDDDD] border border-muted-foreground/10 rounded-xl overflow-hidden">
                                <img src={avater} alt={name} className="w-full h-full object-cover" />
                            </div>
                        )}

                        <div className="flex flex-col gap-1">
                            <h3 className="text-lg font-bold italic text-[#666666] leading-none">
                                {name}
                            </h3>
                            <div className="flex items-center gap-1.5 px-2 py-0.5 bg-[#22C55E1A] text-[#22C55E] rounded-md w-fit text-[10px] font-bold">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
                                {status || "Active"}
                            </div>
                        </div>
                    </div>
                )}
              <div className="flex-1 flex flex-col overflow-hidden">
                    {children}
                </div>
            </div>
        </Suspense>
    )
}
export default memo(ChatFormalCard)