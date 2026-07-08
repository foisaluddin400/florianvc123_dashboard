import { ImageAdd02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useRef, useState } from 'react'
import FormalCard from '../../../components/shared/cards/FormalCard'
import { PageContent, PageLayout } from '../../../components/shared/PageLayout'
import { Button } from '../../../components/ui/button'
import { Field, FieldLabel } from '../../../components/ui/field'
import { Input } from '../../../components/ui/input'

interface FormErrors {
  title?: string
  images?: string
}

function EditAndUpdateFiles() {
  const [title, setTitle] = useState('')
  const [images, setImages] = useState<string[]>([])
  const [errors, setErrors] = useState<FormErrors>({})
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const newImages: string[] = []
    Array.from(files).forEach(file => {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          newImages.push(event.target.result as string)
          if (newImages.length === files.length) {
            setImages(prev => [...prev, ...newImages])
            setErrors(prev => ({ ...prev, images: undefined }))
          }
        }
      }
      reader.readAsDataURL(file)
    })
  }

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index))
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!title.trim()) {
      newErrors.title = 'Title is required'
    }

    if (images.length === 0) {
      newErrors.images = 'At least one image is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (validateForm()) {
      // Convert base64 images back to File objects for logging
      const imageFiles: File[] = []
      images.forEach((base64, index) => {
        // Extract base64 data and convert to File
        const base64Data = base64.split(',')[1]
        const byteCharacters = atob(base64Data)
        const byteNumbers = new Array(byteCharacters.length)
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i)
        }
        const byteArray = new Uint8Array(byteNumbers)
        const blob = new Blob([byteArray], { type: 'image/jpeg' })
        const file = new File([blob], `image_${index + 1}.jpg`, { type: 'image/jpeg' })
        imageFiles.push(file)
      })

      // Console log the form data
      console.log('Property File Data:')
      console.log('file_title=', title)
      console.log('file_images=', imageFiles)
      console.log('Number of images:', imageFiles.length)

      // Show success message
      alert('Property file saved successfully!')

      // Reset form
      setTitle('')
      setImages([])
      setErrors({})
    } else {
      alert('Please fill in all required fields')
    }
  }

  return (
    <PageLayout title="Edit Property File">
      <PageContent>
        <FormalCard header={
          <div>
            <h1 className="text-lg text-[#666666] font-nunito-semibold-italic">
              Edit Property Files
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

          {/* Image Upload */}
          <Field>
            <FieldLabel className="text-base font-medium text-gray-600 block">Upload Images</FieldLabel>
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
                <HugeiconsIcon icon={ImageAdd02Icon} size={28} className="text-gray-400 group-hover:text-brand transition-colors" />
              </div>
              <span className="text-base text-gray-400 group-hover:text-brand/70 font-medium">Upload Images Here</span>
            </div>

            {/* Image Previews */}
            <div className="flex flex-wrap gap-5 mt-6">
              {images.map((img, idx) => (
                <div key={idx} className="relative group w-32 h-24 rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <img src={img} alt={`Preview ${idx}`} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <button
                    onClick={() => removeImage(idx)}
                    className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 shadow-lg"
                  >
                    <span className="text-white font-bold text-sm">×</span>
                  </button>
                </div>
              ))}
            </div>
          </Field>

          {/* Submit Button */}
          <div className="mt-8 flex justify-start">
            <Button
              onClick={handleSubmit}
              size="lg"
              className="bg-brand hover:bg-brand cursor-pointer px-8 py-3 text-base font-medium"
            >
              upload and save
            </Button>
          </div>
        </FormalCard>
      </PageContent>
    </PageLayout>
  )
}

export default EditAndUpdateFiles
