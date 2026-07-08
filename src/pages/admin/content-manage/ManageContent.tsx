import {
  Airplane01Icon,
  Building03Icon,
  ChartUpIcon,
  CourtLawIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { useState } from "react"
import { cn } from "../../../lib/utils"
import { useGetAllLifeStyleQuery } from "../../../redux/contentApi/contentApi"
import { useGetAllLegalQuery } from "../../../redux/contentApi/legalApi/legapApi"
import { useGetAllManageMarketQuery } from "../../../redux/manageMarketApi/manageMarketApi"
import { useGetAllManageProjectQuery } from "../../../redux/manageProjectapi/manageProjectApi"
import LegalUpdates from './legal-updates/LegalUpdates'
import Lifestyle from './lifestyle/Lifestyle'
import MarketUpdates from './market-updates/MarketUpdates'
import NewProjects from './newProjects/NewProjects'

const tabs = [
  {
    id: 0,
    label: "Market Updates",
    value: 211,
    icon: ChartUpIcon,
    activeClasses: "border-blue-500 bg-blue-50 text-blue-600",
  },
  {
    id: 1,
    label: "Legal Updates",
    value: 211,
    icon: CourtLawIcon,
    activeClasses: "border-green-500 bg-green-50 text-green-600",
  },
  {
    id: 2,
    label: "Lifestyle",
    value: 211,
    icon: Airplane01Icon,
    activeClasses: "border-amber-500 bg-amber-50 text-amber-600",
  },
  {
    id: 3,
    label: "New Projects",
    value: 211,
    icon: Building03Icon,
    activeClasses: "border-purple-500 bg-purple-50 text-purple-600",
  },
]

function ManageContent() {
  const [selectedTab, setSelectedTab] = useState(0)

  const { data: marketData } = useGetAllManageMarketQuery(undefined)
  const { data: legalData } = useGetAllLegalQuery(undefined)
  const { data: lifestyleData } = useGetAllLifeStyleQuery(undefined)
  const { data: projectData } = useGetAllManageProjectQuery(undefined)

  const getTabValue = (id: number) => {
    switch (id) {
      case 0: return marketData?.data?.length || 0;
      case 1: return legalData?.data?.length || 0;
      case 2: return lifestyleData?.data?.length || 0;
      case 3: return projectData?.data?.length || 0;
      default: return 0;
    }
  }

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {tabs.map((tab) => {
          const isActive = selectedTab === tab.id
          const tabValue = getTabValue(tab.id)

          return (
            <div
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={cn(
                "flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all duration-200",
                isActive
                  ? tab.activeClasses
                  : "border-gray-200 bg-white hover:bg-gray-50"
              )}
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "p-2 rounded-md border",
                    isActive
                      ? "border-current"
                      : "border-gray-200"
                  )}
                >
                  <HugeiconsIcon
                    icon={tab.icon}
                    size={18}
                  />
                </div>

                <span className="font-medium">
                  {tab.label}
                </span>
              </div>

              <span
                className={cn(
                  "text-xs font-semibold px-2 py-1 rounded-md",
                  isActive
                    ? "bg-white/40"
                    : "bg-gray-100"
                )}
              >
                {tabValue}
              </span>
            </div>
          )
        })}
      </div>

      {/* Content */}
      <>
        {selectedTab === 0 && <MarketUpdates />}
        {selectedTab === 1 && <LegalUpdates />}
        {selectedTab === 2 && <Lifestyle />}
        {selectedTab === 3 && <NewProjects />}
      </>
    </div>
  )
}

export default ManageContent