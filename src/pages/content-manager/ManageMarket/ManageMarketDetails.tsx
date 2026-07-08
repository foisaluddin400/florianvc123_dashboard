import { Link, useNavigate, useParams } from "react-router-dom";
import { LockPasswordIcon, UserEdit01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import InterestedClients from "../../../assets/Image.svg";
import { PageContent, PageLayout } from "../../../components/shared/PageLayout";
import ImageGallery from "../../../components/shared/imageComponents/ImageGallery";
import FormalCard from "../../../components/shared/cards/FormalCard";
import { Button } from "../../../components/ui/button";
import TakeConfirm from "../../../components/ui/take-confirm";
import { useDeleteManageMarketMutation, useGetSingleManageMarketQuery } from "../../../redux/manageMarketApi/manageMarketApi";
import { Loader } from "lucide-react";
import toast from "react-hot-toast";

function ManageMarketDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: marketResponse, isLoading } = useGetSingleManageMarketQuery(id as string);
  const market = marketResponse?.data;


  const [deleteMarket, { isLoading: isDeleting }] = useDeleteManageMarketMutation();


  const handleDelete = async () => {
    try {
      const res = await deleteMarket(id as string).unwrap();
      if (res.success) {
        toast.success("Market update deleted successfully!");
        navigate("/content-manager/manage-markets", { replace: true });
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to delete the post.");
    }
  };


  if (isLoading) {
    return (
      <PageLayout title="Manage Market Details">
        <div className="flex justify-center items-center py-40">
          <Loader className="animate-spin text-brand" size={40} />
        </div>
      </PageLayout>
    );
  }

  if (!market) {
    return (
      <PageLayout title="Details Not Found">
        <div className="p-10 text-center">No data available.</div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title="Manage Market Details">
      <PageContent>
        <div className="space-y-8">

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-12">

            <div className="lg:col-span-1">
              <ImageGallery
                images={market.images && market.images.length > 0
                  ? market.images
                  : ["https://via.placeholder.com/800x600?text=No+Image+Available"]}
              />
            </div>

            {/* Market Info Details */}
            <div className="lg:col-span-2">
              <FormalCard header="Market Update Details">
                <div className="space-y-5">
                  <div>
                    <h3 className="text-[#B0B0B0] text-sm font-nunito-semibold-italic">
                      Post Title
                    </h3>
                    <p className="text-gray-700 font-medium text-lg">
                      {market.title}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-[#B0B0B0] text-sm font-nunito-semibold-italic">
                      Posted On
                    </h3>
                    <p className="text-gray-700 font-medium">
                      {new Date(market.createdAt).toLocaleDateString("en-GB", {
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
                        {market.contentManager?.name || "N/A"}
                      </p>
                    </div>

                    <div>

                      <Link
                        to={`/admin/content-manage/client-profile/${market.contentManagerId}`}
                        state={{ managerData: market.contentManager }}
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

          <FormalCard
            header="Market Update Description"
            headerStyle="font-nunito-semibold-italic"
          >
            <div
              className="text-[#666666] leading-relaxed prose max-w-none text-sm sm:text-base"
              dangerouslySetInnerHTML={{ __html: market.description }}
            />
          </FormalCard>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              onClick={() => {
                navigate(`/content-manager/manage-markets/edit-market/update/${id}`);
              }}
              className="bg-linear-to-bl to-brand from-[#B08D59] py-6 px-8"
            >
              <HugeiconsIcon icon={UserEdit01Icon} className="mr-2" />
              Update this post
            </Button>

            <TakeConfirm
              title="Are you sure you want to delete this post?"
              description="This action will permanently remove this market update from the system."
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
                {isDeleting ? "Deleting..." : "Delete this Post"}
              </Button>
            </TakeConfirm>
          </div>
        </div>
      </PageContent>
    </PageLayout>
  );
}

export default ManageMarketDetails;