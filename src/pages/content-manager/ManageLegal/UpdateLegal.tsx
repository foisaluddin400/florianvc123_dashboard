import { AddSquareIcon, ImageAdd02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useEffect, useRef, useState } from "react";
import JoditComponent from "../../../components/shared/JoditComponent";
import { PageContent, PageLayout } from "../../../components/shared/PageLayout";
import { Button } from "../../../components/ui/button";
import { Field, FieldLabel } from "../../../components/ui/field";
import { Input } from "../../../components/ui/input";
import { useGetSingleLegalQuery, useUpdateLegalMutation } from "../../../redux/contentApi/legalApi/legapApi";
import { useNavigate, useParams } from "react-router-dom";
import { Loader, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

const UpdateLegal = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  

  const { data: singleLegal, isLoading: isFetching } = useGetSingleLegalQuery(id as string);
  const [updateLegal, { isLoading: isUpdating }] = useUpdateLegalMutation();

  const [content, setContent] = useState("");
  const [images, setImages] = useState<string[]>([]); 
  const [imageFiles, setImageFiles] = useState<File[]>([]); 
  const [title, setTitle] = useState("");
  const [goodToKnow, setGoodToKnow] = useState<string[]>([""]);
  const [errors, setErrors] = useState<any>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

 
  useEffect(() => {
    if (singleLegal?.data) {
      const data = singleLegal.data;
      setTitle(data.title || "");
      setContent(data.description || "");
      setGoodToKnow(data.goodToKnow?.length > 0 ? data.goodToKnow : [""]);
      setImages(data.images || []); 
    }
  }, [singleLegal]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
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

  const removeImage = (index: number) => {
    const imageToRemove = images[index];
    setImages((prev) => prev.filter((_, idx) => idx !== index));


    if (imageToRemove.startsWith("data:")) {
       
       setImageFiles((prev) => prev.filter((_, idx) => idx !== (prev.length - 1)));
    }
  };

  const handleGoodToKnowChange = (index: number, value: string) => {
    const newFields = [...goodToKnow];
    newFields[index] = value;
    setGoodToKnow(newFields);
  };

  const validateForm = () => {
    const newErrors: any = {};
    if (!title.trim()) newErrors.title = "Legal title is required";
    if (images.length === 0) newErrors.images = "At least one image is required";
    if (!content.trim()) newErrors.content = "Description is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleUpdatePost = async () => {
    if (validateForm()) {
      try {
        const formData = new FormData();
        const filteredGoodToKnow = goodToKnow.filter((item) => item.trim() !== "");

        const bodyData = {
          title: title,
          description: content,
          goodToKnow: filteredGoodToKnow,
         
          images: images.filter(img => img.startsWith('http')) 
        };

        
        formData.append("data", JSON.stringify(bodyData));

        
        imageFiles.forEach((file) => {
          formData.append("legal_update_images", file);
        });

        const res = await updateLegal({ id: id as string, data: formData }).unwrap();
        
        if (res.success) {
          toast.success("Legal update updated successfully!");
          navigate("/content-manager/manage-legal"); 
        }
      } catch (err: any) {
        toast.error(err?.data?.message || "Failed to update lifestyle");
      }
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
      <PageLayout title="Update Legal Update">
        <PageContent>
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="p-8 border-b border-gray-100">
              <h2 className="text-2xl font-semibold text-gray-800 italic font-nunito-semibold-italic">
                Update Legal Update
              </h2>
              <p className="text-sm text-gray-400 mt-1 italic">
                Edit Legal Update Details
              </p>
            </div>

            <div className="p-10 space-y-10">
              {/* Upload Images Section */}
              <Field>
                <FieldLabel className="text-base font-medium text-gray-600 block">* Upload Images</FieldLabel>
                {errors.images && <p className="text-red-500 text-sm mt-1">{errors.images}</p>}
                <input ref={fileInputRef} type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" />
                
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-200 rounded-2xl p-12 flex flex-col items-center justify-center gap-4 cursor-pointer hover:border-brand/40 hover:bg-brand/5 transition-all group"
                >
                  <div className="p-3 bg-gray-50 rounded-full group-hover:bg-brand/10 transition-colors">
                    <HugeiconsIcon icon={ImageAdd02Icon} size={28} className="text-gray-400 group-hover:text-brand" />
                  </div>
                  <span className="text-base text-gray-400 group-hover:text-brand/70 font-medium">Upload New Images</span>
                </div>

                <div className="flex flex-wrap gap-5 mt-6">
                  {images.map((img, idx) => (
                    <div key={idx} className="relative group w-32 h-24 rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                      <img src={img} alt={`Preview ${idx}`} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <button
                        type="button"
                        onClick={() => removeImage(idx)}
                        className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full cursor-pointer"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </Field>

              {/* Title Input */}
              <Field>
                <FieldLabel className="text-base font-medium text-gray-600 block">* Legal Update Title</FieldLabel>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter Market Update Title"
                  className="h-14 bg-white border-gray-200 focus:ring-brand focus:border-brand px-6 text-base"
                />
                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
              </Field>

              {/* Description Section */}
              <Field>
                <FieldLabel className="text-base font-medium text-gray-600 block">* Legal Update Description</FieldLabel>
                <JoditComponent content={content} setContent={setContent} />
                {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content}</p>}
              </Field>

              {/* Good to Know Section */}
              <div className="space-y-4">
                <FieldLabel className="text-base font-medium text-gray-600 block">Good to Know</FieldLabel>
                <div className="flex flex-col gap-3">
                   {goodToKnow.map((item, index) => (
                     <div key={index} className="flex items-center gap-2">
                        <Input 
                          value={item} 
                          onChange={(e) => handleGoodToKnowChange(index, e.target.value)} 
                          placeholder="Add specific point..." 
                          className="h-14 bg-white border-gray-200 flex-1"
                        />
                        {index === 0 ? (
                           <button type="button" onClick={() => setGoodToKnow([...goodToKnow, ""])} className="w-12 h-12 flex items-center justify-center bg-brand text-white rounded-md cursor-pointer">
                              <HugeiconsIcon size={20} icon={AddSquareIcon} />
                           </button>
                        ) : (
                           <button type="button" onClick={() => setGoodToKnow(goodToKnow.filter((_, i) => i !== index))} className="w-12 h-12 flex items-center justify-center bg-red-50 text-red-500 rounded-md cursor-pointer">
                              <Trash2 size={18} />
                           </button>
                        )}
                     </div>
                   ))}
                </div>
              </div>

              {/* Save Button */}
              <div className="pt-6">
                <Button 
                  onClick={handleUpdatePost}
                  disabled={isUpdating}
                  className="bg-brand hover:opacity-90 text-white px-10 h-auto py-4 text-base font-semibold shadow-lg shadow-brand/20 transition-all active:scale-[0.98] cursor-pointer"
                >
                  {isUpdating ? (
                    <div className="flex items-center gap-2">
                      <Loader className="animate-spin w-5 h-5" />
                      Updating...
                    </div>
                  ) : "Save Changes"}
                </Button>
              </div>
            </div>
          </div>
        </PageContent>
      </PageLayout>
    </div>
  );
};

export default UpdateLegal;