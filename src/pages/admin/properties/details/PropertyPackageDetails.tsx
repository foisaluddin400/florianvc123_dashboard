import { useLocation } from "react-router-dom";
import FormalCard from "../../../../components/shared/cards/FormalCard";
import {
  PageContent,
  PageLayout,
} from "../../../../components/shared/PageLayout";

interface PropertyPackage {
  id: string;
  name: string;
  description?: string;
}

function PropertyPackageDetails() {
  const { state } = useLocation();

  const pkg = state?.pkg as PropertyPackage | undefined;

  if (!pkg) {
    return (
      <PageLayout title="Property Package Details">
        <PageContent>
          <FormalCard header="Property Package Details">
            <p>Package data not found.</p>
          </FormalCard>
        </PageContent>
      </PageLayout>
    );
  }

  return (
    <PageLayout title="The Wilds Project / Property Packages">
      <PageContent>
        <FormalCard header="Property Package Details">
          <div className="flex flex-col gap-4">
            <div>
              <h1 className="text-[#B0B0B0] font-nunito-semibold-italic text-sm">
                Package Title
              </h1>
              <h1 className="text-[#666666] font-medium">
                {pkg.name}
              </h1>
            </div>

            <div>
              <h1 className="text-[#B0B0B0] font-nunito-semibold-italic text-sm">
                Description
              </h1>
              <h1 className="text-[#666666] font-medium">
                {pkg.description}
              </h1>
            </div>
          </div>
        </FormalCard>
      </PageContent>
    </PageLayout>
  );
}

export default PropertyPackageDetails;