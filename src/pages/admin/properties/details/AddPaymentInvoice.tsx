import { Loader } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import FormalCard from "../../../../components/shared/cards/FormalCard";
import FileUpload from "../../../../components/shared/FileUpload/FileUpload";
import {
  PageContent,
  PageLayout,
} from "../../../../components/shared/PageLayout";
import { Button } from "../../../../components/ui/button";
import { Field, FieldLabel } from "../../../../components/ui/field";
import { Input } from "../../../../components/ui/input";
import { useCreatePaymentPlanMutation } from "../../../../redux/paymentApi/paymentApi";

interface FormErrors {
  title?: string;
  file?: string;
}

function AddPaymentInvoice() {
  const state = useLocation().state;
  const propertyId = state?.id ?? "";
  const [title, setTitle] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<FormErrors>({});

  const [createPaymentPlan, { isLoading }] = useCreatePaymentPlanMutation();

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!title.trim()) newErrors.title = "Payment plan title is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSavePost = async () => {
    if (!validateForm()) return;

    try {
      const formData = new FormData();
      const bodyData = { name: title, propertyId };
      formData.append("data", JSON.stringify(bodyData));
      if (files[0]) formData.append("payment_plan_file", files[0]);

      const response = await createPaymentPlan(formData).unwrap();

      if (response?.success) {
        toast.success(response?.message || "Payment plan added successfully!");
        setTitle("");
        setFiles([]);
        setErrors({});
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to add payment plan");
    }
  };

  if (!state?.id) {
    return (
      <div className="">
        <h1>Property not found</h1>
      </div>
    );
  }

  return (
    <PageLayout title="The Wilds Project / Payment Plan">
      <PageContent>
        <FormalCard
          header={
            <div>
              <h1 className="text-lg text-[#666666] font-nunito-semibold-italic">
                Add Payment Plan
              </h1>
              <p className="text-sm text-[#B0B0B0] font-nunito-semibold-italic">
                Create and manage Payment Plan for the selected property.
              </p>
            </div>
          }
        >
          <div className="p-4 space-y-8">
            {/* Title */}
            <Field>
              <FieldLabel className="text-base font-medium text-gray-600 block">
                Payment Plan Title
              </FieldLabel>
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
              )}
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter Payment Plan File Title"
                className="h-14 bg-white border-gray-200 focus:ring-brand focus:border-brand px-6 text-base"
              />
            </Field>

            {/* File Upload using shared component */}
            <Field>
              <FieldLabel className="text-base font-medium text-gray-600 block">
                Upload Payment Plan File
              </FieldLabel>
              <FileUpload
                value={files}
                onChange={setFiles}
                error={errors.file}
                accept=".pdf"
                multiple={false}
              />
            </Field>

            {/* Save Button */}
            <div className="pt-2">
              <Button
                onClick={handleSavePost}
                disabled={isLoading}
                className="bg-brand hover:opacity-90 text-white px-10 h-auto py-3 text-base font-semibold shadow-lg shadow-brand/20 transition-all active:scale-[0.98] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <Loader className="animate-spin w-5 h-5" />
                    Uploading...
                  </div>
                ) : (
                  "Upload And Save"
                )}
              </Button>
            </div>
          </div>
        </FormalCard>
      </PageContent>
    </PageLayout>
  );
}

export default AddPaymentInvoice;
