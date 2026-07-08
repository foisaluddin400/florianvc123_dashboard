import { AddSquareIcon, ImageAdd02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useEffect, useRef, useState } from "react";
import JoditComponent from "../../../components/shared/JoditComponent";
import { PageContent, PageLayout } from "../../../components/shared/PageLayout";
import { Button } from "../../../components/ui/button";
import { Field, FieldLabel } from "../../../components/ui/field";
import { Input } from "../../../components/ui/input";
import {
  Select,
  SelectContent,
  // SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Loader, Trash2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetSingleLifeStyleQuery, useUpdateLifeStyleMutation } from "../../../redux/contentApi/contentApi";
import toast from "react-hot-toast";

const UpdateLifeStyle = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: singleLifeStyle, isLoading: isFetching } = useGetSingleLifeStyleQuery(id as string);
  const [updateLifestyle, { isLoading: isUpdating }] = useUpdateLifeStyleMutation();

  const [content, setContent] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [title, setTitle] = useState("");
  const [lifestyleType, setLifestyleType] = useState("");
  const [rating, setRating] = useState("");
  const [location, setLocation] = useState("");
  const [officialSite, setOfficialSite] = useState("");
  const [goodToKnow, setGoodToKnow] = useState<string[]>([""]);
  const [errors, setErrors] = useState<any>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (singleLifeStyle?.data) {
      const data = singleLifeStyle.data;
      setTitle(data.title || "");
      setContent(data.description || "");
      setLifestyleType(data.type || "");
      setRating(data.rating?.toString() || "");
      setLocation(data.location || "");
      setOfficialSite(data.website || "");
      setGoodToKnow(data.goodToKnow?.length > 0 ? data.goodToKnow : [""]);
      setImages(data.images || []); 
    }
  }, [singleLifeStyle]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
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

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, idx) => idx !== index));
    setImageFiles((prev) => prev.filter((_, idx) => idx !== (index - (images.length - imageFiles.length))));
  };

  const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numericValue = value.replace(/[^0-9.]/g, "");
    if (numericValue === "" || (parseFloat(numericValue) >= 0 && parseFloat(numericValue) <= 5)) {
      setRating(numericValue);
    }
  };

  const handleGoodToKnowChange = (index: number, value: string) => {
    const newGoodToKnow = [...goodToKnow];
    newGoodToKnow[index] = value;
    setGoodToKnow(newGoodToKnow);
  };

  const addGoodToKnowField = () => {
    setGoodToKnow([...goodToKnow, ""]);
  };

  const removeGoodToKnowField = (index: number) => {
    setGoodToKnow(goodToKnow.filter((_, idx) => idx !== index));
  };

  const validateForm = () => {
    const newErrors: any = {};
    if (!title.trim()) newErrors.title = "Lifestyle title is required";
    if (images.length === 0) newErrors.images = "At least one image is required";
    if (!content.trim()) newErrors.content = "Lifestyle description is required";
    if (!lifestyleType) newErrors.lifestyleType = "Lifestyle type is required";
    if (!location.trim()) newErrors.location = "Lifestyle location is required";

    const urlPattern = /^(https?:\/\/)/;
    if (!officialSite.trim()) {
      newErrors.officialSite = "Official site is required";
    } else if (!urlPattern.test(officialSite)) {
      newErrors.officialSite = "URL must start with http:// or https://";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdatePost = async () => {
    if (validateForm()) {
      try {
        const formData = new FormData();
        const filteredGoodToKnow = goodToKnow.filter((item) => item.trim() !== "");


        const bodyData: any = {
          title: title,
          description: content,
          type: lifestyleType,
          website: officialSite,
          location: location,
          goodToKnow: filteredGoodToKnow,
          images: images.filter(img => img.startsWith('http')) 
        };


        if (rating !== "" && !isNaN(Number(rating))) {
          bodyData.rating = Number(rating);
        }

        formData.append("data", JSON.stringify(bodyData));

        imageFiles.forEach((file) => {
          formData.append("lifestyle_images", file);
        });

        const res = await updateLifestyle({ id: id as string, data: formData }).unwrap();
        
        if (res.success) {
          toast.success("Lifestyle updated successfully!");
          navigate("/content-manager/manage-lifestyles");
        }
      } catch (err: any) {
        toast.error(err?.data?.message || "Failed to update lifestyle");
      }
    } else {
      toast.error("Please fill in all required fields correctly");
    }
  };

  if (isFetching) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="animate-spin text-brand" size={40} />
      </div>
    );
  }

  return (
    <div className="">
      <PageLayout title="Update Lifestyle">
        <PageContent>
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="p-8 border-b border-gray-100">
              <h2 className="text-2xl font-semibold text-gray-800 italic font-nunito-semibold-italic">
                Update Lifestyle Details
              </h2>
            </div>

            <div className="p-4 space-y-10">
              {/* Upload Images Section */}
              <Field>
                <FieldLabel className="text-base font-medium text-gray-600 block">* Upload Images</FieldLabel>
                {errors.images && <p className="text-red-500 text-sm mt-1">{errors.images}</p>}
                <input ref={fileInputRef} type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" />
                <div onClick={() => fileInputRef.current?.click()} className="border-2 border-brand/50 rounded-2xl p-6 flex items-center justify-center gap-4 cursor-pointer hover:border-brand/40 hover:bg-brand/5 transition-all group">
                  <div className="p-3 bg-gray-50 rounded-full group-hover:bg-brand/10 transition-colors">
                    <HugeiconsIcon icon={ImageAdd02Icon} size={28} className="text-gray-400 group-hover:text-brand" />
                  </div>
                  <span className="text-base text-gray-400 group-hover:text-brand/70 font-medium">Upload New Images</span>
                </div>

                <div className="flex flex-wrap gap-5 mt-6">
                  {images.map((img, idx) => (
                    <div key={idx} className="relative group w-32 sm:w-40 md:w-48 h-24 sm:h-28 md:h-32 rounded-2xl overflow-hidden border border-gray-100">
                      <img src={img} alt={`Preview ${idx}`} className="w-full h-full object-cover" />
                      <button type="button" onClick={() => removeImage(idx)} className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 cursor-pointer">
                        <span className="text-white font-bold text-sm">×</span>
                      </button>
                    </div>
                  ))}
                </div>
              </Field>

              {/* Title Input */}
              <Field>
                <FieldLabel className="text-base font-medium text-gray-600 block">* Lifestyle Title</FieldLabel>
                <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter Lifestyle Title" className="h-14 bg-white border-gray-200 px-6" />
                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
              </Field>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                <div className="w-full h-full">
                  <FieldLabel className="text-base font-medium mb-3 text-gray-600 block">* Lifestyle Type</FieldLabel>
                  <Select value={lifestyleType} onValueChange={setLifestyleType}>
                    <SelectTrigger className="w-full h-14.5! bg-white border-gray-200 px-6">
                      <SelectValue placeholder="Select Lifestyle Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="HOTELS">HOTELS</SelectItem>
                      <SelectItem value="RESORTS">RESORTS</SelectItem>
                      <SelectItem value="BEACH_AND_WATERFRONT">BEACH AND WATERFRONT</SelectItem>
                      <SelectItem value="DINING_AND_CAFES">DINING AND CAFES</SelectItem>
                      <SelectItem value="SHOPPING_AND_ENTERTAINMENT">SHOPPING AND ENTERTAINMENT</SelectItem>
                      <SelectItem value="CITY_GUIDES">CITY GUIDES</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-full">
                   <FieldLabel className="text-base font-medium text-gray-600 block">Lifestyle Rating (Optional)</FieldLabel>
                   <Input value={rating} onChange={handleRatingChange} placeholder="Enter Lifestyle Rating (0-5)" className="h-14 bg-white border-gray-200 px-6" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                <div className="w-full">
                  <FieldLabel className="text-base font-medium text-gray-600 block">* Lifestyle Location</FieldLabel>
                  <Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Enter Lifestyle Location" className="h-14 bg-white border-gray-200 px-6" />
                </div>
                <div className="w-full">
                  <FieldLabel className="text-base font-medium text-gray-600 block">* Official site (with https://)</FieldLabel>
                  <Input value={officialSite} onChange={(e) => setOfficialSite(e.target.value)} placeholder="e.g. https://www.example.com" className="h-14 bg-white border-gray-200 px-6" />
                  {errors.officialSite && <p className="text-red-500 text-sm mt-1">{errors.officialSite}</p>}
                </div>
              </div>

              <Field>
                <FieldLabel className="text-base font-medium text-gray-600 block">* About Lifestyle</FieldLabel>
                <JoditComponent content={content} setContent={setContent} />
                {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content}</p>}
              </Field>

              {/* Good to Know */}
              <div>
                <FieldLabel className="text-base font-medium text-gray-600 block mb-3">* Good to Know</FieldLabel>
                <div className="flex flex-col gap-3 w-full">
                  {goodToKnow.map((item, index) => (
                    <div key={index} className="flex items-center gap-2 w-full">
                      <Input value={item} onChange={(e) => handleGoodToKnowChange(index, e.target.value)} placeholder="Feature..." className="h-14 bg-white w-full border-gray-200" />
                      {index === 0 ? (
                        <button type="button" onClick={addGoodToKnowField} className="w-12 h-12 flex items-center justify-center bg-brand text-white rounded-md cursor-pointer hover:bg-brand/90"><HugeiconsIcon size={20} icon={AddSquareIcon} /></button>
                      ) : (
                        <button type="button" onClick={() => removeGoodToKnowField(index)} className="w-12 h-12 flex items-center justify-center bg-red-50 text-red-500 rounded-md cursor-pointer hover:bg-red-100"><Trash2 size={20} /></button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6">
                <Button onClick={handleUpdatePost} disabled={isUpdating} className="bg-brand hover:opacity-90 text-white px-10 h-auto py-4 text-base font-semibold shadow-lg shadow-brand/20 transition-all active:scale-[0.98] cursor-pointer">
                  {isUpdating ? <div className="flex items-center gap-2"><Loader className="animate-spin w-5 h-5" />Updating...</div> : "Update Lifestyle"}
                </Button>
              </div>
            </div>
          </div>
        </PageContent>
      </PageLayout>
    </div>
  );
};

export default UpdateLifeStyle;