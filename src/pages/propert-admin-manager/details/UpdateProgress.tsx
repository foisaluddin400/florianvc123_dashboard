import FormalCard from "../../../components/shared/cards/FormalCard";
import { PageContent, PageLayout } from "../../../components/shared/PageLayout";
import { useEffect, useState } from "react";
import { Button } from "../../../components/ui/button";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import { useGetSinglePropertyQuery, useUpdateConstructionStageMutation } from "../../../redux/property/propertyApis";
import { Loader } from "lucide-react";

const initialProgressData = [
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

const UpdateProgress = () => {
  const location = useLocation();
  console.log("location", location);
  const propertyId = location?.state?.id || localStorage.getItem('selectedPropertyId');

  console.log("propertyId", propertyId);
  const { data: propertyData, isLoading: isFetching } = useGetSinglePropertyQuery(propertyId, { skip: !propertyId });
  const property = propertyData?.data;
  const stageId = property?.stages?.id;

  const [updateConstructionStage, { isLoading: isUpdating }] = useUpdateConstructionStageMutation();
  const [progressData, setProgressData] = useState(initialProgressData);

  useEffect(() => {
    if (property?.stages) {
      const mapStatus = (beStatus?: string) => {
        if (beStatus === 'COMPLETED') return 'Complete';
        if (beStatus === 'ONGOING') return 'Ongoing';
        return 'Upcoming';
      };
      
      setProgressData([
        { step: "Planning", description: "Architecture and approvals", status: mapStatus(property.stages.planning) },
        { step: "Foundation", description: "Piling and base structure", status: mapStatus(property.stages.foundation) },
        { step: "Structure", description: "Main building construction", status: mapStatus(property.stages.structure) },
        { step: "Utilities", description: "Electrical, plumbing, HVAC", status: mapStatus(property.stages.roofing) },
        { step: "Finishing", description: "Tiles, paint, fittings", status: mapStatus(property.stages.finishing) },
        { step: "Handover", description: "Final inspection & delivery", status: mapStatus(property.stages.completed) },
      ]);
    }
  }, [property?.stages]);

  const handleStatusChange = (index: number, newStatus: string) => {
    const newData = [...progressData];
    newData[index] = { ...newData[index], status: newStatus };
    setProgressData(newData);
  };

  const handleSavePost = async () => {
    if (!stageId) {
      toast.error("Construction stage ID not found!");
      return;
    }

    const getStatus = (stepName: string) => {
      const step = progressData.find(p => p.step === stepName);
      if (step?.status === 'Complete') return 'COMPLETED';
      if (step?.status === 'Ongoing') return 'ONGOING';
      return 'UPCOMING';
    };

    const payload = {
      planning: getStatus("Planning"),
      foundation: getStatus("Foundation"),
      structure: getStatus("Structure"),
      roofing: getStatus("Utilities"),
      finishing: getStatus("Finishing"),
      completed: getStatus("Handover")
    };

    try {
     const success =  await updateConstructionStage({ id: stageId, data: payload }).unwrap();
      toast.success(  success?.message || "Construction progress updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update progress.");
    }
  };

  return (
    <PageLayout title={"The Wilds Project / Construction Progress"}>
      <PageContent>
        {isFetching ? (
          <div className="flex justify-center items-center h-64">
            <Loader className="w-8 h-8 animate-spin text-brand" />
          </div>
        ) : (
          <FormalCard
            header={
              <div>
                <div className="font-semibold text-lg italic text-[#666666]">
                  Update Construction Progress
                </div>
                <div className="text-xs text-[#B0B0B0]">
                  Manage and update construction stages for the selected property.
                </div>
              </div>
            }
          >
            <div>
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
                      <select
                        value={item.status}
                        onChange={(e) => handleStatusChange(idx, e.target.value)}
                        className={`text-sm font-semibold ml-4 border border-gray-100 rounded-md px-2 py-1 outline-none cursor-pointer bg-white ${statusColor[item.status as keyof typeof statusColor]}`}
                      >
                        <option value="Complete" className="text-[#22C55E]">Complete</option>
                        <option value="Ongoing" className="text-[#3B82F6]">Ongoing</option>
                        <option value="Upcoming" className="text-[#A855F7]">Upcoming</option>
                      </select>
                    </li>
                  ))}
                </ol>
  
                <div className="pt-6">
                  <Button
                    onClick={handleSavePost}
                    disabled={isUpdating}
                    className="bg-brand hover:opacity-90 text-white px-6 h-auto py-3 text-base font-semibold shadow-lg shadow-brand/20 transition-all active:scale-[0.98] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isUpdating ? "Updating..." : "update and save"}
                  </Button>
                </div>
              </div>
            </div>
          </FormalCard>
        )}
      </PageContent>
    </PageLayout>
  );
};

export default UpdateProgress;