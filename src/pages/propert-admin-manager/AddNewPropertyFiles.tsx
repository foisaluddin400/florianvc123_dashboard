import { useState } from 'react'
import { PageContent, PageLayout } from '../../components/shared/PageLayout'
import FormalCard from '../../components/shared/cards/FormalCard'
import { Field, FieldLabel } from '../../components/ui/field'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import FileUpload from '../../components/shared/FileUpload/FileUpload'
import { useCreatePropertyFileMutation } from '../../redux/property/propertyApis'
import toast from 'react-hot-toast'
import { Loader } from 'lucide-react'

interface FormErrors {
  title?: string
  images?: string
}

function AddNewPropertyFiles () {
  const [title, setTitle] = useState('')
  const [files, setFiles] = useState<File[]>([])
  const [errors, setErrors] = useState<FormErrors>({})
  
  const [createPropertyFile, { isLoading }] = useCreatePropertyFileMutation()

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!title.trim()) {
      newErrors.title = 'Title is required'
    }

    if (files.length === 0) {
      newErrors.images = 'At least one file is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      const formData = new FormData();
      
      files.forEach((file) => {
        formData.append('property_file', file);
      });
      
      const payloadData = {
        name: title,
        propertyId: "", 
      };
      
      formData.append('data', JSON.stringify(payloadData));

      const response = await createPropertyFile(formData).unwrap();
      console.log(response)

      if (response.success) {
        toast.success(response.message || 'Property file created successfully!');
        setTitle('');
        setFiles([]);
        setErrors({});
      }
    } catch (err: any) {
      toast.error(err?.data?.message || 'Something went wrong. Please try again.');
    }
  }

  return (
    <PageLayout title="Add Property File">
      <PageContent>
        <FormalCard header={
          <div>
            <h1 className="text-lg text-[#666666] font-nunito-semibold-italic">
              Add Property Files
            </h1>
            <p className="text-sm text-[#B0B0B0] font-nunito-semibold-italic">
              Upload and manage documents, images, and files related to selected property.
            </p>
          </div>
        }>
          {/* Title Input */}
          <Field className="mb-6">
            <FieldLabel className="text-base font-medium text-gray-600 block">File Title</FieldLabel>
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter file title"
              className="h-14 bg-white border-gray-200 focus:ring-brand focus:border-brand px-6 text-base"
            />
          </Field>

          {/* File Upload Component */}
          <Field>
            <FieldLabel className="text-base font-medium text-gray-600 block mb-2">Upload Files</FieldLabel>
            <FileUpload 
               value={files}
               onChange={setFiles}
               error={errors.images}
               accept="*/*"
               multiple={true}
            />
          </Field>

          {/* Submit Button */}
          <div className="mt-8 flex justify-start">
            <Button
              onClick={handleSubmit}
              disabled={isLoading}
              size="lg"
              className="bg-brand hover:bg-brand cursor-pointer px-8 py-3 text-base font-medium flex items-center justify-center transition-all"
            >
              {isLoading ? (
                <>
                  <Loader className="animate-spin w-5 h-5 mr-2" />
                  Uploading...
                </>
              ) : 'upload and save'}
            </Button>
          </div>
        </FormalCard>
      </PageContent>
    </PageLayout>
  )
}

export default AddNewPropertyFiles
