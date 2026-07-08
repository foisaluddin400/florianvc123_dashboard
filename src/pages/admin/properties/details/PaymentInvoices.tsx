"use client";

import { AddSquareIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Download, Eye, Loader, Pen, Trash2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

import NoData from "../../../../components/shared/NoData";
import FormalCard from "../../../../components/shared/cards/FormalCard";
import IconWrapper from "../../../../components/shared/cards/IconWrapper";
import {
  PageContent,
  PageLayout,
} from "../../../../components/shared/PageLayout";
import { Button } from "../../../../components/ui/button";
import TakeConfirm from "../../../../components/ui/take-confirm";

import {
  useDeletePaymentPlanMutation,
} from "../../../../redux/paymentApi/paymentApi";

import {
  useGetPaymentPlaneQuery,
  useGetPropertyInvoiceQuery,
} from "../../../../redux/paymentApi/paymentInvoiceApi";
import { useGetProfileQuery } from "../../../../redux/services/profileApis";

/* =========================
   TYPES
========================= */

interface LocationState {
  id?: string;
}

interface PaymentInvoice {
  id: string;
  status: string;
  statusColor?: string;
}

interface PaymentPlan {
  id: string;
  name: string;
  file_url: string;
  createdAt: string;
}

/* =========================
   HELPERS
========================= */

const formatDate = (dateStr?: string) => {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const handleDownload = (fileUrl: string, fileName?: string) => {
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

/* =========================
   COMPONENT
========================= */

function PaymentInvoices() {
  const [activeTab, setActiveTab] = useState<"invoices" | "plan">(
    "invoices",
  );
 const { data: profile } = useGetProfileQuery()
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;

  const propertyId = state?.id;

  /* =========================
     API CALLS
  ========================= */

  const { data: paymentInvoiceResponse } = useGetPropertyInvoiceQuery(
    propertyId,
    { skip: !propertyId },
  );

  const paymentInvoiceData: PaymentInvoice[] =
    paymentInvoiceResponse?.data ?? [];

  const { data: paymentPlanResponse, isLoading: isPlanLoading } =
    useGetPaymentPlaneQuery(propertyId, {
      skip: !propertyId,
    });

  const paymentPlanData: PaymentPlan[] =
    paymentPlanResponse?.data?.data ?? [];

  const [deletePaymentPlan] = useDeletePaymentPlanMutation();

  /* =========================
     DELETE
  ========================= */

  const deleteAction = async (id: string) => {
    setDeletingId(id);

    try {
      const response = await deletePaymentPlan(id).unwrap();

      if (response.success) {
        toast.success(
          response.message || "Payment plan deleted successfully!",
        );
      }
    } catch (err: any) {
      toast.error(
        err?.data?.message || "Failed to delete payment plan",
      );
    } finally {
      setDeletingId(null);
    }
  };

  /* =========================
     ACTION BUTTON
  ========================= */

  const renderAction =
    activeTab === "plan" ? (
       <>
    {profile?.data?.user?.role === "PROPERTY_MANAGER" && (<Button
        onClick={() =>
          navigate("/admin/properties/payment-plan/add", {
            state: { id: propertyId },
          })
        }
        className="bg-brand text-white"
        variant="outline"
      >
        <HugeiconsIcon icon={AddSquareIcon} />
        Add New Plan
      </Button>
          )}
  </>

    ) : undefined;

  /* =========================
     UI
  ========================= */

  return (
    <PageLayout title={`The Wilds\nProject / Payment Invoices`}>
      <PageContent>
        {/* Delete overlay */}
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

        <FormalCard
          header="Payment Invoices"
          bodyStyle="p-0"
          action={renderAction}
        >
          {/* Tabs */}
          <div className="flex items-center gap-6 p-4 border-b border-muted-foreground/10">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="radio"
                checked={activeTab === "invoices"}
                onChange={() => setActiveTab("invoices")}
              />
              <span
                className={`text-sm font-medium ${
                  activeTab === "invoices"
                    ? "text-gray-600"
                    : "text-gray-400"
                }`}
              >
                Payment Invoices
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="radio"
                checked={activeTab === "plan"}
                onChange={() => setActiveTab("plan")}
              />
              <span
                className={`text-sm font-medium ${
                  activeTab === "plan"
                    ? "text-gray-600"
                    : "text-gray-400"
                }`}
              >
                Payment Plan
              </span>
            </label>
          </div>

          {/* =========================
              INVOICES TAB
          ========================= */}

          {activeTab === "invoices" && (
            <div className="flex flex-col">
              {paymentInvoiceData.length > 0 ? (
                paymentInvoiceData.map((item, index) => (
                  <div
                    key={item.id}
                    className={`flex items-center justify-between p-4 ${
                      index !== paymentInvoiceData.length - 1
                        ? "border-b border-muted-foreground/10"
                        : ""
                    }`}
                  >
                    <div className="flex flex-col gap-1">
                      <span className="text-gray-600 font-medium bg-[#f1f1f1] border w-max px-3 rounded">
                        File
                      </span>
                      <span className="text-xs text-gray-500">
                        {item.status}
                      </span>
                    </div>

                    <button
                      onClick={() =>
                        navigate(
                          `/admin/properties/invoices/${item.id}`,
                        )
                      }
                      className="p-2 rounded-md bg-[#FAF5FF] text-purple-500"
                    >
                      <Eye size={18} />
                    </button>
                  </div>
                ))
              ) : (
                <NoData message="No Payment Invoice Available" />
              )}
            </div>
          )}

          {/* =========================
              PLAN TAB
          ========================= */}

          {activeTab === "plan" && (
            <div className="flex flex-col">
              {isPlanLoading ? (
                <div className="flex flex-col gap-3 p-4">
                  <Loader className="animate-spin" />
                </div>
              ) : paymentPlanData.length > 0 ? (
                paymentPlanData.map((item, index) => (
                  <div
                    key={item.id}
                    className={`flex items-center justify-between p-4 ${
                      index !== paymentPlanData.length - 1
                        ? "border-b"
                        : ""
                    }`}
                  >
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-xs text-gray-400">
                        {formatDate(item.createdAt)}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <IconWrapper
                        onClick={() =>
                          navigate(
                            `/admin/properties/payment-plan/edit/${item.id}`,
                            {
                              state: item,
                            },
                          )
                        }
                        className="text-green-500"
                      >
                        <Pen size={14} />
                      </IconWrapper>

                      <TakeConfirm
                        title="Delete Payment Plan"
                        description="Are you sure?"
                        onConfirm={() => deleteAction(item.id)}
                      >
                        <IconWrapper className="text-red-500">
                          <Trash2 size={14} />
                        </IconWrapper>
                      </TakeConfirm>

                      <IconWrapper
                        onClick={() =>
                          handleDownload(item.file_url, item.name)
                        }
                        className="text-blue-500"
                      >
                        <Download size={14} />
                      </IconWrapper>
                    </div>
                  </div>
                ))
              ) : (
                <NoData message="No Payment Plan Available" />
              )}
            </div>
          )}
        </FormalCard>
      </PageContent>
    </PageLayout>
  );
}

export default PaymentInvoices;