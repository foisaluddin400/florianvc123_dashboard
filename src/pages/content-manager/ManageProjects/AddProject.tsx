import { ImageAdd02Icon} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useRef, useState } from 'react'
import JoditComponent from '../../../components/shared/JoditComponent'
import { PageContent, PageLayout } from '../../../components/shared/PageLayout'
import { Button } from '../../../components/ui/button'
import { Field, FieldLabel } from '../../../components/ui/field'
import { Input } from '../../../components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { useAddManageProjectMutation } from '../../../redux/manageProjectapi/manageProjectApi'
import { Loader } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const AddProject = () => {
  const navigate = useNavigate();
  const [addManageProject, { isLoading }] = useAddManageProjectMutation()

  const [content, setContent] = useState('')
  const [images, setImages] = useState<string[]>([]) 
  const [imageFiles, setImageFiles] = useState<File[]>([]) 
  const [title, setTitle] = useState('')
  const [propertySize, setPropertySize] = useState('')
  const [numberOfRooms, setNumberOfRooms] = useState('')
  const [typeOfUse, setTypeOfUse] = useState('')
  const [propertyType, setPropertyType] = useState('') 
  const [propertyLocation, setPropertyLocation] = useState('')
  const [startingPrice, setStartingPrice] = useState('')
  const [paymentPlan, setPaymentPlan] = useState('')
  const [investmentOptions, setInvestmentOptions] = useState('')
  const [handoverYear, setHandoverYear] = useState('')
  
  const [errors, setErrors] = useState<any>({})
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

  const validateForm = () => {
    const newErrors: any = {}
    if (!title.trim()) newErrors.title = 'Project title is required'
    if (imageFiles.length === 0) newErrors.images = 'At least one image is required'
    if (!content.trim()) newErrors.content = 'Project description is required'
    if (!propertySize.trim()) newErrors.propertySize = 'Size is required'
    if (!typeOfUse.trim()) newErrors.typeOfUse = 'Type of use is required'
    if (!propertyType) newErrors.propertyType = 'Property type is required'
    if (!propertyLocation.trim()) newErrors.location = 'Location is required'
    
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
          typeOfUse: typeOfUse,
          propertySize: propertySize,
          totalRooms: Number(numberOfRooms) || 0,
          propertyType: propertyType, 
          startingPrice: startingPrice,
          paymentPlan: paymentPlan,
          investmentOption: investmentOptions,
          handoverYear: handoverYear,
          location: propertyLocation
        }

        formData.append("data", JSON.stringify(bodyData))

        imageFiles.forEach((file) => {
          formData.append("project_image", file)
        })

        const res = await addManageProject(formData).unwrap()

        if (res.success) {
          toast.success("Project added successfully!")
          navigate("/content-manager/manage-projects");
        }
      } catch (err: any) {
        toast.error(err?.data?.message || "Failed to add project. Please try again.");
      }
    } else {
      toast.error("Please fill in all required fields correctly");
    }
  }

  return (
    <div className="">
      <PageLayout title="Add new project">
        <PageContent>
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            {/* Form Header */}
            <div className="p-8 border-b border-gray-100">
              <h2 className="text-2xl font-semibold text-gray-800 italic font-nunito-semibold-italic">Add New Project</h2>
              <p className="text-sm text-gray-400 mt-1 italic">Create New Project Announcements</p>
            </div>

            <div className="p-10 space-y-10">
              {/* Upload Images Section */}
              <Field >
                <FieldLabel className="text-base font-medium text-gray-600 block">* Upload Property Images</FieldLabel>
                {errors.images && <p className="text-red-500 text-sm mt-1">{errors.images}</p>}
                <input ref={fileInputRef} type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" />
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-brand/50 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center gap-4 cursor-pointer hover:border-brand/40 hover:bg-brand/5 transition-all group"
                >
                  <div className="p-3 bg-gray-50 rounded-full group-hover:bg-brand/10 transition-colors">
                    <HugeiconsIcon icon={ImageAdd02Icon} size={28} className="text-gray-400 group-hover:text-brand" />
                  </div>
                  <span className="text-base text-gray-400 group-hover:text-brand/70 font-medium">Click to upload project images</span>
                </div>

                {/* Image Previews */}
                <div className="flex flex-wrap gap-5 mt-6">
                  {images.map((img, idx) => (
                    <div key={idx} className="relative group w-32 h-24 rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                      <img src={img} alt={`Preview ${idx}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeImage(idx)}
                        className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full cursor-pointer hover:bg-red-600"
                      >
                        <span className="text-white font-bold text-sm px-1">×</span>
                      </button>
                    </div>
                  ))}
                </div>
              </Field>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                {/* Title */}
                <Field >
                  <FieldLabel className="text-base font-medium text-gray-600 block">* New Project Title</FieldLabel>
                  <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter Project Title" className="h-14 bg-white border-gray-200" />
                  {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                </Field>

                {/* Property Size */}
                <Field >
                  <FieldLabel className="text-base font-medium text-gray-600 block">* Property Size</FieldLabel>
                  <Input value={propertySize} onChange={(e) => setPropertySize(e.target.value)} placeholder="e.g. 1250 sqft" className="h-14 bg-white border-gray-200" />
                  {errors.propertySize && <p className="text-red-500 text-sm mt-1">{errors.propertySize}</p>}
                </Field>

                {/* Number of Rooms */}
                <Field >
                  <FieldLabel className="text-base font-medium text-gray-600 block">Number of Rooms</FieldLabel>
                  <Input type="number" value={numberOfRooms} onChange={(e) => setNumberOfRooms(e.target.value)} placeholder="Enter number of rooms" className="h-14 bg-white border-gray-200" />
                </Field>

                {/* Type of Use */}
                <Field >
                  <FieldLabel className="text-base font-medium text-gray-600 block">* Type of Use</FieldLabel>
                  <Input value={typeOfUse} onChange={(e) => setTypeOfUse(e.target.value)} placeholder="e.g. Residential" className="h-14 bg-white border-gray-200" />
                  {errors.typeOfUse && <p className="text-red-500 text-sm mt-1">{errors.typeOfUse}</p>}
                </Field>

             
                <div className="w-full">
                  <FieldLabel className="text-base font-medium mb-3 text-gray-600 block">* Property Type</FieldLabel>
                  {errors.propertyType && <p className="text-red-500 text-sm mt-1">{errors.propertyType}</p>}
                  <Select value={propertyType} onValueChange={setPropertyType}>
                    <SelectTrigger className="w-full h-14 bg-white border-gray-200 px-6">
                      <SelectValue placeholder="Select Property Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="VILLAS">VILLAS</SelectItem>
                        <SelectItem value="RESTUARANT">RESTUARANT</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                {/* Property Location */}
                <Field >
                  <FieldLabel className="text-base font-medium text-gray-600 block">* Property Location</FieldLabel>
                  <Input value={propertyLocation} onChange={(e) => setPropertyLocation(e.target.value)} placeholder="Enter property location" className="h-14 bg-white border-gray-200" />
                  {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
                </Field>

                {/* Starting Price */}
                <Field >
                  <FieldLabel className="text-base font-medium text-gray-600 block">Starting Price</FieldLabel>
                  <Input value={startingPrice} onChange={(e) => setStartingPrice(e.target.value)} placeholder="e.g. 120000 USD" className="h-14 bg-white border-gray-200" />
                </Field>

                {/* Payment Plan */}
                <Field >
                  <FieldLabel className="text-base font-medium text-gray-600 block">Payment Plan</FieldLabel>
                  <Input value={paymentPlan} onChange={(e) => setPaymentPlan(e.target.value)} placeholder="Enter payment plan details" className="h-14 bg-white border-gray-200" />
                </Field>

                {/* Investment Options */}
                <Field >
                  <FieldLabel className="text-base font-medium text-gray-600 block">Investment Option</FieldLabel>
                  <Input value={investmentOptions} onChange={(e) => setInvestmentOptions(e.target.value)} placeholder="Enter investment option" className="h-14 bg-white border-gray-200" />
                </Field>

                {/* Handover Year */}
                <Field >
                  <FieldLabel className="text-base font-medium text-gray-600 block">Handover Year</FieldLabel>
                  <Input value={handoverYear} onChange={(e) => setHandoverYear(e.target.value)} placeholder="e.g. 2028" className="h-14 bg-white border-gray-200" />
                </Field>
              </div>

              {/* Project Description */}
              <Field >
                <FieldLabel className="text-base font-medium text-gray-600 block">* Project Description</FieldLabel>
                {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content}</p>}
                <JoditComponent content={content} setContent={setContent} />
              </Field>

              {/* Save Button */}
              <div className="pt-6">
                <Button
                  onClick={handleSavePost}
                  disabled={isLoading}
                  className="bg-brand hover:opacity-90 text-white px-10 h-auto py-4 text-base font-semibold shadow-lg shadow-brand/20 transition-all active:scale-[0.98] cursor-pointer"
                >
                  {isLoading ? (
                    <div className='flex items-center gap-2'>
                      <Loader className="animate-spin w-5 h-5" />
                      <span>Saving Property...</span>
                    </div>
                  ) : "Save Property"}
                </Button>
              </div>
            </div>
          </div>
        </PageContent>
      </PageLayout>
    </div>
  )
}
export default AddProject;