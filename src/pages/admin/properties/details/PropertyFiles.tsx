import { AddSquareIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Download, Eye, FileText, Loader, Pen, Trash2 } from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FormalCard from "../../../../components/shared/cards/FormalCard";
import IconWrapper from "../../../../components/shared/cards/IconWrapper";
import NoData from "../../../../components/shared/NoData";
import {
  PageContent,
  PageLayout,
} from "../../../../components/shared/PageLayout";
import { Button } from "../../../../components/ui/button";
import ImageModal from "../../../../components/ui/image-modal";
import TakeConfirm from "../../../../components/ui/take-confirm";
import {
  useDeleteSingleAllPropertyFilesMutation,
  useGetSingleAllPropertyFilesQuery,
} from "../../../../redux/property/propertyApis";
import toast from "react-hot-toast";
import { useGetProfileQuery } from "../../../../redux/services/profileApis";

const isImageUrl = (url: string) => {
  if (!url) return false;
  return /\.(jpg|jpeg|png|gif|webp|svg)(\?.*)?$/i.test(url);
};

const formatDate = (dateStr: string) => {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// Helper: proper download using file_url
const handleDownload = (fileUrl: string, fileName: string) => {
  if (!fileUrl) return;
  const link = document.createElement("a");
  link.href = fileUrl;
  link.download = fileName || "download";
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

function propertyFiles() {
  const sate = useLocation().state;
  console.log(sate);
  const propertyId = sate?.id;
  const navigate = useNavigate();
 const { data: profile } = useGetProfileQuery()
  const { data: allPropertyFiles, isLoading } =
    useGetSingleAllPropertyFilesQuery(propertyId);
  console.log(propertyId);
  const [deleteSingleAllPropertyFiles] =
    useDeleteSingleAllPropertyFilesMutation();
  const siteUpdates = allPropertyFiles?.data?.data ?? [];
  console.log(allPropertyFiles);

  const navigateToRouter = (path: string, id: string) => {
    navigate(path, { state: { id } });
  };

const renderAction = (id: string) => (
  <>
    {profile?.data?.user?.role === "PROPERTY_MANAGER" && (
      <Button
        onClick={() => navigateToRouter(`/property-files/create`, id)}
        className="bg-brand text-white"
        variant="outline"
      >
        <HugeiconsIcon icon={AddSquareIcon} /> Add New File
      </Button>
    )}
  </>
);
  const deleteAction = async (id: string) => {
    setDeletingId(id);
    try {
      const response = await deleteSingleAllPropertyFiles(id).unwrap();
      if (response.success) {
        toast.success(response.message || "Site update deleted successfully!");
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to delete site update");
    } finally {
      setDeletingId(null);
    }
  };

  // Track which item is currently being deleted
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [showImageModal, setShowImageModal] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  return (
    <PageLayout title="The Wilds Project / Property Files">
      <PageContent>
        {/* Full-page blur overlay during delete */}
        {deletingId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/40 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-3">
              <Loader size={40} className="animate-spin text-brand" />
              <span className="text-sm font-medium text-gray-500">
                Deleting...
              </span>
            </div>
          </div>
        )}
        <FormalCard header="Property Files" action={renderAction(sate?.id)}>
          {/* Loading skeleton */}
          {isLoading && (
            <div className="flex flex-col divide-y divide-gray-100">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-4 animate-pulse"
                >
                  <div className="flex gap-3 items-center">
                    <div className="w-12 h-12 bg-gray-200 rounded-md" />
                    <div className="space-y-2">
                      <div className="w-36 h-3 bg-gray-200 rounded" />
                      <div className="w-24 h-2 bg-gray-100 rounded" />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4].map((j) => (
                      <div key={j} className="w-8 h-8 bg-gray-200 rounded-md" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Data list */}
          {!isLoading && siteUpdates.length > 0 && (
            <div className="flex flex-col divide-y divide-gray-100">
              {siteUpdates.map((update: any) => {
                const hasImage = isImageUrl(update.file_url);
                return (
                  <div
                    key={update.id}
                    className="flex items-center justify-between py-4"
                  >
                    {/* Left: thumbnail + info */}
                    <div className="flex gap-3 items-center">
                      {hasImage ? (
                        <img
                          src={update.file_url}
                          alt={update.name}
                          className="w-12 h-12 object-cover rounded-md border border-gray-100"
                        />
                      ) : (
                        <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-md border border-gray-200">
                          <FileText size={22} className="text-gray-400" />
                        </div>
                      )}
                      <div>
                        <span className="text-gray-700 font-medium block">
                          {update.name}
                        </span>
                        <span className="text-xs text-gray-400">
                          {formatDate(update.createdAt)}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2 items-center">
                      {/* Edit */}
                      <IconWrapper
                        onClick={() =>
                          navigate(
                            `/admin/properties/file-updates/edit/${update.id}`,
                            {
                              state: {
                                id: update.id,
                                name: update.name,
                                file_url: update.file_url,
                              },
                            },
                          )
                        }
                        className="bg-[#F0FDF4] border border-[#D1FAE5] text-green-500 hover:bg-[#D1FAE5] w-8 h-8 p-2 transition-colors cursor-pointer"
                      >
                        <Pen size={14} />
                      </IconWrapper>

                      {/* Delete */}
                      <TakeConfirm
                        title="Delete Site Update"
                        description="Are you sure you want to delete this site update?"
                        confirmText="Delete"
                        cancelText="Cancel"
                        onConfirm={() => deleteAction(update?.id)}
                      >
                        <IconWrapper className="bg-[#FFF5F5] border border-[#FEE2E2] text-red-500 hover:bg-[#FEE2E2] w-8 h-8 p-2 transition-colors cursor-pointer">
                          <Trash2 size={14} />
                        </IconWrapper>
                      </TakeConfirm>

                      {/* Preview (images only) */}
                      {hasImage && (
                        <IconWrapper
                          onClick={() => {
                            setSelectedImage([update.file_url]);
                            setCurrentImageIndex(0);
                            setShowImageModal(true);
                          }}
                          className="bg-[#FAF5FF] border border-[#F3E8FF] text-purple-500 hover:bg-[#F3E8FF] w-8 h-8 p-2 transition-colors cursor-pointer"
                        >
                          <Eye size={14} />
                        </IconWrapper>
                      )}

                      {/* Download via file_url */}
                      <IconWrapper
                        onClick={() =>
                          handleDownload(update.file_url, update.name)
                        }
                        className="bg-[#F0F9FF] border border-[#E0F2FE] text-blue-500 hover:bg-[#E0F2FE] w-8 h-8 p-2 transition-colors cursor-pointer"
                      >
                        <Download size={14} />
                      </IconWrapper>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Empty state */}
          {!isLoading && siteUpdates.length === 0 && (
            <NoData message="No Site Updates Available" />
          )}

          {showImageModal && (
            <ImageModal
              images={selectedImage}
              isOpen={showImageModal}
              onClose={() => setShowImageModal(false)}
              initialIndex={currentImageIndex}
            />
          )}
        </FormalCard>
      </PageContent>
    </PageLayout>
  );
}

export default propertyFiles;
