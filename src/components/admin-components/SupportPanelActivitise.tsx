import { CustomerSupportIcon, MessageMultiple02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { motion } from 'framer-motion'
import { Loader, TrendingDown, TrendingUp } from 'lucide-react'
import { lazy, memo, Suspense, useMemo } from 'react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select'
import { cn } from '../../lib/utils'
const FormalCard = lazy(() => import('../shared/cards/FormalCard'))
function SupportPanelActivitise() {
  const renderHeader = useMemo(() => {
    return (
      <div className='flex justify-between items-center'>
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className='font-nunito-semibold-italic text-muted-foreground'>Showing activities for Today</motion.h1>
      </div>
    )
  }, [])
  const activitiseData = [
    {
      title: "New Support Messages Today",
      value: "03",
      icon: <HugeiconsIcon icon={MessageMultiple02Icon} />,
      growth: "5%",
      isPositive: false,
      growthStatus: "Lower than yesterday",
      color: "#9A7B4F"
    },
    {
      title: "Conversations Resolved Today",
      value: "03",
      icon: <HugeiconsIcon icon={CustomerSupportIcon} />,
      growth: "10%",
      isPositive: true,
      growthStatus: "Higher than yesterday",
      color: "#9A7B4F"
    }
  ]
  return (
    <Suspense fallback={<Loader className='animate-spin' />}>
      <FormalCard header={
        renderHeader
      }
        action={
          <Select>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Today" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="last_24_hours">Last 24 Hours</SelectItem>
                <SelectItem value="last_week">Last Week</SelectItem>
                <SelectItem value="last_fortnight">Last Fortnight</SelectItem>
                <SelectItem value="last_month">Last Month</SelectItem>
                <SelectItem value="last_year">Last Year</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        }
      >
        <div className='flex flex-col gap-4'>
          {
            activitiseData.map((item, index) => (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex justify-between items-center gap-2" key={index}>
                <div className="flex items-center gap-2">
                  <div className="w-12 h-12 text-brand border border-brand/40 bg-brand/10 flex items-center justify-center rounded-md">
                    {item.icon}
                  </div>
                  <div>
                    <h1 style={{ color: item?.color }} className='font-nunito-semibold-italic line-clamp-1 text-base'>{item.title}</h1>
                    <h1 style={{ color: item?.color }} className={cn('text-brand italic capitalize line-clamp-1 font-nunito-semibold-italic text-lg')}>{item.value}</h1>
                  </div>
                </div>
                <div className="flex items-center text-sm gap-2">
                  {item.isPositive ? <TrendingUp className="text-green-500" /> : <TrendingDown className="text-red-500" />}
                  <h1 className={cn("text-brand ", item.isPositive ? "text-green-500" : "text-red-500")}>{item.growth}</h1>
                  <h1 className="text-[#B0B0B0] text-sm">{item.growthStatus}</h1>
                </div>
              </motion.div>
            ))
          }
        </div>
      </FormalCard>
    </Suspense>
  )
}

export default memo(SupportPanelActivitise)