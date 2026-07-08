import { Link, useNavigate, useParams } from "react-router-dom";
import { LockPasswordIcon, UserEdit01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import InterestedClients from "../../../assets/Image.svg";
import chkImage from "../../../assets/Frame (1).png"; 
import { PageContent, PageLayout } from "../../../components/shared/PageLayout";
import ImageGallery from "../../../components/shared/imageComponents/ImageGallery";
import FormalCard from "../../../components/shared/cards/FormalCard";
import { Button } from "../../../components/ui/button";
import TakeConfirm from "../../../components/ui/take-confirm";
import { useDeleteLegalMutation, useGetSingleLegalQuery } from "../../../redux/contentApi/legalApi/legapApi";
import { Loader } from "lucide-react";
import toast from "react-hot-toast";

function ManageLegalDetails() {
  const params = useParams();
  const navigate = useNavigate();


  const { data: legalResponse, isLoading } = useGetSingleLegalQuery(params.id as string);
  const legalData = legalResponse?.data;

  console.log("legalData",legalData);


  const [deleteLegal, { isLoading: isDeleting }] = useDeleteLegalMutation();


  const handleDelete = async () => {
    try {
      const res = await deleteLegal(params.id as string).unwrap();
      if (res.success) {
        toast.success("Legal update deleted successfully!");
        navigate("/content-manager/manage-legal", { replace: true });
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to delete the post.");
    }
  };

  if (isLoading) {
    return (
      <PageLayout title="Manage Legal Details">
        <div className="flex justify-center items-center py-40">
          <Loader className="animate-spin text-brand" size={40} />
        </div>
      </PageLayout>
    );
  }

  if (!legalData) {
    return (
      <PageLayout title="Details Not Found">
        <div className="p-10 text-center">No data available.</div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title="Manage Legal Details">
      <PageContent>
        <div className="space-y-8">
          {/* Top Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-12">
            {/* Image Gallery */}
            <div className="lg:col-span-1">
              <ImageGallery
                images={legalData.images && legalData.images.length > 0 
                  ? legalData.images 
                  : ["https://via.placeholder.com/800x600?text=No+Image+Available"]}
              />
            </div>

            {/* Basic Info Details */}
            <div className="lg:col-span-2">
              <FormalCard header="Legal Update Details">
                <div className="space-y-5">
                  <div>
                    <h3 className="text-[#B0B0B0] text-sm font-nunito-semibold-italic">
                      Post Title
                    </h3>
                    <p className="text-gray-700 font-medium text-lg">
                      {legalData.title}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-[#B0B0B0] text-sm font-nunito-semibold-italic">
                      Posted On
                    </h3>
                    <p className="text-gray-700 font-medium">
                      {new Date(legalData.createdAt).toLocaleDateString("en-GB", {
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
                        {legalData.contentManager?.name || "N/A"}
                      </p>
                    </div>

                    <div>
                      <Link
                        to={`/admin/content-manage/client-profile/${legalData.contentManagerId}`}
                        state={{ managerData: legalData.contentManager }}
                        className="text-blue-500 hover:underline"
                      >
                        <img src={InterestedClients} alt="Poster Profile" />
                      </Link>
                    </div>
                  </div>
                </div>
              </FormalCard>
            </div>
          </div>

          {/* Description - HTML Content Handling */}
          <FormalCard
            header="Legal Update Description"
            headerStyle="font-nunito-semibold-italic"
          >
            <div 
              className="text-[#666666] leading-relaxed prose max-w-none"
              dangerouslySetInnerHTML={{ __html: legalData.description }}
            />
          </FormalCard>

          {/* Good to Know Section */}
          {legalData.goodToKnow && legalData.goodToKnow.length > 0 && (
            <FormalCard
              header="Legal Update Good to Know"
              headerStyle="font-nunito-semibold-italic"
            >
              <div className="flex flex-col gap-4">
                {legalData.goodToKnow.map((item: string, index: number) => (
                  <div key={index} className="flex items-center gap-2">
                    <img src={chkImage} alt="Checkmark" className="w-5 h-5" />
                    <p className="text-[#666666]">{item}</p>
                  </div>
                ))}
              </div>
            </FormalCard>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              onClick={() => {
                navigate(`/content-manager/manage-legal/update-legal/update/${params.id}`);
              }}
              className="bg-linear-to-bl to-brand from-[#B08D59] py-6 px-8"
            >
              <HugeiconsIcon icon={UserEdit01Icon} className="mr-2" />
              Update this post
            </Button>

            <TakeConfirm
              title="Are you sure you want to delete this post?"
              description="This action will permanently remove this legal update from the system."
              onConfirm={handleDelete}
              confirmText="Delete"
              cancelText="Cancel"
            >
              <Button 
                disabled={isDeleting}
                className="bg-linear-to-bl to-red-900 from-red-500 py-6 px-8 min-w-[180px]"
              >
                {isDeleting ? (
                  <Loader className="animate-spin mr-2" size={18} />
                ) : (
                  <HugeiconsIcon icon={LockPasswordIcon} className="mr-2" />
                )}
                Delete this Post
              </Button>
            </TakeConfirm>
          </div>
        </div>
      </PageContent>
    </PageLayout>
  );
}

export default ManageLegalDetails;