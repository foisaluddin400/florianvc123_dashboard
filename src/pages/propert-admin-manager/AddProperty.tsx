import React, { useState } from 'react'
import { PageContent, PageLayout } from '../../components/shared/PageLayout'
import FormalCard from '../../components/shared/cards/FormalCard'
import { Field, FieldLabel } from '../../components/ui/field'
import { Input } from '../../components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select"
import FileUpload from '../../components/shared/FileUpload/FileUpload'
import { useCreatePropertyMutation } from '../../redux/property/propertyApis'
import toast from 'react-hot-toast'
import { Loader } from 'lucide-react'

const AddProperty = () => {
  const [files, setFiles] = useState<File[]>([])
  
  // State for form fields
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    size: '',
    rooms: '',
    status: '',
    paymentPlan: '',
    totalUnits: '',
    location: ''
  })
  
  const [createProperty, { isLoading }] = useCreatePropertyMutation()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleStatusChange = (value: string) => {
    setFormData(prev => ({ ...prev, status: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Basic validation
    if (!formData.name) {
      toast.error('Property Name is required');
      return;
    }

    try {
      const submitData = new FormData();
      
      files.forEach(file => {
        submitData.append('property_image', file);
      });
      
      const payloadData = {
        name: formData.name,
        type: formData.type,
        size: formData.size,
        totalRooms: formData.rooms ? Number(formData.rooms) : undefined,
        status: formData.status ? formData.status.toUpperCase() : undefined,
        paymentPlan: formData.paymentPlan,
        units: formData.totalUnits ? Number(formData.totalUnits) : undefined,
        address: formData.location
      };
      
      submitData.append('data', JSON.stringify(payloadData));

      const response = await createProperty(submitData).unwrap();

      if (response.success) {
        toast.success(response.message || 'Property created successfully!');
        setFormData({
          name: '',
          type: '',
          size: '',
          rooms: '',
          status: '',
          paymentPlan: '',
          totalUnits: '',
          location: ''
        });
        setFiles([]);
      }
    } catch (err: any) {
      toast.error(err?.data?.message || 'Something went wrong. Please try again.');
    }
  }

  return (
    <PageLayout title="Add New Property">
      <PageContent>
        <FormalCard header={
          <div>
            <h1 className="text-lg text-[#666666] font-nunito-semibold-italic">
              Add or Update Property
            </h1>
            <p className="text-sm text-[#B0B0B0] font-nunito-semibold-italic mt-1">
              Create or update and manage property details for the selected project.
            </p>
          </div>
        }>
          <form onSubmit={handleSubmit} className="mt-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Upload Property Images - Full Width */}
              <div className="col-span-1 md:col-span-2 mb-2">
                <FieldLabel className="text-base font-medium text-gray-500 block mb-2">Upload Property Images</FieldLabel>
                <FileUpload 
                  value={files}
                  onChange={setFiles}
                  accept="image/*"
                  multiple={true}
                />
              </div>

              {/* Property Name */}
              <Field>
                <FieldLabel className="text-sm font-medium text-gray-500 block mb-2">Property Name</FieldLabel>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter property name"
                  className="h-12 bg-white border-gray-200 focus:ring-brand focus:border-brand px-4 text-sm w-full"
                />
              </Field>

              {/* Property Type */}
              <Field>
                <FieldLabel className="text-sm font-medium text-gray-500 block mb-2">Property Type</FieldLabel>
                <Input
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  placeholder="Enter Property Type"
                  className="h-12 bg-white border-gray-200 focus:ring-brand focus:border-brand px-4 text-sm w-full"
                />
              </Field>

              {/* Property Size */}
              <Field>
                <FieldLabel className="text-sm font-medium text-gray-500 block mb-2">Property Size</FieldLabel>
                <Input
                  name="size"
                  value={formData.size}
                  onChange={handleChange}
                  placeholder="Enter Property Size"
                  className="h-12 bg-white border-gray-200 focus:ring-brand focus:border-brand px-4 text-sm w-full"
                />
              </Field>

              {/* Rooms */}
              <Field>
                <FieldLabel className="text-sm font-medium text-gray-500 block mb-2">Rooms</FieldLabel>
                <Input
                  name="rooms"
                  type="number"
                  value={formData.rooms}
                  onChange={handleChange}
                  placeholder="Enter number of rooms"
                  className="h-12 bg-white border-gray-200 focus:ring-brand focus:border-brand px-4 text-sm w-full"
                />
              </Field>

              {/* Project Status */}
              <Field>
                <FieldLabel className="text-sm font-medium text-gray-500 block mb-2">Project Status</FieldLabel>
                <Select value={formData.status} onValueChange={handleStatusChange}>
                  <SelectTrigger className="h-12 bg-white border-gray-200 focus:ring-brand focus:border-brand px-4 text-sm w-full text-gray-500">
                    <SelectValue placeholder="Select project status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="UNDER_CONSTRUCTION">Under Construction</SelectItem>
                    <SelectItem value="COMPLETED">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </Field>

              {/* Payment Plan */}
              <Field>
                <FieldLabel className="text-sm font-medium text-gray-500 block mb-2">Payment Plan</FieldLabel>
                <Input
                  name="paymentPlan"
                  value={formData.paymentPlan}
                  onChange={handleChange}
                  placeholder="Enter Property Payment Plan"
                  className="h-12 bg-white border-gray-200 focus:ring-brand focus:border-brand px-4 text-sm w-full"
                />
              </Field>

              {/* Total Units */}
              <Field>
                <FieldLabel className="text-sm font-medium text-gray-500 block mb-2">Total Units</FieldLabel>
                <Input
                  name="totalUnits"
                  type="number"
                  value={formData.totalUnits}
                  onChange={handleChange}
                  placeholder="Enter total number of units"
                  className="h-12 bg-white border-gray-200 focus:ring-brand focus:border-brand px-4 text-sm w-full"
                />
              </Field>

              {/* Property Location */}
              <Field>
                <FieldLabel className="text-sm font-medium text-gray-500 block mb-2">Property Location</FieldLabel>
                <Input
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Enter property location"
                  className="h-12 bg-white border-gray-200 focus:ring-brand focus:border-brand px-4 text-sm w-full"
                />
              </Field>

            </div>

            {/* Submit Button */}
            <div className="mt-8">
              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex items-center justify-center rounded-md px-8 py-3 text-sm font-medium text-white cursor-pointer transition-all hover:opacity-90 disabled:opacity-70"
                style={{
                  background: "linear-gradient(180deg,#D1B07F 0%,#B08B4F 100%)",
                }}
              >
                {isLoading ? (
                  <>
                    <Loader className="animate-spin w-4 h-4 mr-2" />
                    Saving...
                  </>
                ) : 'Save Property'}
              </button>
            </div>
          </form>
        </FormalCard>
      </PageContent>
    </PageLayout>
  )
}

export default AddProperty