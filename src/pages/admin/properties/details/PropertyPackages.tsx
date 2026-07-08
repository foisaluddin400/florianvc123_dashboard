"use client";

import { AddSquareIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Eye, Pen, Trash2 } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import FormalCard from "../../../../components/shared/cards/FormalCard";
import IconWrapper from "../../../../components/shared/cards/IconWrapper";
import NoData from "../../../../components/shared/NoData";
import {
  PageContent,
  PageLayout,
} from "../../../../components/shared/PageLayout";
import { Button } from "../../../../components/ui/button";
import TakeConfirm from "../../../../components/ui/take-confirm";

import {
  useDeletePropertyPackageMutation,
  useGetPropertyPackagesQuery,
} from "../../../../redux/property/propertyApis";
import { useGetProfileQuery } from "../../../../redux/services/profileApis";
import toast from "react-hot-toast";

/* =========================
   TYPES
========================= */

interface LocationState {
  id?: string;
}

interface PropertyPackage {
  id: string;
  name: string;
}

interface ApiResponse {
  data?: {
    data?: PropertyPackage[];
  };
}

/* =========================
   COMPONENT
========================= */

function PropertyPackages() {
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state as LocationState;
  const propertyId = state?.id;

  const {
    data: propertyData,
    isLoading,
    isError,
  } = useGetPropertyPackagesQuery(propertyId as string, {
    skip: !propertyId,
  });
  const { data: profile } = useGetProfileQuery();
  const response = propertyData as ApiResponse;
  const [deletePropertyPackage] = useDeletePropertyPackageMutation();
  const propertyPackages: PropertyPackage[] = response?.data?.data ?? [];
  console.log(propertyPackages);
  /* =========================
     ACTIONS
  ========================= */

  const renderAction = () => (
    <>
      {profile?.data?.user?.role === "PROPERTY_MANAGER" && (
        <Link to="/admin/properties/packages/add" state={{ id: propertyId }}>
          <Button className="bg-brand text-white">
            <HugeiconsIcon icon={AddSquareIcon} />
            Add New Package
          </Button>
        </Link>
      )}
    </>
  );
  const deleteAction = (id: string) => {
    console.log("Delete action:", id);
    deletePropertyPackage(id)
      .unwrap()
      .then(() => {
        toast.success("Property package deleted successfully");
        console.log("Property package deleted successfully");
      })
      .catch((error) => {
        console.error("Failed to delete property package:", error);
        toast.error("Failed to delete property package");
      });
  };

  /* =========================
     UI
  ========================= */

  return (
    <PageLayout title="Property Packages">
      <PageContent>
        <FormalCard header="Property Packages" action={renderAction()}>
          {/* Loading */}
          {isLoading && (
            <p className="text-center py-10 text-gray-400">Loading...</p>
          )}

          {/* Error */}
          {isError && (
            <p className="text-center py-10 text-red-500">
              Failed to load property packages
            </p>
          )}

          {/* Data */}
          {!isLoading && !isError && (
            <>
              {propertyPackages.length > 0 ? (
                <div className="flex flex-col">
                  {propertyPackages.map((pkg, index) => (
                    <div
                      key={pkg.id}
                      className={`flex items-center justify-between py-4 ${
                        index !== propertyPackages.length - 1
                          ? "border-b border-muted-foreground/10"
                          : ""
                      }`}
                    >
                      {/* Name */}
                      <span className="text-gray-600 font-medium">
                        {pkg.name}
                      </span>

                      {/* Actions */}
                      <div className="flex gap-2 items-center">
                        {/* Edit */}
                        <IconWrapper
                          onClick={() =>
                            navigate(
                              `/admin/properties/packages/edit/${pkg.id}`,
                              { state: { pkg } },
                            )
                          }
                          className="text-green-500"
                        >
                          <Pen size={14} />
                        </IconWrapper>

                        {/* Delete */}
                        <TakeConfirm
                          title="Delete Property Package"
                          description="Are you sure you want to delete this property package?"
                          confirmText="Delete"
                          cancelText="Cancel"
                          onConfirm={() => deleteAction(pkg.id)}
                        >
                          <IconWrapper className="text-red-500">
                            <Trash2 size={14} />
                          </IconWrapper>
                        </TakeConfirm>

                        {/* View */}
                        <IconWrapper
                          onClick={() =>
                            navigate(
                              `/admin/properties/packages/details/${pkg.id}`,
                              {
                                state: { pkg },
                              },
                            )
                          }
                          className="text-purple-500"
                        >
                          <Eye size={14} />
                        </IconWrapper>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <NoData message="No Property Packages Available" />
              )}
            </>
          )}
        </FormalCard>
      </PageContent>
    </PageLayout>
  );
}

export default PropertyPackages;
