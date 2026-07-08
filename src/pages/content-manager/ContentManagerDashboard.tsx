import { Analytics02Icon, City01Icon, Invoice01Icon, UserIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useMemo, useState, type JSX } from 'react'
import { Loader, TrendingDown, TrendingUp } from 'lucide-react'
import FormalCard from '../../components/shared/cards/FormalCard'
import StatusCard from '../../components/shared/cards/StatusCard'
import { PageLayout } from '../../components/shared/PageLayout'
import Space from '../../components/shared/Space'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select'
import { cn } from '../../lib/utils'
import { useGetAllContentStatsQuery, useGetAllContentActivitiesQuery } from '../../redux/dashbordStats/contentManagerData/contentStatsApi'

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


function ContentManagerDashboard() {
  const [range, setRange] = useState<RangeFilter>('today')

  const { data: contentStats } = useGetAllContentStatsQuery();
  const { data: activitiesResponse, isLoading } = useGetAllContentActivitiesQuery(range)
  
  const contentActivities = activitiesResponse?.data


  const marketUpdate = contentStats?.data?.totalMarketUpdate
  const legalUpdates = contentStats?.data?.totalLegalUpdate
  const lifeStyle = contentStats?.data?.totalLifeStyle
  const newProjects = contentStats?.data?.totalProject

  const statusData = [
    {
      title: "Market Updates",
      value: marketUpdate,
      icon: <HugeiconsIcon icon={UserIcon} />
    },
    {
      title: "Legal Updates",
      value: legalUpdates,
      icon: <HugeiconsIcon icon={City01Icon} />
    },
    {
      title: "Lifestyle",
      value: lifeStyle,
      icon: <HugeiconsIcon icon={UserIcon} />
    },
    {
      title: "New Projects",
      value: newProjects,
      icon: <HugeiconsIcon icon={Invoice01Icon} />
    }
  ]

  const activityConfig: Record<string, { icon: JSX.Element; color: string }> = {
    "Market Update": {
      icon: <HugeiconsIcon size={24} icon={City01Icon} />,
      color: "#3B82F6"
    },
    "Legal Update": {
      icon: <HugeiconsIcon size={24} icon={City01Icon} />,
      color: "#4ADE80"
    },
    "Lifestyle": {
      icon: <HugeiconsIcon size={24} icon={UserIcon} />,
      color: "#9A7B4F"
    },
    "New Project": {
      icon: <HugeiconsIcon size={24} icon={Invoice01Icon} />,
      color: "#A855F7"
    }
  }

  const activitiesData: ActivityItem[] = (contentActivities ?? []).map((item: any) => {
    const isPositive = item.trend === "up"
    const config = activityConfig[item.label] || {
      icon: <HugeiconsIcon size={24} icon={Analytics02Icon} />,
      color: "#9A7B4F"
    }

    return {
      title: item.label,
      value: item.value,
      icon: config.icon,
      growth: `${item.percentage}%`,
      isPositive,
      growthStatus: isPositive ? "Higher than yesterday" : "Lower than yesterday",
      color: config.color
    }
  })

  const rangeLabels: Record<RangeFilter, string> = {
    today: 'Today',
    yesterday: 'Yesterday',
    this_week: 'This Week',
    last_week: 'Last Week',
    this_month: 'This Month',
    last_month: 'Last Month',
    this_year: 'This Year',
  }

  const renderHeader = useMemo(() => {
    return (
      <div className='flex justify-between items-center w-full' >
        <h1 className='text-xl italic text-[#666666]'>Showing activities for {rangeLabels[range]}</h1>
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
      </div>
    )
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [range])


  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center py-8">
          <Loader className="animate-spin text-muted-foreground" />
        </div>
      )
    }

    return (
      <div className='flex flex-col gap-4'>
        {
          activitiesData.map((item, index) => (
            <div className="flex justify-between items-center gap-2" key={index}>

              <div className="flex items-center gap-2">
                <div className='flex items-center bg-brand/20 w-12 h-12 p-2 rounded  justify-center text-brand border-[.5px] border-brand/20'>
                  {item.icon}
                </div>
                <div>
                  <h1 className='text-[#B0B0B0] italic capitalize line-clamp-1 text-lg'>{item.title}</h1>
                  <h1 className='text-brand italic capitalize line-clamp-1 text-lg'>{item.value}</h1>
                </div>
              </div>
              <div className="flex items-center text-sm gap-2">
                {item.isPositive ? <TrendingUp className="text-green-500" /> : <TrendingDown className="text-red-500" />}
                <h1 className={cn("text-brand ", item.isPositive ? "text-green-500" : "text-red-500")}>{item.growth}</h1>
                <h1 className="text-[#B0B0B0] text-sm">{item.growthStatus}</h1>
              </div>
            </div>
          ))
        }
      </div>
    )
  }
  return (
    <PageLayout title="Dashboard" icon={<HugeiconsIcon icon={Analytics02Icon} />}>
      <div className='responsive-grid-4'>
        {statusData.map((item, index) => (
          <StatusCard key={index} title={item.title} value={item.value} icon={item.icon} />
        ))}
      </div>
      <Space size={4} />
      <FormalCard header={
        renderHeader
      }>
        {renderContent()}
      </FormalCard>
    </PageLayout>
  )
}
export default ContentManagerDashboard
