import { Link, useParams } from "react-router-dom";
import FormalCard from "../../../../components/shared/cards/FormalCard";
import ImageGallery from "../../../../components/shared/imageComponents/ImageGallery";
import { PageLayout } from "../../../../components/shared/PageLayout";
import starImage from "../../../../assets/Vector.png";
import chkImage from "../../../../assets/Frame (1).png";
import InterestedClients from "../../../../assets/Image.svg";
import { useGetSingleLifeStyleQuery } from "../../../../redux/contentApi/contentApi";
import { Loader } from "lucide-react";

function LifestyleUpdateDetails() {
  const { id } = useParams();
  const { data: response, isLoading } = useGetSingleLifeStyleQuery(id as string, {
    skip: !id,
  });

  const details = response?.data;

  if (isLoading) {
    return (
      <PageLayout title="Lifestyle Update Details">
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
  
  // Use backend properties or fallback immediately
  const goodToKnowList = details?.goodToKnow?.length ? details.goodToKnow : [];

  return (
    <PageLayout title="Lifestyle Update Details ">
      <div className="space-y-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-12">
          {/* Image Gallery */}
          <div className="lg:col-span-1">
            <ImageGallery images={images} />
          </div>

          {/* Details */}
          <div className="lg:col-span-2">
            <FormalCard header="Lifestyle Update Details">
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
                      <img
                        src={InterestedClients}
                        alt="View Profile"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </FormalCard>
          </div>
          {/* Lifestyle info */}
          <div className="lg:col-span-3">
            <FormalCard
              header="Lifestyle Info."
              headerStyle="font-nunito-semibold-italic"
            >
              <div className="space-y-5 flex flex-col justify-between gap-2 max-w-5xl md:flex-col lg:flex-row">
                <div className="flex flex-col gap-5 md:gap-6 lg:gap-8">
                  <div>
                    <h3 className="text-[#B0B0B0] text-sm font-nunito-semibold-italic">
                      Lifestyle Type
                    </h3>
                    <p className="text-gray-700 font-medium whitespace-pre-wrap">
                      {details?.lifestyleType || details?.type || "N/A"}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-[#B0B0B0] text-sm font-nunito-semibold-italic">
                      Lifestyle Location
                    </h3>
                    <p className="text-gray-700 font-medium">
                      {details?.location || details?.lifestyleLocation || "N/A"}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-5 md:gap-6 lg:gap-8">
                  <div>
                    <h3 className="text-[#B0B0B0] text-sm font-nunito-semibold-italic">
                      Lifestyle Rating
                    </h3>
                    <div className="flex items-center">
                      <img
                        src={starImage}
                        alt="Star Rating"
                        className="w-4 h-4 mr-1"
                      />
                      <p className="text-gray-700 font-medium">
                        {details?.rating || details?.lifestyleRating || "N/A"}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-[#B0B0B0] text-sm font-nunito-semibold-italic">
                      Official Site for Visit
                    </h3>
                    <p className="text-gray-700 font-medium break-all">
                      {details?.officialSite || details?.website || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </FormalCard>
          </div>
        </div>

        {/* Description */}
        <FormalCard
          header="Lifestyle Update Description"
          headerStyle="font-nunito-semibold-italic"
        >
          <div 
            className="text-[#666666] leading-relaxed text-sm sm:text-base prose max-w-none"
            dangerouslySetInnerHTML={{ __html: details?.description || '<p>No description available.</p>' }} 
          />
        </FormalCard>
        
        {/* Good to know */}
        {goodToKnowList.length > 0 && (
          <FormalCard
            header="Lifestyle Update Good to Know"
            headerStyle="font-nunito-semibold-italic"
          >
            <div className="glex flex-col gap-4">
              {Array.isArray(goodToKnowList) && goodToKnowList.map((item: string, index: number) => (
                <div key={index} className="flex items-center gap-1">
                  <img src={chkImage} alt="Checkmark" />
                  <p className="text-[#666666]">{item || "N/A"}</p>
                </div>
              ))}
            </div>
          </FormalCard>
        )}
      </div>
    </PageLayout>
  );
}

export default LifestyleUpdateDetails;
