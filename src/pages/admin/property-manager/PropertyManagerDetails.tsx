import { LockPasswordIcon, UserEdit01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { PageContent, PageLayout } from "../../../components/shared/PageLayout";
import FormalCard from "../../../components/shared/cards/FormalCard";
import { Button } from "../../../components/ui/button";
import { cn } from "../../../lib/utils";
import { useParams, useNavigate } from "react-router-dom";
import {
  useDeletePropertyMangerMutation,
  useGetSinglePropertyManagerQuery
} from "../../../redux/propertyManager/propertyMangerApi";
import { useBlockUnblockUserMutation } from "../../../redux/propertyManager/client/clientApi";
import { Loader } from "lucide-react";
import toast from "react-hot-toast";
import TakeConfirm from "../../../components/ui/take-confirm";

function PropertyManagerDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: userDatas, isLoading, refetch } = useGetSinglePropertyManagerQuery(id as string);
  const [blockUnblockUser, { isLoading: isStatusUpdating }] = useBlockUnblockUserMutation();
  const [deletePropertyManger, { isLoading: isDeleting }] = useDeletePropertyMangerMutation();

  const manager = userDatas?.data;

  const handleToggleStatus = async () => {
    if (!manager?.userId) return;
    try {
      const response = await blockUnblockUser(manager.userId).unwrap();
      if (response.success || response.statusCode === 200 || response.data) {
        toast.success(response.message || 'User status updated successfully');
        refetch();
      } else {
        toast.success('User status updated successfully');
        refetch();
      }
    } catch (err: any) {
      toast.error(err?.data?.message || 'Failed to update user status');
    }
  };

  const handleDelete = async () => {
    try {
      const res = await deletePropertyManger(id as string).unwrap();
      if (res.success) {
        toast.success("Property Manager deleted successfully!");
        navigate("/admin/property-manager", { replace: true });
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to delete property manager.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader className="animate-spin text-brand" size={40} />
      </div>
    );
  }

  const firstLetter = manager?.name ? manager.name.charAt(0).toUpperCase() : "U";
  const isBlocked = manager?.user?.isBlocked;
  const status = isBlocked ? "Blocked" : "Active";

  return (
    <PageLayout title="Property Manager Details">
      <PageContent>

        <div className="w-32 h-32 mb-6">
          {manager?.profile_image ? (
            <img
              src={manager.profile_image}
              alt={manager.name}
              className="w-full h-full rounded-md object-cover border"
            />
          ) : (
            <div className="w-full h-full rounded-md bg-brand/10 text-brand flex items-center justify-center text-4xl font-bold border border-brand/20 rounded-xl">
              {firstLetter}
            </div>
          )}
        </div>

        <FormalCard header="Manager Information">
          <div className="responsive-grid-2 gap-y-6">
            <div>
              <h1 className="text-[#B0B0B0] font-nunito-semibold-italic text-sm">
                Full Name
              </h1>
              <h1 className="text-[#666666] font-medium">{manager?.name || "N/A"}</h1>
            </div>
            <div>
              <h1 className="text-[#B0B0B0] font-nunito-semibold-italic text-sm">
                Email
              </h1>
              <h1 className="text-[#666666] font-medium">{manager?.email || "N/A"}</h1>
            </div>
            <div>
              <h1 className="text-[#B0B0B0] font-nunito-semibold-italic text-sm">
                Contact Phone
              </h1>
              <h1 className="text-[#666666] font-medium">{manager?.phone || "N/A"}</h1>
            </div>
            <div>
              <h1 className="text-[#B0B0B0] font-nunito-semibold-italic text-sm">
                Status
              </h1>
              <h1
                className={cn(
                  "font-semibold",
                  isBlocked ? "text-red-600" : "text-green-600"
                )}
              >
                {status}
              </h1>
            </div>
          </div>
        </FormalCard>

        <div className="flex flex-wrap gap-3 mt-8">
          <TakeConfirm
            title={`Are you sure you want to ${isBlocked ? 'unblock' : 'block'} ${manager?.name}?`}
            description={`This action will ${isBlocked ? 'unblock' : 'block'} the manager's access.`}
            onConfirm={handleToggleStatus}
            confirmText="Confirm"
            cancelText="Cancel"
          >
            <Button disabled={isStatusUpdating} className="bg-linear-to-bl to-brand from-[#B08D59] py-6 px-6 min-w-[200px] cursor-pointer">
              {isStatusUpdating ? (
                <Loader className="animate-spin w-5 h-5 mr-2" />
              ) : (
                <HugeiconsIcon icon={UserEdit01Icon} className="mr-2" />
              )}
              {isStatusUpdating ? "Updating..." : (isBlocked ? "Unblock This Manager" : "Block This Manager")}
            </Button>
          </TakeConfirm>

          <TakeConfirm
            title={`Are you sure you want to delete ${manager?.name}?`}
            description="This action cannot be undone. This manager will be permanently removed from the system."
            onConfirm={handleDelete}
            confirmText="Yes, Delete"
            cancelText="Cancel"
          >
            <Button
              disabled={isDeleting}
              className="bg-linear-to-bl to-red-900 from-red-500 py-6 px-6 min-w-[200px] cursor-pointer"
            >
              {isDeleting ? (
                <Loader className="animate-spin w-5 h-5 mr-2" />
              ) : (
                <HugeiconsIcon icon={LockPasswordIcon} className="mr-2" />
              )}
              {isDeleting ? "Deleting..." : "Delete This Manager"}
            </Button>
          </TakeConfirm>
        </div>
      </PageContent>
    </PageLayout>
  );
}

export default PropertyManagerDetails;