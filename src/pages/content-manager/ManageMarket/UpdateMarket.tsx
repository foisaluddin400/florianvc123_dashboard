"use client";

import { ImageAdd02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useEffect, useRef, useState } from "react";
import JoditComponent from "../../../components/shared/JoditComponent";
import { PageContent, PageLayout } from "../../../components/shared/PageLayout";
import { Button } from "../../../components/ui/button";
import { Field, FieldLabel } from "../../../components/ui/field";
import { Input } from "../../../components/ui/input";
import {
  useGetSingleManageMarketQuery,
  useUpdateManageMarketMutation,
} from "../../../redux/manageMarketApi/manageMarketApi";
import { useNavigate, useParams } from "react-router-dom";
import { Loader, Trash2 } from "lucide-react";
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

const UpdateMarket = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: singleMarket, isLoading: isFetching } =
    useGetSingleManageMarketQuery(id as string);

  const [updateMarket, { isLoading: isUpdating }] =
    useUpdateManageMarketMutation();

  // ✅ State
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [lifestyleType, setLifestyleType] = useState<string>("");

  const [images, setImages] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const [errors, setErrors] = useState<ErrorsType>({});

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // ✅ Set data from API
  useEffect(() => {
    if (singleMarket?.data) {
      const data = singleMarket.data;
      setTitle(data.title || "");
      setContent(data.description || "");
      setImages(data.images || []);
      setLifestyleType(data.type || ""); // 🔥 IMPORTANT
    }
  }, [singleMarket]);

  // ✅ Upload
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
          setImages((prev) => [...prev, e.target?.result as string]);
        };
        reader.readAsDataURL(file);
      }
    });

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // ✅ Remove Image (fixed)
  const removeImage = (index: number) => {
    const removed = images[index];

    setImages((prev) => prev.filter((_, i) => i !== index));

    // only remove file if it's newly added (base64)
    if (removed.startsWith("data:")) {
      setImageFiles((prev) => prev.slice(0, -1));
    }
  };

  // ✅ Validation
  const validateForm = () => {
    const newErrors: ErrorsType = {};

    if (!title.trim()) newErrors.title = "Market title is required";
    if (images.length === 0)
      newErrors.images = "At least one image is required";
    if (!content.trim())
      newErrors.content = "Market description is required";
    if (!lifestyleType)
      newErrors.lifestyleType = "Lifestyle type is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Submit
  const handleUpdatePost = async () => {
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
        images: images.filter((img) => img.startsWith("http")), // old images
      };

      formData.append("data", JSON.stringify(bodyData));

      imageFiles.forEach((file) => {
        formData.append("market_update_images", file);
      });

      const res = await updateMarket({
        id: id as string,
        data: formData,
      }).unwrap();

      if (res?.success) {
        toast.success("Market update updated successfully!");
        navigate("/content-manager/manage-markets");
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update");
    }
  };

  // ✅ Loading
  if (isFetching) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="animate-spin text-brand" size={40} />
      </div>
    );
  }

  return (
    <PageLayout title="Update Market Update">
      <PageContent>
        <div className="bg-white rounded-2xl border overflow-hidden">
          {/* Header */}
          <div className="p-8 border-b">
            <h2 className="text-2xl font-semibold italic">
              Update Market Update
            </h2>
          </div>

          <div className="p-10 space-y-10">
            {/* Upload */}
            <Field>
              <FieldLabel>* Upload Images</FieldLabel>
              {errors.images && (
                <p className="text-red-500 text-sm">{errors.images}</p>
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
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed p-10 text-center cursor-pointer"
              >
                <HugeiconsIcon icon={ImageAdd02Icon} size={28} />
                <p>Upload Images</p>
              </div>

              <div className="flex flex-wrap gap-4 mt-4">
                {images.map((img, idx) => (
                  <div key={idx} className="relative w-28 h-20">
                    <img
                      src={img}
                      className="w-full h-full object-cover rounded"
                    />
                    <button
                      onClick={() => removeImage(idx)}
                      className="absolute top-0 right-0 bg-red-500 text-white p-1"
                    >
                      <Trash2 size={12} />
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
                <p className="text-red-500 text-sm">{errors.title}</p>
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
                <p className="text-red-500 text-sm">{errors.content}</p>
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

            {/* Button */}
            <Button onClick={handleUpdatePost} disabled={isUpdating}>
              {isUpdating ? (
                <>
                  <Loader className="animate-spin w-4 h-4 mr-2" />
                  Updating...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </div>
      </PageContent>
    </PageLayout>
  );
};

export default UpdateMarket;