import starImage from "../../../assets/Vector.png";
import chkImage from "../../../assets/Frame (1).png";
import InterestedClients from "../../../assets/Image.svg";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PageContent, PageLayout } from "../../../components/shared/PageLayout";
import ImageGallery from "../../../components/shared/imageComponents/ImageGallery";
import FormalCard from "../../../components/shared/cards/FormalCard";
import { Button } from "../../../components/ui/button";
import { LockPasswordIcon, UserEdit01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import TakeConfirm from "../../../components/ui/take-confirm";
import { useDeleteLifeStyleMutation, useGetSingleLifeStyleQuery } from "../../../redux/contentApi/contentApi";
import { Loader } from "lucide-react";
import toast from "react-hot-toast"; // টোস্ট ইমপোর্ট

function ManageLifestyleDetails() {
  const navigate = useNavigate();
  const params = useParams();

  // সিঙ্গেল ডাটা কুয়েরি
  const { data: singleLifeStyle, isLoading: singleLifeStyleLoading } = useGetSingleLifeStyleQuery(params.id as string);
  
  // ডিলিট মিউটেশন হুক
  const [deleteLifeStyle, { isLoading: isDeleting }] = useDeleteLifeStyleMutation();

  const data = singleLifeStyle?.data;

  // ডিলিট হ্যান্ডলার ফাংশন
  const handleDelete = async () => {
    try {
      const res = await deleteLifeStyle(params.id as string).unwrap();
      if (res.success) {
        toast.success("Lifestyle post deleted successfully!");
        // ডিলিট হওয়ার পর লিস্ট পেজে রিডাইরেক্ট
        navigate("/content-manager/manage-lifestyles", { replace: true });
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Something went wrong while deleting.");
    }
  };

  if (singleLifeStyleLoading) {
    return (
      <PageLayout title="Lifestyle Update Details">
        <div className="flex justify-center items-center py-40">
          <Loader className="animate-spin text-brand" size={40} />
        </div>
      </PageLayout>
    );
  }

  if (!data) {
    return (
      <PageLayout title="Details Not Found">
        <div className="p-10 text-center">No data available.</div>
      </PageLayout>
    );
  }

  const formatType = (type: string) => {
    return type
      ?.split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ")
      .replace("And", "&");
  };

  return (
    <PageLayout title="Lifestyle Update Details">
      <PageContent>
        <div className="space-y-8">
          {/* Top Section (Gallery & Basic Info) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-12">
            <div className="lg:col-span-1">
              <ImageGallery
                images={data.images && data.images.length > 0 ? data.images : ["https://via.placeholder.com/800x600?text=No+Image+Available"]}
              />
            </div>

            <div className="lg:col-span-2">
              <FormalCard header="Lifestyle Update Details">
                <div className="space-y-5">
                  <div>
                    <h3 className="text-[#B0B0B0] text-sm font-nunito-semibold-italic">Post Title</h3>
                    <p className="text-gray-700 font-medium text-lg">{data.title}</p>
                  </div>
                  <div>
                    <h3 className="text-[#B0B0B0] text-sm font-nunito-semibold-italic">Posted On</h3>
                    <p className="text-gray-700 font-medium">
                      {new Date(data.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-[#B0B0B0] text-sm font-nunito-semibold-italic">Posted By</h3>
                      <p className="text-gray-700 font-medium">{data.contentManager?.name || "N/A"}</p>
                    </div>
                    <div>
                      <Link
                        to={`/admin/content-manage/client-profile/${data.contentManagerId}`}
                        state={{ managerData: data.contentManager, userAuthData: data.user }}
                        className="text-blue-500 hover:underline"
                      >
                        <img src={InterestedClients} alt="Poster Profile" />
                      </Link>
                    </div>
                  </div>
                </div>
              </FormalCard>
            </div>

            {/* Lifestyle Info Card */}
            <div className="lg:col-span-3">
              <FormalCard header="Lifestyle Info." headerStyle="font-nunito-semibold-italic">
                <div className="space-y-5 flex flex-col justify-between gap-2 max-w-5xl md:flex-col lg:flex-row">
                  <div className="flex flex-col gap-5 md:gap-6 lg:gap-8">
                    <div>
                      <h3 className="text-[#B0B0B0] text-sm font-nunito-semibold-italic">Lifestyle Type</h3>
                      <p className="text-amber-600 font-bold">{formatType(data.type)}</p>
                    </div>
                    <div>
                      <h3 className="text-[#B0B0B0] text-sm font-nunito-semibold-italic">Lifestyle Location</h3>
                      <p className="text-gray-700 font-medium">{data.location}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-5 md:gap-6 lg:gap-8">
                    <div>
                      <h3 className="text-[#B0B0B0] text-sm font-nunito-semibold-italic">Lifestyle Rating</h3>
                      <div className="flex items-center">
                        <img src={starImage} alt="Star Rating" className="w-4 h-4 mr-1" />
                        <p className="text-gray-700 font-bold">{data.rating ? Number(data.rating).toFixed(1) : "0.0"}</p>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-[#B0B0B0] text-sm font-nunito-semibold-italic">Official Site</h3>
                      <a href={data.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium break-all">
                        {data.website}
                      </a>
                    </div>
                  </div>
                </div>
              </FormalCard>
            </div>
          </div>

          {/* Description */}
          <FormalCard header="Lifestyle Update Description" headerStyle="font-nunito-semibold-italic">
            <div className="text-[#666666] leading-relaxed text-sm sm:text-base prose max-w-none" dangerouslySetInnerHTML={{ __html: data.description }} />
          </FormalCard>

          {/* Good to Know */}
          <FormalCard header="Lifestyle Update Good to Know" headerStyle="font-nunito-semibold-italic">
            <div className="flex flex-col gap-4">
              {data.goodToKnow && data.goodToKnow.length > 0 ? (
                data.goodToKnow.map((item: string, index: number) => (
                  <div key={index} className="flex items-center gap-2">
                    <img src={chkImage} alt="Checkmark" className="w-5 h-5" />
                    <p className="text-[#666666]">{item}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 italic">No information provided.</p>
              )}
            </div>
          </FormalCard>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              onClick={() => navigate(`/content-manager/manage-lifestyles/lifestyle/update/${params.id}`)}
              className="bg-linear-to-bl to-brand from-[#B08D59] py-6 px-8"
            >
              <HugeiconsIcon icon={UserEdit01Icon} className="mr-2" />
              Update this post
            </Button>

            {/* Delete Functionality with TakeConfirm */}
            <TakeConfirm
              title="Are you sure you want to delete this post?"
              description="This action will permanently remove this lifestyle update. This cannot be undone."
              onConfirm={handleDelete} // এখানে ডিলিট লজিক কল করা হয়েছে
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
                {isDeleting ? "Deleting..." : "Delete this Post"}
              </Button>
            </TakeConfirm>
          </div>
        </div>
      </PageContent>
    </PageLayout>
  );
}

export default ManageLifestyleDetails;