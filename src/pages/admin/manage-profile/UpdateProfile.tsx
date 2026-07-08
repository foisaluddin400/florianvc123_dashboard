"use client";

import { useEffect, useState } from "react";
import FormalCard from "../../../components/shared/cards/FormalCard";
import {
  PageContent,
  PageLayout,
} from "../../../components/shared/PageLayout";
import Space from "../../../components/shared/Space";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "../../../redux/services/profileApis";
import toast from "react-hot-toast";

interface UserProfile {
  profile_image: string;
  name: string;
  phone: string;
}

function UpdateProfile() {
  const { data: profiledata } = useGetProfileQuery();
  const [updateProfile, { isLoading }] =
    useUpdateProfileMutation();

  const [formData, setFormData] = useState<UserProfile>({
    profile_image:
      "https://krita-artists.org/uploads/default/original/3X/c/f/cfc4990e32f31acd695481944f2163e96ff7c6ba.jpeg",
    name: "",
    phone: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);

  // ✅ set data from API
  useEffect(() => {
    if (profiledata?.data) {
      const profileInfo = profiledata.data;

      setFormData({
        profile_image:
          profileInfo.profile_image ||
          "https://krita-artists.org/uploads/default/original/3X/c/f/cfc4990e32f31acd695481944f2163e96ff7c6ba.jpeg",
        name: profileInfo.name || "",
        phone: profileInfo.phone || "",
      });
    }
  }, [profiledata]);

  // ✅ input change
  const handleInputChange = (
    field: keyof UserProfile,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // ✅ image upload
  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);

    // preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        profile_image: reader.result as string,
      }));
    };
    reader.readAsDataURL(file);
  };

  // ✅ submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();

      // 🔥 text data
      formDataToSend.append("name", formData.name);
      formDataToSend.append("phone", formData.phone);

      // 🔥 image (if updated)
      if (imageFile) {
        formDataToSend.append("profile_image", imageFile);
      }

      const res = await updateProfile(formDataToSend).unwrap();

      if (res?.success) {
        toast.success(res.message || "Profile updated successfully");
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Update failed");
    }
  };

  return (
    <PageLayout title="Update profile">
      <PageContent>
        {/* Image */}
        <div className="mb-4">
          <div className="relative inline-block">
            <img
              src={formData.profile_image}
              alt="Profile"
              className="w-32 h-32 rounded-md object-cover cursor-pointer hover:opacity-80"
              onClick={() =>
                document
                  .getElementById("profile-image-input")
                  ?.click()
              }
            />

            <input
              id="profile-image-input"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />

            <div
              className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-md opacity-0 hover:opacity-100 cursor-pointer"
              onClick={() =>
                document
                  .getElementById("profile-image-input")
                  ?.click()
              }
            >
              <span className="text-white text-sm">
                Change Photo
              </span>
            </div>
          </div>
        </div>

        <FormalCard
          header={
            <div>
              <h1 className="text-lg text-[#666]">
                Update Profile
              </h1>
              <p className="text-sm text-[#B0B0B0]">
                Review and update your details.
              </p>
            </div>
          }
        >
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              {/* Name */}
              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-500">
                  Name
                </label>
                <Input
                  value={formData.name}
                  onChange={(e) =>
                    handleInputChange("name", e.target.value)
                  }
                />
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-500">
                  Phone
                </label>
                <Input
                  value={formData.phone}
                  onChange={(e) =>
                    handleInputChange("phone", e.target.value)
                  }
                />
              </div>
            </div>

            <Space size={4} />

            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Updating..." : "Save Changes"}
            </Button>
          </form>
        </FormalCard>
      </PageContent>
    </PageLayout>
  );
}

export default UpdateProfile;