import { useState } from "react";
import { Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";
import FormalCard from "../../../components/shared/cards/FormalCard";
import { PageContent, PageLayout } from "../../../components/shared/PageLayout";
import { Input } from "../../../components/ui/input";
import { useAddContentManagerMutation } from "../../../redux/contentManager/contentManagerApi";
import toast from "react-hot-toast";

function AddContentManager() {
  const navigate = useNavigate();
  const [addContentManager, { isLoading }] = useAddContentManagerMutation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAddContentManager = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!formData.name || !formData.email || !formData.phone || !formData.password) {
      setError("Please fill in all the fields.");
      return;
    }

    try {
      const response = await addContentManager(formData).unwrap();

      console.log("manager content data===>",response);
      
      if (response.success) {
        toast.success(response.message || "Content Manager created successfully!");
        navigate("/admin/content-manager");
      }
    } catch (err: any) {
      const errorMessage = err?.data?.message || "Something went wrong. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <PageLayout title="Add Content Manager">
      <PageContent>
        <FormalCard
          header={
            <div>
              <h1 className="text-lg text-[#666666] font-nunito-semibold-italic">
                Content Manager
              </h1>
              <p className="text-sm text-[#B0B0B0] font-nunito-semibold-italic">
                Add a new content manager with necessary details.
              </p>
            </div>
          }
        >
          <div className="py-2">
            <form className="space-y-4" onSubmit={handleAddContentManager}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-gray-600 mb-2">
                    Full Name
                  </label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter full name"
                    className="placeholder-gray-300 px-4 py-3"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-2">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email address"
                    className="placeholder-gray-300 px-4 py-3"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-2">
                    Phone Number
                  </label>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    className="placeholder-gray-300 px-4 py-3"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-2">
                    Password
                  </label>
                  <Input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter temporary password"
                    className="placeholder-gray-300 px-4 py-3"
                  />
                </div>
              </div>

 
              {error && (
                <p className="text-sm text-red-500 font-medium">{error}</p>
              )}

              <div className="pt-2">
                <button
                  type="submit" 
                  disabled={isLoading}
                  className="inline-flex items-center justify-center rounded-md px-5 py-2.5 text-sm font-medium text-white cursor-pointer disabled:opacity-70 transition-all"
                  style={{
                    background:
                      "linear-gradient(180deg,#D1B07F 0%,#B08B4F 100%)",
                  }}
                >
                  {isLoading ? (
                    <>
                      <Loader className="animate-spin w-4 h-4 mr-2" />
                      Adding Manager...
                    </>
                  ) : (
                    "Add & Send Invitation"
                  )}
                </button>
              </div>
            </form>
          </div>
        </FormalCard>
      </PageContent>
    </PageLayout>
  );
}

export default AddContentManager;