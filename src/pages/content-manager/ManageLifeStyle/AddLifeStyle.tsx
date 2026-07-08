import { AddSquareIcon, ImageAdd02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useRef, useState } from "react";
import JoditComponent from "../../../components/shared/JoditComponent";
import { PageContent, PageLayout } from "../../../components/shared/PageLayout";
import { Button } from "../../../components/ui/button";
import { Field, FieldLabel } from "../../../components/ui/field";
import { Input } from "../../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Loader, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAddLifestyleMutation } from "../../../redux/contentApi/contentApi";
import toast from "react-hot-toast";


const AddLifeStyle = () => {
  const navigate = useNavigate();
  const [addLifestyle, { isLoading }] = useAddLifestyleMutation();

  const [content, setContent] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [title, setTitle] = useState("");
  const [lifestyleType, setLifestyleType] = useState("");
  // const [rating, setRating] = useState("");
  const [location, setLocation] = useState("");
  const [officialSite, setOfficialSite] = useState("");
  const [goodToKnow, setGoodToKnow] = useState<string[]>([""]);
  const [errors, setErrors] = useState<any>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    setImageFiles((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  // const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.value;
  //   const numericValue = value.replace(/[^0-9.]/g, "");
  //   const parts = numericValue.split(".");
  //   if (parts.length > 2) return;

  //   const numValue = parseFloat(numericValue);
  //   if (numericValue === "" || (numValue >= 0 && numValue <= 5)) {
  //     setRating(numericValue);
  //   }
  // };

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
    if (imageFiles.length === 0) newErrors.images = "At least one image is required";
    if (!content.trim()) newErrors.content = "Lifestyle description is required";
    if (!lifestyleType) newErrors.lifestyleType = "Lifestyle type is required";
    // if (!rating.trim()) newErrors.rating = "Lifestyle rating is required";
    if (!location.trim()) newErrors.location = "Lifestyle location is required";

    const urlPattern = new RegExp('^(https?:\\/\\/)?' +
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
      '((\\d{1,3}\\.){3}\\d{1,3}))' +
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
      '(\\?[;&a-z\\d%_.~+=-]*)?' +
      '(\\#[-a-z\\d%_.~+ Barb]*)?$', 'i');

    if (!officialSite.trim()) {
      newErrors.officialSite = "Official site is required";
    } else if (!urlPattern.test(officialSite)) {
      newErrors.officialSite = "Please enter a valid URL (e.g. https://example.com)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSavePost = async () => {
    if (validateForm()) {
      try {
        const formData = new FormData();
        const filteredGoodToKnow = goodToKnow.filter((item) => item.trim() !== "");

        const bodyData = {
          title: title,
          description: content,
          type: lifestyleType,
          website: officialSite,
          location: location,
          goodToKnow: filteredGoodToKnow,
          // rating: Number(rating),
        };

        formData.append("data", JSON.stringify(bodyData));

        imageFiles.forEach((file) => {
          formData.append("lifestyle_images", file);
        });

        const res = await addLifestyle(formData).unwrap();

        if (res.success) {
          toast.success("Lifestyle added successfully!");
          navigate("/content-manager/manage-lifestyles");
        }
      } catch (err: any) {
        toast.error(err?.data?.message || "Failed to add lifestyle");
      }
    } else {
      toast.error("Please fill in all required fields correctly");
    }
  };

  return (
    <div className="">
      <PageLayout title="Add Lifestyle Update">
        <PageContent>
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="p-8 border-b border-gray-100">
              <h2 className="text-2xl font-semibold text-gray-800 italic font-nunito-semibold-italic">
                Add LifeStyle Details
              </h2>
              <p className="text-sm text-gray-400 mt-1 italic">
                Create Lifestyle Details
              </p>
            </div>

            <div className="p-4 space-y-10">
              {/* Upload Images Section */}
              <Field>
                <FieldLabel className="text-base font-medium text-gray-600 block">
                  * Upload Images
                </FieldLabel>
                {errors.images && <p className="text-red-500 text-sm mt-1">{errors.images}</p>}
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
                  className="border-2 border-brand/50 rounded-2xl p-6 flex items-center justify-center gap-4 cursor-pointer hover:border-brand/40 hover:bg-brand/5 transition-all group"
                >
                  <div className="p-3 bg-gray-50 rounded-full group-hover:bg-brand/10 transition-colors">
                    <HugeiconsIcon
                      icon={ImageAdd02Icon}
                      size={28}
                      className="text-gray-400 group-hover:text-brand transition-colors"
                    />
                  </div>
                  <span className="text-base text-gray-400 group-hover:text-brand/70 font-medium">
                    Upload Images Here
                  </span>
                </div>

                <div className="flex flex-wrap gap-5 mt-6">
                  {images.map((img, idx) => (
                    <div
                      key={idx}
                      className="relative group w-32 sm:w-40 md:w-48 h-24 sm:h-28 md:h-32 rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <img
                        src={img}
                        alt={`Preview ${idx}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <button
                        type="button"
                        onClick={() => removeImage(idx)}
                        className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 shadow-lg cursor-pointer"
                      >
                        <span className="text-white font-bold text-sm">×</span>
                      </button>
                    </div>
                  ))}
                </div>
              </Field>

              {/* Title Input */}
              <Field>
                <FieldLabel className="text-base font-medium text-gray-600 block">
                  * Lifestyle Title
                </FieldLabel>
                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter Lifestyle Title"
                  className="h-14 bg-white border-gray-200 focus:ring-brand focus:border-brand  px-6 text-base"
                />
              </Field>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                <div className="w-full h-full">
                  <FieldLabel className="text-base font-medium mb-3 text-gray-600 block">
                    * Lifestyle Type
                  </FieldLabel>
                  {errors.lifestyleType && <p className="text-red-500 text-sm mt-1">{errors.lifestyleType}</p>}
                  <Select value={lifestyleType} onValueChange={setLifestyleType}>
                    <SelectTrigger className="w-full h-14.5! bg-white border-gray-200 px-6 flex items-center">
                      <SelectValue placeholder="Select Lifestyle Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="HOTELS">HOTELS</SelectItem>
                        <SelectItem value="RESORTS">RESORTS</SelectItem>
                        <SelectItem value="BEACH_AND_WATERFRONT">BEACH AND WATERFRONT</SelectItem>
                        <SelectItem value="DINING_AND_CAFES">DINING AND CAFES</SelectItem>
                        <SelectItem value="SHOPPING_AND_ENTERTAINMENT">SHOPPING AND ENTERTAINMENT</SelectItem>
                        <SelectItem value="CITY_GUIDES">CITY GUIDES</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-full">
                  <Field>
                    <FieldLabel className="text-base font-medium text-gray-600 block">
                      * Lifestyle Rating
                    </FieldLabel>
                    {errors.rating && <p className="text-red-500 text-sm mt-1">{errors.rating}</p>}
                    <Input
                      // value={rating}
                      // onChange={handleRatingChange}
                      placeholder="Enter Lifestyle Rating (0-5)"
                      className="h-14 bg-white border-gray-200 focus:ring-brand focus:border-brand  px-6 text-base"
                    />
                  </Field>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                <div className="w-full">
                  <Field>
                    <FieldLabel className="text-base font-medium text-gray-600 block">
                      * Lifestyle Location
                    </FieldLabel>
                    {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
                    <Input
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Enter Lifestyle Location "
                      className="h-14 bg-white border-gray-200 focus:ring-brand focus:border-brand  px-6 text-base"
                    />
                  </Field>
                </div>
                <div className="w-full">
                  <Field>
                    <FieldLabel className="text-base font-medium text-gray-600 block">
                      * Official site (with https://)
                    </FieldLabel>
                    {errors.officialSite && <p className="text-red-500 text-sm mt-1">{errors.officialSite}</p>}
                    <Input
                      value={officialSite}
                      onChange={(e) => setOfficialSite(e.target.value)}
                      placeholder="e.g. https://www.example.com"
                      className="h-14 bg-white border-gray-200 focus:ring-brand focus:border-brand  px-6 text-base"
                    />
                  </Field>
                </div>
              </div>

              <Field>
                <FieldLabel className="text-base font-medium text-gray-600 block">
                  * About Lifestyle{" "}
                </FieldLabel>
                {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content}</p>}
                <div>
                  <JoditComponent content={content} setContent={setContent} />
                </div>
              </Field>

              {/* Good to Know Section - Updated Logic */}
              <div>
                <div className="w-full">
                  <Field>
                    <FieldLabel className="text-base font-medium text-gray-600 block mb-3">
                      * Good to Know
                    </FieldLabel>
                    <div className="flex flex-col gap-3 w-full">
                      {goodToKnow.map((item, index) => (
                        <div key={index} className="flex items-center gap-2 w-full">
                          <div className="w-full">
                            <Input
                              value={item}
                              onChange={(e) => handleGoodToKnowChange(index, e.target.value)}
                              placeholder="Add specific feature or point..."
                              className="h-14 bg-white w-full border-gray-200 focus:ring-brand focus:border-brand px-6 text-base"
                            />
                          </div>

                          {index === 0 ? (
                            
                            <button
                              type="button"
                              onClick={addGoodToKnowField}
                              className="w-12 h-12 flex items-center justify-center bg-brand text-white rounded-md cursor-pointer hover:bg-brand/90 transition-colors"
                              title="Add Field"
                            >
                              <HugeiconsIcon size={20} icon={AddSquareIcon} />
                            </button>
                          ) : (
                           
                            <button
                              type="button"
                              onClick={() => removeGoodToKnowField(index)}
                              className="w-12 h-12 flex items-center justify-center bg-red-50 text-red-500 rounded-md cursor-pointer hover:bg-red-100 transition-colors"
                              title="Delete Field"
                            >
                              <Trash2 size={20} />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </Field>
                </div>
              </div>

              <div className="pt-6">
                <Button
                  onClick={handleSavePost}
                  disabled={isLoading}
                  className="bg-brand hover:opacity-90 text-white px-10  h-auto py-4 text-base font-semibold shadow-lg shadow-brand/20 transition-all active:scale-[0.98] cursor-pointer"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <Loader className="animate-spin w-5 h-5" />
                      Adding...
                    </div>
                  ) : (
                    "Add Lifestyle"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </PageContent>
      </PageLayout>
    </div>
  );
};

export default AddLifeStyle;