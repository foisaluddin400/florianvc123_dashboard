import { AddSquareIcon, ImageAdd02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Loader, Trash2 } from 'lucide-react'
import { useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import JoditComponent from '../../../components/shared/JoditComponent'
import { PageContent, PageLayout } from '../../../components/shared/PageLayout'
import { Button } from '../../../components/ui/button'
import { Field, FieldLabel } from '../../../components/ui/field'
import { Input } from '../../../components/ui/input'
import { useAddLegalMutation } from '../../../redux/contentApi/legalApi/legapApi'

const AddNewLegal = () => {
  const navigate = useNavigate()
  const [addLegal, { isLoading }] = useAddLegalMutation()

  const [content, setContent] = useState('')
  const [images, setImages] = useState<string[]>([])
  const [imageFiles, setImageFiles] = useState<File[]>([])
  const [title, setTitle] = useState('')
  const [goodToKnow, setGoodToKnow] = useState<string[]>([''])
  const [errors, setErrors] = useState<{ title?: string; images?: string; content?: string }>({})
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return

    const newFiles = Array.from(files)
    setImageFiles((prev) => [...prev, ...newFiles])

    newFiles.forEach((file) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const result = e.target?.result as string
          setImages((prev) => [...prev, result])
        }
        reader.readAsDataURL(file)
      }
    })

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, idx) => idx !== index))
    setImageFiles((prev) => prev.filter((_, idx) => idx !== index))
  }

  const handleGoodToKnowChange = (index: number, value: string) => {
    const newFields = [...goodToKnow]
    newFields[index] = value
    setGoodToKnow(newFields)
  }

  const addGoodToKnowField = () => setGoodToKnow([...goodToKnow, ''])
  const removeGoodToKnowField = (index: number) => {
    if (goodToKnow.length > 1) setGoodToKnow(goodToKnow.filter((_, idx) => idx !== index))
  }

  const validateForm = () => {
    const newErrors: any = {}
    if (!title.trim()) newErrors.title = 'Legal title is required'
    if (imageFiles.length === 0) newErrors.images = 'At least one image is required'
    if (!content.trim()) newErrors.content = 'Legal description is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSavePost = async () => {
    if (validateForm()) {
      try {
        const formData = new FormData()


        const bodyData = {
          title: title,
          description: content,
          goodToKnow: goodToKnow.filter(item => item.trim() !== "")
        }

        formData.append("data", JSON.stringify(bodyData))


        imageFiles.forEach((file) => {
          formData.append("legal_update_images", file)
        })

        const res = await addLegal(formData).unwrap()

        if (res.success) {
          toast.success("Legal update added successfully!")
          navigate("/content-manager/manage-legal")
        }
      } catch (err: any) {
        toast.error(err?.data?.message || "Failed to save post")
      }
    } else {
      toast.error("Please fill in all required fields")
    }
  }

  return (
    <div className="">
      <PageLayout title="Add Legal Update">
        <PageContent>
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="p-8 border-b border-gray-100">
              <h2 className="text-2xl font-semibold text-gray-800 italic font-nunito-semibold-italic">Add Legal Update</h2>
              <p className="text-sm text-gray-400 mt-1 italic">Create Legal Insights</p>
            </div>

            <div className="p-10 space-y-10">
              {/* Upload Images */}
              <Field>
                <FieldLabel className="text-base font-medium text-gray-600 block">* Upload Images</FieldLabel>
                {errors.images && <p className="text-red-500 text-sm mt-1">{errors.images}</p>}
                <input ref={fileInputRef} type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" />
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-brand/50 rounded-2xl p-6 flex items-center justify-center gap-4 cursor-pointer hover:border-brand/40 hover:bg-brand/5 transition-all group"
                >
                  <div className="p-3 bg-gray-50 rounded-full group-hover:bg-brand/10 transition-colors">
                    <HugeiconsIcon icon={ImageAdd02Icon} size={28} className="text-gray-400 group-hover:text-brand" />
                  </div>
                  <span className="text-base text-gray-400 group-hover:text-brand/70 font-medium">Upload Images Here</span>
                </div>

                <div className="flex flex-wrap gap-5 mt-6">
                  {images.map((img, idx) => (
                    <div key={idx} className="relative group w-32 h-24 rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                      <img src={img} alt={`Preview ${idx}`} className="w-full h-full object-cover" />
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

              {/* Title */}
              <Field>
                <FieldLabel className="text-base font-medium text-gray-600 block">* Legal Update Title</FieldLabel>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter Legal Update Title"
                  className="h-14 bg-white border-gray-200 focus:ring-brand focus:border-brand px-6 text-base"
                />
                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
              </Field>

              {/* Description */}
              <Field>
                <FieldLabel className="text-base font-medium text-gray-600 block">* Legal Update Description</FieldLabel>
                <JoditComponent content={content} setContent={setContent} />
                {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content}</p>}
              </Field>

              {/* Good to Know Section (As per Postman) */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <FieldLabel className="text-base font-medium text-gray-600 block">Good to Know</FieldLabel>
                </div>
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
                        <button type="button" onClick={addGoodToKnowField} className="w-12 h-12 flex items-center justify-center bg-brand text-white rounded-md cursor-pointer hover:bg-brand/90">
                          <HugeiconsIcon size={20} icon={AddSquareIcon} />
                        </button>
                      ) : (
                        <button type="button" onClick={() => removeGoodToKnowField(index)} className="w-12 h-12 flex items-center justify-center bg-red-50 text-red-500 rounded-md cursor-pointer hover:bg-red-100">
                          <Trash2 size={20} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Save Button */}
              <div className="pt-6">
                <Button
                  onClick={handleSavePost}
                  disabled={isLoading}
                  className="bg-brand hover:opacity-90 hover:bg-brand text-white px-10 h-auto py-4 text-base font-semibold shadow-lg shadow-brand/20 transition-all active:scale-[0.98] cursor-pointer"
                >
                  {isLoading ? (
                    <div className='flex items-center gap-2'>
                      <Loader className="animate-spin w-5 h-5" />
                      Saving...
                    </div>
                  ) : "Save The Post"}
                </Button>
              </div>
            </div>
          </div>
        </PageContent>
      </PageLayout>
    </div>
  )
}

export default AddNewLegal