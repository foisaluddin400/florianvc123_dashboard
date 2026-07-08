import { useLocation, useNavigate } from 'react-router-dom';
import FormalCard from '../../../components/shared/cards/FormalCard';
import { PageContent, PageLayout } from '../../../components/shared/PageLayout';
import Space from '../../../components/shared/Space';
import { cn } from '../../../lib/utils';

const ManageContentProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const manager = location.state?.managerData;
  const userAuth = location.state?.userAuthData;


  if (!manager) {
    return (
      <PageLayout title='Manager Details'>
        <PageContent>
          <div className="p-10 text-center text-gray-500">
            No manager data found. Please go back and try again.
            <br />
            <button 
              onClick={() => navigate(-1)} 
              className="mt-4 text-brand underline cursor-pointer"
            >
              Go Back
            </button>
          </div>
        </PageContent>
      </PageLayout>
    );
  }

 
  const fullName = manager?.name || "N/A";
  const email = manager?.email || "N/A";
  const phone = manager?.phone || "N/A";
  const isActive = userAuth?.isActive ?? true; 
  const status = isActive ? "Active" : "Blocked";
  const profileImage = manager?.profile_image;
  const firstLetter = fullName.trim().charAt(0).toUpperCase();

  return (
    <PageLayout title='Manager Details'>
      <PageContent>
        <div className="w-32 h-32 mb-6">
          {profileImage ? (
            <img
              src={profileImage}
              alt={fullName}
              className="w-full h-full rounded-lg object-cover border"
            />
          ) : (
            <div className="w-full h-full rounded-lg bg-brand/10 text-brand flex items-center justify-center text-4xl font-bold border border-brand/20 rounded-xl">
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
              <h1 className="text-[#666666] font-medium">{fullName}</h1>
            </div>
            <div>
              <h1 className="text-[#B0B0B0] font-nunito-semibold-italic text-sm">
                Email
              </h1>
              <h1 className="text-[#666666] font-medium">{email}</h1>
            </div>
            <div>
              <h1 className="text-[#B0B0B0] font-nunito-semibold-italic text-sm">
                Contact Phone
              </h1>
              <h1 className="text-[#666666] font-medium">{phone}</h1>
            </div>
            <div>
              <h1 className="text-[#B0B0B0] font-nunito-semibold-italic text-sm">
                Status
              </h1>
              <h1
                className={cn(
                  "font-semibold",
                  isActive ? "text-green-600" : "text-red-600"
                )}
              >
                {status}
              </h1>
            </div>
          </div>
          <Space size={4} />
        </FormalCard>
      </PageContent>
    </PageLayout>
  );
};

export default ManageContentProfile;