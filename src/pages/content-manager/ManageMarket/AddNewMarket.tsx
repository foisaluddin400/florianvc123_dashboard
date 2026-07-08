"use client";

import { ImageAdd02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useRef, useState } from "react";
import JoditComponent from "../../../components/shared/JoditComponent";
import { PageContent, PageLayout } from "../../../components/shared/PageLayout";
import { Button } from "../../../components/ui/button";
import { Field, FieldLabel } from "../../../components/ui/field";
import { Input } from "../../../components/ui/input";
import { useAddManageMarketMutation } from "../../../redux/manageMarketApi/manageMarketApi";
import { Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";

type ErrorsType = {
  title?: string;
  images?: string;
  content?: string;
  lifestyleType?: string;
};

const AddNewMarket = () => {
  const navigate = useNavigate();
  const [addManageMarket, { isLoading }] =
    useAddManageMarketMutation();

  // ✅ States
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [lifestyleType, setLifestyleType] = useState<string>("");

  const [images, setImages] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const [errors, setErrors] = useState<ErrorsType>({});

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // ✅ Upload Image
  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (!files) return;

    const newFiles = Array.from(files);
    setImageFiles((prev) => [...prev, ...newFiles]);

    newFiles.forEach((file) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          setImages((prev) => [...prev, result]);
        };
        reader.readAsDataURL(file);
      }
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // ✅ Remove Image
  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  // ✅ Validation
  const validateForm = () => {
    const newErrors: ErrorsType = {};

    if (!title.trim()) newErrors.title = "Market title is required";
    if (imageFiles.length === 0)
      newErrors.images = "At least one image is required";
    if (!content.trim())
      newErrors.content = "Market description is required";
    if (!lifestyleType)
      newErrors.lifestyleType = "Lifestyle type is required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // ✅ Submit
  const handleSavePost = async () => {
    if (!validateForm()) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      const formData = new FormData();

      const bodyData = {
        title,
        description: content,
        type: lifestyleType,
      };

      formData.append("data", JSON.stringify(bodyData));

      imageFiles.forEach((file) => {
        formData.append("market_update_images", file);
      });

      const res = await addManageMarket(formData).unwrap();

      if (res?.success) {
        toast.success("Market update added successfully!");
        navigate("/content-manager/manage-markets");
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to add market update");
    }
  };

  return (
    <PageLayout title="Add Market Update">
      <PageContent>
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="p-8 border-b border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-800 italic">
              Add Market Update
            </h2>
            <p className="text-sm text-gray-400 mt-1 italic">
              Create Market Insights
            </p>
          </div>

          <div className="p-10 space-y-10">
            {/* Upload */}
            <Field>
              <FieldLabel>* Upload Images</FieldLabel>

              {errors.images && (
                <p className="text-red-500 text-sm">
                  {errors.images}
                </p>
              )}

              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />

              <div
                onClick={handleUploadClick}
                className="border-2 border-dashed p-8 text-center cursor-pointer"
              >
                <HugeiconsIcon icon={ImageAdd02Icon} size={28} />
                <p>Upload Images</p>
              </div>

              <div className="flex gap-3 mt-4 flex-wrap">
                {images.map((img, idx) => (
                  <div
                    key={idx}
                    className="relative w-24 h-20"
                  >
                    <img
                      src={img}
                      className="w-full h-full object-cover rounded"
                    />
                    <button
                      onClick={() => removeImage(idx)}
                      className="absolute top-0 right-0 bg-red-500 text-white px-1"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </Field>

            {/* Title */}
            <Field>
              <FieldLabel>* Title</FieldLabel>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              {errors.title && (
                <p className="text-red-500 text-sm">
                  {errors.title}
                </p>
              )}
            </Field>

            {/* Description */}
            <Field>
              <FieldLabel>* Description</FieldLabel>
              <JoditComponent
                content={content}
                setContent={setContent}
              />
              {errors.content && (
                <p className="text-red-500 text-sm">
                  {errors.content}
                </p>
              )}
            </Field>

            {/* Select */}
            <Field>
              <FieldLabel>* Lifestyle Type</FieldLabel>

              {errors.lifestyleType && (
                <p className="text-red-500 text-sm">
                  {errors.lifestyleType}
                </p>
              )}

              <Select
                value={lifestyleType}
                onValueChange={setLifestyleType}
              >
                <SelectTrigger className="w-full h-12">
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="MARKET_NEWS">
                      MARKET NEWS
                    </SelectItem>
                    <SelectItem value="PROPERTY_PRICE_UPDATES">
                      PROPERTY PRICE UPDATES
                    </SelectItem>
                    <SelectItem value="REGULATORY_AND_LEGAL_CHANGES">
                      REGULATORY & LEGAL
                    </SelectItem>
                    <SelectItem value="INVESTMENT_TRENDS_AND_DATA">
                      INVESTMENT TRENDS
                    </SelectItem>
                    <SelectItem value="ECONOMIC_UPDATES">
                      ECONOMIC UPDATES
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>

            {/* Submit */}
            <Button onClick={handleSavePost} disabled={isLoading}>
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Loader className="animate-spin w-4 h-4" />
                  Saving...
                </div>
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </div>
      </PageContent>
    </PageLayout>
  );
};

export default AddNewMarket;