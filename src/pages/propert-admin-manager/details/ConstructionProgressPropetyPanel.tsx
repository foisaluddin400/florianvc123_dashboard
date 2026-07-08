import cap from "../../../assets/Frame.png";
import FormalCard from "../../../components/shared/cards/FormalCard";
import {
  PageContent,
  PageLayout,
} from "../../../components/shared/PageLayout";
import { ProgressBar } from "../../../components/shared/ProgressBar";

const progressData = [
  {
    step: "Planning",
    description: "Architecture and approvals",
    status: "Complete",
  },
  {
    step: "Foundation",
    description: "Piling and base structure",
    status: "Complete",
  },
  {
    step: "Structure",
    description: "Main building construction",
    status: "Ongoing",
  },
  {
    step: "Utilities",
    description: "Electrical, plumbing, HVAC",
    status: "Upcoming",
  },
  {
    step: "Finishing",
    description: "Tiles, paint, fittings",
    status: "Upcoming",
  },
  {
    step: "Handover",
    description: "Final inspection & delivery",
    status: "Upcoming",
  },
];

const statusColor = {
  Complete: "text-[#22C55E]",
  Ongoing: "text-[#3B82F6]",
  Upcoming: "text-[#A855F7]",
};

function ConstructionProgressPropetyPanel() {
  return (
    <PageLayout title={"The Wilds Project / Construction Progress"}>
      <PageContent>
        <FormalCard header="Construction Progress" bodyStyle="p-0">
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
            <ProgressBar percent={60} />
          </div>
          <div className="mt-6 bg-white rounded-lg ">
            <ol className="divide-y divide-gray-100">
              {progressData.map((item, idx) => (
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

export default ConstructionProgressPropetyPanel;
