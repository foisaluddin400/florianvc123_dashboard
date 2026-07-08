import { useState, type ChangeEvent } from 'react'
import toast from 'react-hot-toast'
import FormalCard from '../../../../components/shared/cards/FormalCard'
import { PageContent, PageLayout } from '../../../../components/shared/PageLayout'
import { Button } from '../../../../components/ui/button'
import { Field, FieldLabel } from '../../../../components/ui/field'
import { Input } from '../../../../components/ui/input'
import { useLocation } from 'react-router-dom'
import { useCreatePropertyPackageMutation } from '../../../../redux/property/propertyApis'
import { Loader } from 'lucide-react'

const AddPropertyPackage = () => {
  const state = useLocation().state
  console.log(state)
  const propertyId = state?.id
  const [addPropertyPackage, { isLoading }] = useCreatePropertyPackageMutation()
  const [title, setTitle] = useState("")
  const [brief, setBrief] = useState("")
  const [errors, setErrors] = useState<any>({})

  const validateForm = () => {
    const newErrors: any = {}
    if (!title.trim()) newErrors.title = "Property package title is required"
    if (!brief.trim()) newErrors.brief = "Property package brief is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

const handleSavePost = async () => {
  if (!validateForm()) {
    toast.error("Please fill in all required fields")
    return
  }

  try {
    const formData = {
      name: title,     
      description: brief, 
      propertyId: propertyId
    }

    console.log("Sending Data:", formData)

    const res = await addPropertyPackage(formData).unwrap()

    console.log("Response:", res)

    toast.success(res?.message || "Property package added successfully")

    // optional: reset form
    setTitle("")
    setBrief("")

  } catch (error: any) {
    console.error("Error:", error)
    toast.error(error?.data?.message || "Something went wrong")
  }
}
  return (
    <PageLayout title="Add Property Package">
      <PageContent>
        <FormalCard header={
          <div>
            <h1 className="text-lg text-[#666666] font-nunito-semibold-italic">
              Add Property Package
            </h1>
            <p className="text-sm text-[#B0B0B0] font-nunito-semibold-italic">
              Add Property Package related Brief to the selected property.
            </p>
          </div>
        }>
          <div className="p-4 space-y-10">
            {/* Title Input */}
            <Field>
              <FieldLabel className="text-base font-medium text-gray-600 block">
                * Property Package Title
              </FieldLabel>
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter Property Package Title"
                className="h-14 bg-white border-gray-200 focus:ring-brand focus:border-brand px-6 text-base"
              />
            </Field>

            {/* Brief Textarea */}
            <Field>
              <FieldLabel className="text-base font-medium text-gray-600 block">
                * Property Package Brief
              </FieldLabel>
              {errors.brief && <p className="text-red-500 text-sm mt-1">{errors.brief}</p>}
              <textarea
                value={brief}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setBrief(e.target.value)}
                placeholder="Enter Property Package Brief"
                className="w-full min-h-30 bg-white border border-gray-200 focus:ring-brand focus:border-brand px-6 py-4 text-base rounded-lg resize-none focus:outline-none focus:ring-1"
              />
            </Field>

            <div className="pt-6">
              <Button
                onClick={handleSavePost}
                disabled={isLoading}
                className="bg-brand hover:opacity-90 text-white px-10 h-auto py-4 text-base font-semibold shadow-lg shadow-brand/20 transition-all active:scale-[0.98] cursor-pointer"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <Loader className="animate-spin w-5 h-5" />
                    Uploading...
                  </div>
                ) : (
                  "Upload and save"
                )}
              </Button>
            </div>
          </div>
        </FormalCard>
      </PageContent>
    </PageLayout>
  )
}

export default AddPropertyPackage