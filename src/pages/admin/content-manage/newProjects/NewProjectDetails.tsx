import { Link, useParams } from "react-router-dom";
import FormalCard from "../../../../components/shared/cards/FormalCard";
import ImageGallery from "../../../../components/shared/imageComponents/ImageGallery";
import { PageContent, PageLayout } from "../../../../components/shared/PageLayout";
import InterestedClientss from "../../../../assets/Image.svg";
import { useGetSingleManageProjectQuery } from "../../../../redux/manageProjectapi/manageProjectApi";
import { Loader } from "lucide-react";
import InterestedClients from "./InterestedClients";


function NewProjectDetails() {
  const { id } = useParams();
  

  const { data: projectResponse, isLoading } = useGetSingleManageProjectQuery(id as string);

  const project = projectResponse?.data;

  console.log(project)


  if (isLoading) {
    return (
      <PageLayout title="Project Details">
        <div className="flex justify-center items-center py-40">
          <Loader className="animate-spin text-brand" size={40} />
        </div>
      </PageLayout>
    );
  }

  if (!project) {
    return (
      <PageLayout title="Details Not Found">
        <div className="p-10 text-center">No project details available.</div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title="New Projects">
      <PageContent>
        <div className="space-y-8">
          {/* Top Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-12">
            <div className="lg:col-span-1">
              <ImageGallery
                images={project.images && project.images.length > 0 
                  ? project.images 
                  : ["https://via.placeholder.com/800x600?text=No+Image+Available"]}
              />
            </div>

            {/* Basic Details */}
            <div className="lg:col-span-2">
              <FormalCard header="New Project Details">
                <div className="space-y-5">
                  <div>
                    <h3 className="text-[#B0B0B0] text-sm font-nunito-semibold-italic">
                      Post Title
                    </h3>
                    <p className="text-gray-700 font-medium text-lg">
                      {project.title}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-[#B0B0B0] text-sm font-nunito-semibold-italic">
                      Posted On
                    </h3>
                    <p className="text-gray-700 font-medium">
                      {new Date(project.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-[#B0B0B0] text-sm font-nunito-semibold-italic">
                        Posted By
                      </h3>
                      <p className="text-gray-700 font-medium">
                        {project.contentManager?.name || "N/A"}
                      </p>
                    </div>

                    <div>
                      <Link
                        to={`/admin/content-manage/client-profile/${project.contentManagerId}`}
                        state={{ managerData: project.contentManager }}
                        className="text-blue-500 hover:underline"
                      >
                        <img
                          src={InterestedClientss}
                          alt="Poster Profile"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              </FormalCard>
            </div>
          </div>

     
          <FormalCard
            header="About Project"
            headerStyle="font-nunito-semibold-italic"
          >
            <div 
               className="text-[#666666] leading-relaxed prose max-w-none mb-6"
               dangerouslySetInnerHTML={{ __html: project.description }}
            />
            
            <div className="w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <h3 className="text-[#B0B0B0] text-sm font-nunito-semibold-italic">
                    Property Size
                  </h3>
                  <p className="text-gray-700 font-medium mt-1">
                    {project.propertySize || "N/A"}
                  </p>
                </div>

                <div>
                  <h3 className="text-[#B0B0B0] text-sm font-nunito-semibold-italic">
                    Rooms
                  </h3>
                  <p className="text-gray-700 font-medium mt-1">
                    {project.totalRooms ? `${project.totalRooms} Rooms` : "N/A"}
                  </p>
                </div>

                <div>
                  <h3 className="text-[#B0B0B0] text-sm font-nunito-semibold-italic">
                    Type of Use
                  </h3>
                  <p className="text-gray-700 font-medium mt-1">
                    {project.typeOfUse || "N/A"}
                  </p>
                </div>

                <div>
                  <h3 className="text-[#B0B0B0] text-sm font-nunito-semibold-italic">
                    Property Type
                  </h3>
                  <p className="text-gray-700 font-medium mt-1">
                    {project.propertyType || "N/A"}
                  </p>
                </div>

                <div>
                  <h3 className="text-[#B0B0B0] text-sm font-nunito-semibold-italic">
                    Project Location
                  </h3>
                  <p className="text-gray-700 font-medium mt-1">
                    {project.location || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </FormalCard>

          {/* Project Information */}
          <div className="lg:col-span-3">
            <FormalCard
              header="Project Information"
              headerStyle="font-nunito-semibold-italic"
            >
              <div className="w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-[#B0B0B0] text-sm font-nunito-semibold-italic">
                      Starting Price
                    </h3>
                    <p className="text-gray-700 font-medium mt-1">
                      {project.startingPrice || "N/A"}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-[#B0B0B0] text-sm font-nunito-semibold-italic">
                      Payment Plan
                    </h3>
                    <p className="text-gray-700 font-medium mt-1">
                      {project.paymentPlan || "N/A"}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-[#B0B0B0] text-sm font-nunito-semibold-italic">
                      Investment Option
                    </h3>
                    <p className="text-gray-700 font-medium mt-1">
                      {project.investmentOption || "N/A"}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-[#B0B0B0] text-sm font-nunito-semibold-italic">
                      Handover Year
                    </h3>
                    <p className="text-gray-700 font-medium mt-1">
                      {project.handoverYear || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </FormalCard>
          </div>

          {/* Interested Clients Section */}
          <div>
            <InterestedClients project={project.interestedClients} />
          </div>
        </div>
      </PageContent>
    </PageLayout>
  );
}

export default NewProjectDetails;