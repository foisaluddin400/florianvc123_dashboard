"use client";

import { Download, Eye } from "lucide-react";
import FormalCard from "../../../../components/shared/cards/FormalCard";
import {
  PageContent,
  PageLayout,
} from "../../../../components/shared/PageLayout";
import { useParams } from "react-router-dom";
import { useGetSinglePaymentInvoiceQuery } from "../../../../redux/paymentApi/paymentInvoiceApi";

// ✅ Define Invoice Type
interface Invoice {
  invoiceDate?: string;
  dueDate?: string;
  amount?: number;
  status?: "PAID" | "PARTIALLY_PAID" | "UNPAID" | string;
  paymentDate?: string;
  document_url?: string;
}

// ✅ API Response Type (adjust if needed)
interface InvoiceResponse {
  data?: Invoice;
}

function PaymentInvoiceDetails() {
  const { id } = useParams<{ id: string }>();

  const { data: invoiceData, isLoading, isError } =
    useGetSinglePaymentInvoiceQuery(id as string);

  const invoice = (invoiceData as InvoiceResponse)?.data;

  // ✅ Format Date
  const formatDate = (date?: string) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // ✅ Status Color
  const getStatusColor = (status?: string) => {
    switch (status) {
      case "PAID":
        return "text-green-500";
      case "PARTIALLY_PAID":
        return "text-blue-500";
      case "UNPAID":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  if (isLoading) {
    return <p className="text-center py-10">Loading...</p>;
  }

  if (isError) {
    return (
      <p className="text-center py-10 text-red-500">
        Failed to load invoice data
      </p>
    );
  }

  return (
    <PageLayout title="Payment Invoice Details">
      <PageContent>
        <FormalCard header="Payment Invoice Details">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12 mb-8">
            <div>
              <h3 className="text-[#B0B0B0] text-sm">Invoice Date</h3>
              <p className="text-gray-600 font-medium">
                {formatDate(invoice?.invoiceDate)}
              </p>
            </div>

            <div>
              <h3 className="text-[#B0B0B0] text-sm">Due Date</h3>
              <p className="text-gray-600 font-medium">
                {formatDate(invoice?.dueDate)}
              </p>
            </div>

            <div>
              <h3 className="text-[#B0B0B0] text-sm">Invoice Amount</h3>
              <p className="text-gray-600 font-medium">
                ${invoice?.amount ?? 0}
              </p>
            </div>

            <div>
              <h3 className="text-[#B0B0B0] text-sm">Payment Status</h3>
              <p className={`font-medium ${getStatusColor(invoice?.status)}`}>
                {invoice?.status?.replaceAll("_", " ") || "N/A"}
              </p>
            </div>

            <div>
              <h3 className="text-[#B0B0B0] text-sm">Payment Date</h3>
              <p className="text-gray-600 font-medium">
                {formatDate(invoice?.paymentDate)}
              </p>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-[#B0B0B0] text-sm mb-2">
              Invoice Document
            </h3>

            {invoice?.document_url ? (
              <div className="flex items-center justify-between py-4 border-b border-muted-foreground/10">
                <span className="text-gray-600 font-medium">
                  Invoice Document.pdf
                </span>

                <div className="flex gap-2">
                  <button
                    className="p-2 rounded-md bg-[#FAF5FF] text-purple-500 hover:bg-[#F3E8FF]"
                    onClick={() =>
                      window.open(invoice.document_url, "_blank")
                    }
                  >
                    <Eye size={18} />
                  </button>

                  <a href={invoice.document_url} download>
                    <button className="p-2 rounded-md bg-[#EFF6FF] text-blue-500 hover:bg-[#DBEAFE]">
                      <Download size={18} />
                    </button>
                  </a>
                </div>
              </div>
            ) : (
              <p className="text-gray-400">No document available</p>
            )}
          </div>
        </FormalCard>
      </PageContent>
    </PageLayout>
  );
}

export default PaymentInvoiceDetails;