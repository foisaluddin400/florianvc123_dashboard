import { Inbox } from 'lucide-react'

interface NoDataProps {
    message?: string
}

function NoData({ message = 'No data available' }: NoDataProps) {
    return (
        <div className="flex flex-col items-center justify-center p-8 m-4 rounded-lg border border-[#FBE3CC] bg-[#FEF9F5]">
            <div className="text-[#D4A373] mb-2 opacity-50">
                <Inbox size={48} strokeWidth={1.5} />
            </div>
            <p className="text-[#D4A373] text-sm font-medium opacity-80">{message}</p>
        </div>
    )
}

export default NoData
