import FormalCard from '../../../../components/shared/cards/FormalCard'
import { PageLayout } from '../../../../components/shared/PageLayout'
import { useParams } from 'react-router-dom';
import { Loader } from 'lucide-react';
import { useGetSingleInterestedClientQuery } from '../../../../redux/interestedClientApi/interestedClientApi';

const InterestedClientProfile = () => {
  const { id } = useParams();

  const { data: responseData, isLoading } = useGetSingleInterestedClientQuery(id as string, {
    skip: !id,
  });

  const lead = responseData?.data;

  if (isLoading) {
    return (
      <PageLayout title="Interested Client Details">
        <div className="flex justify-center items-center py-40">
          <Loader className="animate-spin text-brand" size={40} />
        </div>
      </PageLayout>
    );
  }

  if (!lead) {
    return (
      <PageLayout title="Interested Client Details">
        <div className="p-10 text-center text-gray-500">No interested client record found.</div>
      </PageLayout>
    );
  }

  const formattedDate = lead.createdAt 
    ? new Date(lead.createdAt).toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric"
      })
    : "N/A";

  const projectTitle = lead.project?.title ? `${lead.project.title} / ` : "";

  return (
    <div>
        <PageLayout title={`${projectTitle}Interested Clients Details`}>
           {/* Project Information */}
                  <div className="lg:col-span-3">
                    <FormalCard
                      header="Client Information"
                      headerStyle="font-nunito-semibold-italic"
                    >
                      <div className="w-full p-4">
                        {/* SAME 2 COLUMN LAYOUT */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div>
                            <h3 className="text-[#B0B0B0] text-sm font-nunito-semibold-italic">
                              Full Name
                            </h3>
                            <p className="text-gray-700 font-medium mt-1">
                              {lead.name || "N/A"}
                            </p>
                          </div>
          
                          <div>
                            <h3 className="text-[#B0B0B0] text-sm font-nunito-semibold-italic">
                              Email Address
                            </h3>
                            <p className="text-gray-700 font-medium mt-1">
                              {lead.email || "N/A"}
                            </p>
                          </div>
          
                          <div>
                            <h3 className="text-[#B0B0B0] text-sm font-nunito-semibold-italic">
                              Phone/WhatsApp
                            </h3>
                            <p className="text-gray-700 font-medium mt-1">
                              {lead.phone || "N/A"}
                            </p>
                          </div>
          
                          <div>
                            <h3 className="text-[#B0B0B0] text-sm font-nunito-semibold-italic">
                              Interested On
                            </h3>
                            <p className="text-gray-700 font-medium mt-1">
                              {formattedDate}
                            </p>
                          </div>
                          
                          <div className="sm:col-span-2">
                            <h3 className="text-[#B0B0B0] text-sm font-nunito-semibold-italic">
                              Message
                            </h3>
                            <p className="text-gray-700 font-medium mt-1">
                              {lead.message || "N/A"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </FormalCard>
                  </div>
        </PageLayout>
    </div>
  )
}

export default InterestedClientProfile;