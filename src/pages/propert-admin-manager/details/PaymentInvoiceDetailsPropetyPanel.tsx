import { Download, Eye } from "lucide-react";
import FormalCard from "../../../components/shared/cards/FormalCard";
import {
  PageContent,
  PageLayout,
} from "../../../components/shared/PageLayout";

function PaymentInvoiceDetailsPropetyPanel() {
  const invoiceInfo = {
    invoiceDate: "15 Aug 2025",
    dueDate: "30 Aug 2025",
    amount: "$12,500",
    status: "Partially Paid",
    statusColor: "text-blue-500",
    paymentDate: "20 Aug 2025",
    fileName: "Property_document 01 .Pdf",
  };

  const propertyFiles = [
    {
      id: "1",
      name: "Property_document 01 .Pdf",
      pdfLink:
        "https://tourism.gov.in/sites/default/files/2019-04/dummy-pdf_2.pdf",
    },
    {
      id: "2",
      name: "Property_document 02 .Pdf",
      pdfLink:
        "https://tourism.gov.in/sites/default/files/2019-04/dummy-pdf_2.pdf",
    },
    {
      id: "3",
      name: "Property_document 03 .Pdf",
      pdfLink:
        "https://tourism.gov.in/sites/default/files/2019-04/dummy-pdf_2.pdf",
    },
  ];

  return (
    <PageLayout title={`The Wilds\nProject / Payment Invoices`}>
      <PageContent>
        <FormalCard header="Payment Invoices Details">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12 mb-8">
            <div>
              <h3 className="text-[#B0B0B0] font-nunito-semibold-italic text-sm">
                Invoice Date
              </h3>
              <p className="text-gray-600 font-medium">
                {invoiceInfo.invoiceDate}
              </p>
            </div>
            <div>
              <h3 className="text-[#B0B0B0] font-nunito-semibold-italic text-sm">
                Due Date
              </h3>
              <p className="text-gray-600 font-medium">{invoiceInfo.dueDate}</p>
            </div>
            <div>
              <h3 className="text-[#B0B0B0] font-nunito-semibold-italic text-sm">
                Invoice Amount
              </h3>
              <p className="text-gray-600 font-medium">{invoiceInfo.amount}</p>
            </div>
            <div>
              <h3 className="text-[#B0B0B0] font-nunito-semibold-italic text-sm">
                Payment Status
              </h3>
              <p className={`font-medium ${invoiceInfo.statusColor}`}>
                {invoiceInfo.status}
              </p>
            </div>
            <div>
              <h3 className="text-[#B0B0B0] font-nunito-semibold-italic text-sm">
                Payment Date
              </h3>
              <p className="text-gray-600 font-medium">
                {invoiceInfo.paymentDate}
              </p>
            </div>
          </div>



          <div className="mt-8">
            <h3 className="text-[#B0B0B0] font-nunito-semibold-italic text-sm mb-2">
              Property Location
            </h3>

            {propertyFiles.map((file, index) => (
              <div
                key={file.id}
                className={`flex items-center justify-between py-4 ${index !== propertyFiles.length - 1
                  ? "border-b border-muted-foreground/10"
                  : ""
                  }`}
              >
                <span className="text-gray-600 font-medium">{file.name}</span>
                <div className="flex gap-2">
                  <button
                    className="p-2 rounded-md bg-[#FAF5FF] text-purple-500 hover:bg-[#F3E8FF] transition-colors cursor-pointer"
                    title="View"
                    onClick={() => window.open(file.pdfLink, "_blank")}
                  >
                    <Eye size={18} />
                  </button>
                  <a href={file.pdfLink} download>
                    <button
                      className="p-2 rounded-md bg-[#EFF6FF] text-blue-500 hover:bg-[#DBEAFE] transition-colors cursor-pointer"
                      title="Download"
                    >
                      <Download size={18} />
                    </button>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </FormalCard>
      </PageContent>
    </PageLayout>
  );
}

export default PaymentInvoiceDetailsPropetyPanel;
