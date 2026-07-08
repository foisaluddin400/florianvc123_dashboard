// UserManageDetails.tsx

"use client";

import {
  Check,
  X,
} from "lucide-react";

import { useParams } from "react-router-dom";

import {
  useGetSingleUserQuery,
  useUpdateUserStatusMutation,
} from "../../../redux/manageListApi/ManageListApi";
import toast from "react-hot-toast";

const UserManageDetails = () => {
  const { id } = useParams();

  const [approveReject, { isLoading }] =
    useUpdateUserStatusMutation();

  const { data: userDetails } =
    useGetSingleUserQuery(id ?? "");

  const user = userDetails?.data?.[0];

  const handleStatusUpdate = async (
    status: "ACTIVE" | "REJECTED"
  ) => {
    try {
      const res = await approveReject({
        id,
        data: { status },
      }).unwrap();
      toast.success(res?.message);
    } catch (error: any) {
      console.log(error);
      const errorMessage =
        error?.data?.message || error?.message || "Something went wrong";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="p-6">
      {/* Profile Image */}
      <div className="mb-6">
        <img
          src={
            user?.profile_image ||
            "https://i.ibb.co/4pDNDk1/avatar.png"
          }
          alt={user?.name}
          className="w-16 h-16 rounded-xl object-cover border"
        />
      </div>

      {/* Personal Information */}
      <div className="border rounded-2xl overflow-hidden mb-6">
        <div className="border-b px-5 py-4">
          <h2 className="font-semibold italic text-gray-700">
            Personal Information
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-10 p-5">
          <div className="space-y-6">
            <div>
              <p className="text-xs text-gray-400 italic mb-1">
                Full Name
              </p>

              <h3 className="text-sm font-medium">
                {user?.name || "N/A"}
              </h3>
            </div>

            <div>
              <p className="text-xs text-gray-400 italic mb-1">
                Contact Phone / WhatsApp
              </p>

              <h3 className="text-sm font-medium">
                {user?.phone || "N/A"}
              </h3>
            </div>

            <div>
              <p className="text-xs text-gray-400 italic mb-1">
                Default Address
              </p>

              <h3 className="text-sm font-medium">
                {user?.address || "N/A"}
              </h3>
            </div>

            <div>
              <p className="text-xs text-gray-400 italic mb-1">
                Status
              </p>

              <span
                className={`text-sm font-medium ${
                  user?.status === "ACTIVE"
                    ? "text-green-600"
                    : user?.status === "REJECTED"
                    ? "text-red-500"
                    : "text-yellow-500"
                }`}
              >
                {user?.status}
              </span>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-xs text-gray-400 italic mb-1">
                Email Address
              </p>

              <h3 className="text-sm font-medium">
                {user?.email || "N/A"}
              </h3>
            </div>

            <div>
              <p className="text-xs text-gray-400 italic mb-1">
                Nationality
              </p>

              <h3 className="text-sm font-medium">
                {user?.nationality || "N/A"}
              </h3>
            </div>

            <div>
              <p className="text-xs text-gray-400 italic mb-1">
                Joined On
              </p>

              <h3 className="text-sm font-medium">
                {new Date(
                  user?.createdAt
                ).toLocaleDateString()}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Verification Information */}
      <div className="border rounded-2xl overflow-hidden mb-6">
        <div className="border-b px-5 py-4">
          <h2 className="font-semibold italic text-gray-700">
            Verification Information
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-10 p-5">
          <div>
            <p className="text-xs text-gray-400 italic mb-1">
              Identification Type
            </p>

            <h3 className="text-sm font-medium">
              {user?.identificationType ||
                "N/A"}
            </h3>
          </div>

          <div>
            <p className="text-xs text-gray-400 italic mb-2">
              Documents
            </p>

            {user?.identificationDocument ? (
              <img
                src={
                  user?.identificationDocument
                }
                alt="document"
                className="w-28 h-16 rounded-md object-cover border"
              />
            ) : (
              <p className="text-sm text-gray-500">
                No document uploaded
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        {/* Approve Button */}
        {user?.status !== "REJECTED" && (
          <button
            disabled={
              user?.status === "ACTIVE" ||
              isLoading
            }
            onClick={() =>
              handleStatusUpdate("ACTIVE")
            }
            className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition ${
              user?.status === "ACTIVE"
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-[#C8A76A] text-white hover:opacity-90"
            }`}
          >
            <Check size={16} />
            Approve User
          </button>
        )}

        {/* Reject Button */}
        <button
          disabled={
            user?.status === "REJECTED" ||
            isLoading
          }
          onClick={() =>
            handleStatusUpdate("REJECTED")
          }
          className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition ${
            user?.status === "REJECTED"
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-red-500 text-white hover:bg-red-600"
          }`}
        >
          <X size={16} />
          Reject Application
        </button>
      </div>
    </div>
  );
};

export default UserManageDetails;