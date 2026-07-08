import { Edit02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import cap from "../../../../assets/Frame.png";
import FormalCard from "../../../../components/shared/cards/FormalCard";
import {
  PageContent,
  PageLayout,
} from "../../../../components/shared/PageLayout";
import { ProgressBar } from "../../../../components/shared/ProgressBar";
import { useNavigate, useLocation } from "react-router-dom";
import { useGetSingleConstructionStageQuery } from "../../../../redux/property/propertyApis";
import { useGetProfileQuery } from "../../../../redux/services/profileApis";

const getMappedStatus = (beStatus?: string) => {
  if (beStatus === 'COMPLETED') return 'Complete';
  if (beStatus === 'ONGOING') return 'Ongoing';
  return 'Upcoming';
};

const statusColor = {
  Complete: "text-[#22C55E]",
  Ongoing: "text-[#3B82F6]",
  Upcoming: "text-[#A855F7]",
};

function ConstructionProgress() {
  const navigate = useNavigate();
  const location = useLocation();
  const propertyId = location?.state?.id || localStorage.getItem('selectedPropertyId');
  const { data: constructionStageData } = useGetSingleConstructionStageQuery(propertyId, { skip: !propertyId });
  const constructionStage = constructionStageData?.data;
  console.log(constructionStageData)
   const { data: profile } = useGetProfileQuery()
  const dynamicProgressData = [
    { step: "Planning", description: "Architecture and approvals", status: getMappedStatus(constructionStage?.planning) },
    { step: "Foundation", description: "Piling and base structure", status: getMappedStatus(constructionStage?.foundation) },
    { step: "Structure", description: "Main building construction", status: getMappedStatus(constructionStage?.structure) },
    { step: "Utilities", description: "Electrical, plumbing, HVAC", status: getMappedStatus(constructionStage?.roofing) },
    { step: "Finishing", description: "Tiles, paint, fittings", status: getMappedStatus(constructionStage?.finishing) },
    { step: "Handover", description: "Final inspection & delivery", status: getMappedStatus(constructionStage?.completed) },
  ];

  return (
    <PageLayout title={"The Wilds Project / Construction Progress"}>
      <PageContent>
        <FormalCard
          header={
            <div className="flex justify-between items-center gap-3 w-full">
              <div className="font-semibold text-base text-[#111827]">
                Construction Progress
              </div>
              {profile?.data?.user?.role === "PROPERTY_MANAGER" && (
                <button 
                  onClick={() => navigate("/update-progress", { state: { id: propertyId } })} 
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-[#D4B98E] text-white text-xs font-semibold hover:bg-[#BFA57A] transition-colors"
                 >
                  <HugeiconsIcon icon={Edit02Icon} className="w-4"/> Update Progress
                </button>
              )}
            </div>
          }
          bodyStyle="p-0"
          headerStyle="justify-start"
        >
          <div className="p-4 border border-[#DDDDDD] rounded-lg">
            <div className="flex items-center mb-4">
              <div className="bg-[#D4B7851A] p-2 mr-3 border border-[#DDDDDD80] rounded-md">
                <img src={cap} alt="Project Cap" />
              </div>
              <div>
                <div className="font-semibold text-lg italic text-[#666666]">
                  Construction Progress
                </div>
                <div className="text-xs text-[#B0B0B0]">
                  Estimated Completion on 14 January 2028
                </div>
              </div>
            </div>
            <ProgressBar percent={constructionStage?.computedProgress || 0} />
          </div>
          <div className="mt-6 bg-white rounded-lg ">
            <ol className="divide-y divide-gray-100">
              {dynamicProgressData.map((item, idx) => (
                <li key={item.step} className="flex items-start px-6 py-4">
                  <div className="w-8 shrink-0 text-lg font-semibold text-[#666666]">
                    {idx + 1}.
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-[#666666] italic text-base">
                      {item.step}
                    </div>
                    <div className="text-xs text-[#B0B0B0] italic">
                      {item.description}
                    </div>
                  </div>
                  <div
                    className={`text-xs font-semibold ml-4 ${statusColor[item.status as keyof typeof statusColor]}`}
                  >
                    {item.status}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </FormalCard>
      </PageContent>
    </PageLayout>
  );
}

export default ConstructionProgress;
