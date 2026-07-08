import { Link, useParams } from "react-router-dom";
import FormalCard from "../../../../components/shared/cards/FormalCard";
import ImageGallery from "../../../../components/shared/imageComponents/ImageGallery";
import { PageLayout } from "../../../../components/shared/PageLayout";
import InterestedClients from "../../../../assets/Image.svg";
import { useGetSingleLegalQuery } from "../../../../redux/contentApi/legalApi/legapApi";
import { Loader } from "lucide-react";

function LegalUpdateDetails() {
  const { id } = useParams();
  const { data: response, isLoading } = useGetSingleLegalQuery(id as string, {
    skip: !id,
  });

  const details = response?.data;

  if (isLoading) {
    return (
      <PageLayout title="Legal Update Details">
        <div className="flex justify-center items-center flex-col gap-3 py-40">
          <Loader className="animate-spin text-brand" size={40} />
          <p className="text-gray-500 font-medium">Loading details...</p>
        </div>
      </PageLayout>
    );
  }

  const images = details?.images?.length ? details.images : [];

  const formattedDate = details?.createdAt ? new Date(details.createdAt).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }) : "N/A";

  const managerId = details?.contentManagerId

  return (
    <PageLayout title="Legal Update Details">
      <div className="space-y-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-12">
          {/* Image Gallery */}
          <div className="lg:col-span-1">
            <ImageGallery images={images} />
          </div>

          {/* Details */}
          <div className="lg:col-span-2">
            <FormalCard header="Legal Update Details">
              <div className="space-y-5">
                <div>
                  <h3 className="text-[#B0B0B0] text-sm font-nunito-semibold-italic">
                    Post Title
                  </h3>
                  <p className="text-gray-700 font-medium whitespace-pre-wrap">
                    {details?.title || "N/A"}
                  </p>
                </div>

                <div>
                  <h3 className="text-[#B0B0B0] text-sm font-nunito-semibold-italic">
                    Posted On
                  </h3>
                  <p className="text-gray-700 font-medium">
                    {formattedDate}
                  </p>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-[#B0B0B0] text-sm font-nunito-semibold-italic">
                      Posted By
                    </h3>
                    <p className="text-gray-700 font-medium flex items-center gap-2">
                      <img 
                        src={details?.contentManager?.profile_image || "https://via.placeholder.com/40"} 
                        alt="Manager Profile" 
                        className="w-8 h-8 rounded-full object-cover" 
                      />
                      {details?.contentManager?.name || "N/A"}
                    </p>
                  </div>

                  <div>
                     <Link 
                       to={`/admin/content-manage/client-profile/${managerId}`} 
                       state={{ managerData: details?.contentManager }}
                       className="text-blue-500 hover:underline"
                     >
                       <img src={InterestedClients} alt="View Profile" />
                     </Link>
                  </div>
                </div>
              </div>
            </FormalCard>
          </div>
        </div>

        {/* Description */}
        <FormalCard
          header="Legal Update Description"
          headerStyle="font-nunito-semibold-italic"
        >
          <div 
            className="text-[#666666] leading-relaxed text-sm sm:text-base prose max-w-none"
            dangerouslySetInnerHTML={{ __html: details?.description || '<p>No description available.</p>' }} 
          />
        </FormalCard>
      </div>
    </PageLayout>
  );
}

export default LegalUpdateDetails;
