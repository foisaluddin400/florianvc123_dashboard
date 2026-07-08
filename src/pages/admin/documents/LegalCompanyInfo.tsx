import { Edit04Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useNavigate } from "react-router-dom";
import { PageContent, PageLayout } from "../../../components/shared/PageLayout";
import Space from "../../../components/shared/Space";
import FormalCard from "../../../components/shared/cards/FormalCard";
import { Button } from "../../../components/ui/button";
import { cn } from "../../../lib/utils";
import { useGetLegalAndCompanyQuery } from "../../../redux/legalAndCompanyApi/legalAndCompanyApi";
import { Loader } from "lucide-react";

function LegalCompanyInfo() {
  const navigate = useNavigate();

  const { data: legalAndCompanyResponse, isLoading } =
    useGetLegalAndCompanyQuery();
  const legalAndCompanyData = legalAndCompanyResponse?.data;

  if (isLoading) {
    return (
      <PageLayout title="Legal & Company Info">
        <div className="flex justify-center items-center py-40">
          <Loader className="animate-spin text-brand" size={40} />
        </div>
      </PageLayout>
    );
  }

  const legalInfo = {
    "Company Name": legalAndCompanyData?.name || "N/A",
    "Registered Office Address": legalAndCompanyData?.officeAddress || "N/A",
    "Trade License Number": legalAndCompanyData?.tradeLicenseNumber || "N/A",
    "Issuing Authority": legalAndCompanyData?.issuingAuthority || "N/A",
    "Business Activity": legalAndCompanyData?.businessActivity || "N/A",
    "Phone Number": legalAndCompanyData?.phoneNumber || "N/A",
    "Official Website": legalAndCompanyData?.websiteLink || "N/A",
  };

  const handleUpdateInfo = () => {
    // Handle update info logic here
    console.log("Update info clicked");
    navigate("/admin/legal-company-info/edit");
  };

  return (
    <PageLayout title="Legal & Company Info">
      <PageContent>
        <FormalCard header="Legal & Company Info">
          <div className="responsive-grid-2">
            {Object.entries(legalInfo).map(([key, value]) => (
              <div
                className={cn(
                  "border flex justify-between border-[#DDDDDD] p-4 rounded-md",
                )}
                key={key}
              >
                <div className="">
                  <h1 className="text-[#B0B0B0] font-nunito-semibold-italic">
                    {key}
                  </h1>
                  <h1 className="text-[#666666]">{value}</h1>
                </div>
              </div>
            ))}
          </div>
          <Space size={4} />
          <Button
            onClick={handleUpdateInfo}
            className="bg-brand hover:bg-brand/80 hover:text-white cursor-pointer text-white"
            type="button"
            variant="outline"
          >
            <HugeiconsIcon icon={Edit04Icon} />
            Update Info
          </Button>
        </FormalCard>
      </PageContent>
    </PageLayout>
  );
}

export default LegalCompanyInfo;
