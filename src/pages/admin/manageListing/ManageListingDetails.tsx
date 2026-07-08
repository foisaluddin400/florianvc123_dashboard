// ManageListingDetails.tsx

"use client";

import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import {
  useGetSingleManageListQuery,
  useUpdateStatusMutation,
} from "../../../redux/manageListApi/ManageListApi";
import toast from "react-hot-toast";

const ManageListingDetails = () => {
  const { id } = useParams();
  const [loadingAction, setLoadingAction] = useState("");
  const [approveReject] = useUpdateStatusMutation();
  // ensure we pass a string to the query hook (useParams can be undefined)
  const { data } = useGetSingleManageListQuery(id ?? "");

  const auction = data?.data;

  const [selectedImage, setSelectedImage] = useState(
    auction?.cover_image || "",
  );
  const handleUpdateStatus = async (action: "APPROVE" | "REJECT") => {
    try {
      setLoadingAction(action);

      const res = await approveReject({
        id,
        data: {
          action,
        },
      }).unwrap();
      toast.success(res?.message);
    } catch (error) {
      console.log(error);
      const err = error as { data?: { message?: string }; message?: string };
      toast.error(err.data?.message || err.message || "Something went wrong");
    } finally {
      setLoadingAction("");
    }
  };
  const allImages = [auction?.cover_image, ...(auction?.images || [])].filter(
    Boolean,
  );

  return (
    <div className=" space-y-4">
      {/* TOP CARD */}
      <div className="bg-white rounded-xl border p-4">
        <h2 className="text-[15px] font-semibold text-gray-700 border-b pb-3 mb-4">
          Auction Listed By
        </h2>

        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <img
              src={
                auction?.listedBy?.profile_image ||
                "https://ui-avatars.com/api/?name=User"
              }
              alt=""
              className="w-10 h-10 rounded-full object-cover"
            />

            <div>
              <h3 className="text-sm font-medium">
                {auction?.listedBy?.name || null}
              </h3>
            </div>
          </div>

          <p className="text-sm text-gray-500">
            {auction?.listedBy?.email || null}
          </p>

          <p className="text-sm text-gray-500">
            {auction?.listedBy?.phone || null}
          </p>

          <p className="text-sm text-gray-500">{auction?.location || null}</p>

          <p className="text-sm text-gray-500">
            {auction?.createdAt
              ? new Date(auction.createdAt).toLocaleDateString()
              : null}
          </p>

          <span className="text-green-500 text-sm font-medium">Active</span>

          <button className="border rounded-md p-2 hover:bg-gray-100">
            🔒
          </button>
        </div>
      </div>

      {/* IMAGE + AUCTION INFO */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* LEFT IMAGE */}
        <div className="bg-white rounded-xl border p-3">
          <img
            src={selectedImage || auction?.cover_image}
            alt=""
            className="w-full h-[260px] rounded-xl object-cover"
          />

          <div className="flex gap-2 mt-3 overflow-x-auto">
            {allImages?.map((img: string, index: number) => (
              <img
                key={index}
                src={img}
                alt=""
                onClick={() => setSelectedImage(img)}
                className={`w-20 h-16 rounded-lg object-cover cursor-pointer border-2 ${
                  selectedImage === img
                    ? "border-primary"
                    : "border-transparent"
                }`}
              />
            ))}
          </div>
        </div>

        {/* AUCTION INFO */}
        <div className="lg:col-span-2 bg-white rounded-xl border p-4">
          <h2 className="text-[15px] font-semibold text-gray-700 border-b pb-3 mb-5">
            Auction Information
          </h2>

          <div className="grid grid-cols-2 gap-y-6 gap-x-10">
            <div>
              <p className="text-xs text-gray-400 mb-1">Minimum Bid Amount</p>

              <h3 className="text-sm font-medium">
                AED {auction?.minimumBidAmount || null}
              </h3>
            </div>

            <div>
              <p className="text-xs text-gray-400 mb-1">Auction Start Date</p>

              <h3 className="text-sm font-medium">
                {auction?.auctionStartDateTime
                  ? new Date(auction.auctionStartDateTime).toLocaleDateString()
                  : null}
              </h3>
            </div>

            <div>
              <p className="text-xs text-gray-400 mb-1">Auction Start Time</p>

              <h3 className="text-sm font-medium">
                {auction?.auctionStartDateTime
                  ? new Date(auction.auctionStartDateTime).toLocaleTimeString()
                  : null}
              </h3>
            </div>

            <div>
              <p className="text-xs text-gray-400 mb-1">Auction End Date</p>

              <h3 className="text-sm font-medium">
                {auction?.auctionEndDateTime
                  ? new Date(auction.auctionEndDateTime).toLocaleDateString()
                  : null}
              </h3>
            </div>

            <div>
              <p className="text-xs text-gray-400 mb-1">Auction End Time</p>

              <h3 className="text-sm font-medium">
                {auction?.auctionEndDateTime
                  ? new Date(auction.auctionEndDateTime).toLocaleTimeString()
                  : null}
              </h3>
            </div>

            <div>
              <p className="text-xs text-gray-400 mb-1">Auction Status</p>

              <h3 className="text-sm font-medium text-orange-500">
                {auction?.status || null}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* PROPERTY INFO */}
      <div className="bg-white rounded-xl border p-4">
        <h2 className="text-[15px] font-semibold text-gray-700 border-b pb-3 mb-5">
          Property Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-10">
          <div>
            <p className="text-xs text-gray-400 mb-1">Property Name</p>

            <h3 className="text-sm font-medium">{auction?.title || null}</h3>
          </div>

          <div>
            <p className="text-xs text-gray-400 mb-1">Area (BUA)</p>

            <h3 className="text-sm font-medium">
              {auction?.areaSqFt || null} Sq. Ft.
            </h3>
          </div>

          <div>
            <p className="text-xs text-gray-400 mb-1">Asset Class</p>

            <h3 className="text-sm font-medium">
              {auction?.assetClass || null}
            </h3>
          </div>

          <div>
            <p className="text-xs text-gray-400 mb-1">Bedrooms</p>

            <h3 className="text-sm font-medium">
              {auction?.bedrooms || null} Beds
            </h3>
          </div>

          <div>
            <p className="text-xs text-gray-400 mb-1">Bathrooms</p>

            <h3 className="text-sm font-medium">
              {auction?.bathrooms || null} Baths
            </h3>
          </div>

          <div>
            <p className="text-xs text-gray-400 mb-1">Interior</p>

            <h3 className="text-sm font-medium">{auction?.interior || null}</h3>
          </div>

          <div>
            <p className="text-xs text-gray-400 mb-1">Service Charges</p>

            <h3 className="text-sm font-medium">
              AED {auction?.serviceCharge || null}
            </h3>
          </div>

          <div>
            <p className="text-xs text-gray-400 mb-1">Expected ROI</p>

            <h3 className="text-sm font-medium">
              {auction?.expectedRoi || null}%
            </h3>
          </div>

          <div>
            <p className="text-xs text-gray-400 mb-1">DLD Fee</p>

            <h3 className="text-sm font-medium">
              AED {auction?.dldFee || null}
            </h3>
          </div>

          <div>
            <p className="text-xs text-gray-400 mb-1">Payment</p>

            <h3 className="text-sm font-medium">
              {auction?.paymentPlan || null}
            </h3>
          </div>

          <div className="lg:col-span-2">
            <p className="text-xs text-gray-400 mb-1">Location</p>

            <h3 className="text-sm font-medium">{auction?.location || null}</h3>
          </div>
        </div>
      </div>

      {/* DESCRIPTION */}
      <div className="bg-white rounded-xl border p-4">
        <h2 className="text-[15px] font-semibold text-gray-700 border-b pb-3 mb-5">
          Property Description
        </h2>

        <div className="space-y-4 text-sm text-gray-600 leading-7">
          <p>{auction?.description || null}</p>

          <p>{auction?.overview || null}</p>

          <p>{auction?.highlights || null}</p>
        </div>
      </div>

      {/* BUTTONS */}
      <div className="flex gap-3">
        {/* BUTTONS */}
        <div className="flex gap-3">
          {auction?.status === "UNDER_REVIEW" && (
            <>
              <Button
                onClick={() => handleUpdateStatus("APPROVE")}
                disabled={loadingAction === "APPROVE"}
                className="bg-[#C89B47] hover:bg-[#b88c3d]"
              >
                {loadingAction === "APPROVE"
                  ? "Approving..."
                  : "Approve Listing"}
              </Button>

              <Button
                variant="destructive"
                onClick={() => handleUpdateStatus("REJECT")}
                disabled={loadingAction === "REJECT"}
              >
                {loadingAction === "REJECT" ? "Rejecting..." : "Reject Listing"}
              </Button>
            </>
          )}

          {auction?.status === "SCHEDULED" && (
            <Button
              disabled
              className="bg-green-600 hover:bg-green-600 cursor-not-allowed"
            >
              Approved
            </Button>
          )}

          {auction?.status === "REJECTED" && (
            <Button
              disabled
              variant="destructive"
              className="cursor-not-allowed"
            >
              Rejected
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageListingDetails;
