import { ImageAdd02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useRef, useState } from 'react'
import toast from 'react-hot-toast'
import FormalCard from '../../../../components/shared/cards/FormalCard'
import { PageContent, PageLayout } from '../../../../components/shared/PageLayout'
import { Button } from '../../../../components/ui/button'
import { Field, FieldLabel } from '../../../../components/ui/field'
import { Input } from '../../../../components/ui/input'
import { useLocation, useParams } from 'react-router-dom'
import { useGetSingleUPdatePropertyFileUpdateMutation } from '../../../../redux/property/propertyApis'


function EditSiteUpdate() {
  const { id } = useParams();
  const state = useLocation().state


  const [images, setImages] = useState<string[]>(
    state?.file_url ? [state.file_url] : []
  );
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [title, setTitle] = useState(state?.name ?? "");
  const [errors, setErrors] = useState<any>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [getSinglePropertyFileUpdate, { isLoading }] = useGetSingleUPdatePropertyFileUpdateMutation()

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

  const validateForm = () => {
    const newErrors: any = {};
    if (!title.trim()) newErrors.title = "Site update title is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSavePost = async () => {
    if (!validateForm()) return;

    try {
      const formData = new FormData();

      const bodyData = { name: title };
      formData.append("data", JSON.stringify(bodyData));

      imageFiles.forEach((file) => {
        formData.append("property_image", file);
      });

      // ✅ id from useParams, data = formData
      const response = await getSinglePropertyFileUpdate({ id, data: formData }).unwrap();

      if (response?.success) {
        toast.success(response?.message || "Site update saved successfully!");
        setTitle("");
        setImages([]);
        setImageFiles([]);
        setErrors({});
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update site update");
    }
  };

  return (
    <PageLayout title='Edit Site Updates'>
      <PageContent>
        <FormalCard header={
          <div>
            <h1 className="text-lg text-[#666666] font-nunito-semibold-italic">
              Edit Site Updates
            </h1>
            <p className="text-sm text-[#B0B0B0] font-nunito-semibold-italic">
              Edit and update Site Update images related to the selected property.
            </p>
          </div>
        }>
          <div className="p-4 space-y-10">
            {/* Title Input */}
            <Field>
              <FieldLabel className="text-base font-medium text-gray-600 block">
                * Site Update Title
              </FieldLabel>
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter Site Update Title"
                className="h-14 bg-white border-gray-200 focus:ring-brand focus:border-brand  px-6 text-base"
              />
            </Field>

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

            <div className="pt-6">
              <Button
                onClick={handleSavePost}
                disabled={isLoading}
                className="bg-brand hover:opacity-90 text-white px-10 h-auto py-4 text-base font-semibold shadow-lg shadow-brand/20 transition-all active:scale-[0.98] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Saving..." : "Upload and save"}
              </Button>
            </div>
          </div>
        </FormalCard>
      </PageContent>
    </PageLayout>
  )
}

export default EditSiteUpdate
