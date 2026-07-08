import { motion } from 'framer-motion'
import { Loader, TrendingDown, TrendingUp } from 'lucide-react'
import { lazy, memo, Suspense, useMemo, useState, type JSX } from 'react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select'
import { IMAGE } from '../../constant/image.index'
import { cn } from '../../lib/utils'
import { useGetAllAdmiActivitiesQuery } from '../../redux/dashbordStats/adminData/adminStatsApi'
const FormalCard = lazy(() => import('../shared/cards/FormalCard'))

type RangeFilter = 'today' | 'yesterday' | 'this_week' | 'last_week' | 'this_month' | 'last_month' | 'this_year'

type ActivityItem = {
  title: string
  value: number
  icon: JSX.Element
  growth: string
  isPositive: boolean
  growthStatus: string
  color: string
}

function Activities() {

  const [range, setRange] = useState<RangeFilter>('today')

  const { data: activitiesResponse, isLoading } = useGetAllAdmiActivitiesQuery(range)

  const activitiesData = activitiesResponse?.data

  const labelConfig: Record<string, { icon: JSX.Element; color: string }> = {
    "Client Joined": {
      icon: <img className='w-full h-full object-contain' alt='act-icon' src={IMAGE.clientJoined} />,
      color: "#9A7B4F",
    },
    "Legal Update": {
      icon: <img className='w-full h-full object-contain' alt='act-icon' src={IMAGE.legalUpdate} />,
      color: "#4ADE80",
    },
    "Market Update": {
      icon: <img className='w-full h-full object-contain' alt='act-icon' src={IMAGE.marketUpdate} />,
      color: "#3B82F6",
    },
    "Lifestyle": {
      icon: <img className='w-full h-full object-contain' alt='act-icon' src={IMAGE.lifestyle} />,
      color: "#9A7B4F",
    },
    "New Project": {
      icon: <img className='w-full h-full object-contain' alt='act-icon' src={IMAGE.newProject} />,
      color: "#A855F7",
    },
  }

  const rangeLabel: Record<RangeFilter, string> = {
    today: 'Today',
    yesterday: 'Yesterday',
    this_week: 'This Week',
    last_week: 'Last Week',
    this_month: 'This Month',
    last_month: 'Last Month',
    this_year: 'This Year',
  }

  const activitiseData: ActivityItem[] = (activitiesData ?? []).map((item: { label: string; value: number; percentage: number; trend: string }) => {
    const config = labelConfig[item.label] ?? {
      icon: <img className='w-full h-full object-contain' alt='act-icon' src={IMAGE.clientJoined} />,
      color: "#9A7B4F",
    }
    const isPositive = item.trend === "up"
  
    return {
      title: item.label,
      value: item.value,
      icon: config.icon,
      growth: `${item.percentage}%`,
      isPositive,
      growthStatus: isPositive ? `Higher than ${rangeLabel[range]}` : `Lower than ${rangeLabel[range]}`,
      color: config.color,
    }
  })

  

  const renderHeader = useMemo(() => {
    return (
      <div className='flex justify-between items-center'>
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className='font-nunito-semibold-italic text-muted-foreground'>Showing activities for {rangeLabel[range]}</motion.h1>
      </div>
    )
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [range])
  return (
    <Suspense fallback={<Loader className='animate-spin' />}>
      <FormalCard header={
        renderHeader
      }
        action={
          <Select value={range} onValueChange={(val) => setRange(val as RangeFilter)}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Today" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="yesterday">Yesterday</SelectItem>
                <SelectItem value="this_week">This Week</SelectItem>
                <SelectItem value="last_week">Last Week</SelectItem>
                <SelectItem value="this_month">This Month</SelectItem>
                <SelectItem value="last_month">Last Month</SelectItem>
                <SelectItem value="this_year">This Year</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        }
      >
        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <Loader className="animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className='flex flex-col gap-4'>
            {activitiseData.map((item, index) => (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex justify-between items-center gap-2" key={index}>
                <div className="flex items-center gap-2">
                  <div className="w-12 h-12">
                    {item.icon}
                  </div>
                  <div>
                    <h1 style={{ color: item?.color }} className='font-nunito-semibold-italic line-clamp-1 text-sm'>{item.title}</h1>
                    <h1 style={{ color: item?.color }} className={cn('text-brand italic capitalize line-clamp-1 font-nunito-semibold-italic text-lg')}>{item.value}</h1>
                  </div>
                </div>
                <div className="flex items-center text-sm gap-2">
                  {item.isPositive ? <TrendingUp className="text-green-500" /> : <TrendingDown className="text-red-500" />}
                  <h1 className={cn("text-brand ", item.isPositive ? "text-green-500" : "text-red-500")}>{item.growth}</h1>
                  <h1 className="text-[#B0B0B0] text-sm">{item.growthStatus}</h1>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </FormalCard>
    </Suspense>
  )
}

export default memo(Activities)
