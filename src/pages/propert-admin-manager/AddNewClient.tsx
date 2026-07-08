import { useState } from 'react'
import { Loader } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import FormalCard from '../../components/shared/cards/FormalCard'
import { PageContent, PageLayout } from '../../components/shared/PageLayout'
import { Button } from '../../components/ui/button'
import { Field, FieldError, FieldLabel } from '../../components/ui/field'
import { Input } from '../../components/ui/input'
import { useAddClientMutation } from '../../redux/propertyManager/client/clientApi'
import toast from 'react-hot-toast'

interface FormData {
  name: string
  email: string
  phone: string
  password: string
}

interface FormErrors {
  name?: string
  email?: string
  phone?: string
  password?: string
  general?: string
}

function AddNewClient() {
  const navigate = useNavigate()
  const [addClient, { isLoading }] = useAddClientMutation()

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    password: ''
  })

  const [errors, setErrors] = useState<FormErrors>({})

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    try {
      const clientData = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim(),
        password: formData.password
      }

      const response = await addClient(clientData).unwrap()

      if (response.success) {
        toast.success(response.message || 'Client added successfully!')
        setFormData({ name: '', email: '', phone: '', password: '' })
        navigate('/property-admin/clients') 
      }
    } catch (error: any) {
      const errMsg = error?.data?.message || 'Failed to add client. Please try again.'
      setErrors({ general: errMsg })
      toast.error(errMsg)
    }
  }

  return (
    <PageLayout title="Add New Client">
      <PageContent>
        <FormalCard header={
          <div>
            <h1 className='text-lg text-[#666666] font-nunito-semibold-italic'>Add New Client</h1>
            <p className='text-sm text-[#B0B0B0] font-nunito-semibold-italic'>
              Create a new client account and provide secure access to the platform.
            </p>
          </div>
        }>
          <form className='space-y-4' onSubmit={handleSubmit}>
            {errors.general && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded text-sm">
                {errors.general}
              </div>
            )}

            <div className="responsive-grid-2">
              <Field>
                <FieldLabel htmlFor="client_name">Full Name</FieldLabel>
                <Input
                  id="client_name"
                  placeholder='Enter full name'
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  disabled={isLoading}
                />
                {errors.name && <FieldError errors={[{ message: errors.name }]} />}
              </Field>

              <Field>
                <FieldLabel htmlFor="client_email">Email</FieldLabel>
                <Input
                  id="client_email"
                  type="email"
                  placeholder='Enter email'
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  disabled={isLoading}
                />
                {errors.email && <FieldError errors={[{ message: errors.email }]} />}
              </Field>

              <Field>
                <FieldLabel htmlFor="client_phone">Phone Number</FieldLabel>
                <Input
                  id="client_phone"
                  placeholder='Enter phone number'
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  disabled={isLoading}
                />
                {errors.phone && <FieldError errors={[{ message: errors.phone }]} />}
              </Field>

              <Field>
                <FieldLabel htmlFor="client_password">Password</FieldLabel>
                <Input
                  id="client_password"
                  type="password"
                  placeholder='Enter password'
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  disabled={isLoading}
                />
                {errors.password && <FieldError errors={[{ message: errors.password }]} />}
              </Field>
            </div>

            <div className='pt-2'>
              <Button
                className='bg-brand hover:bg-brand/90 text-white px-6'
                type="submit"
                disabled={isLoading}
                style={{
                   background: "linear-gradient(180deg,#D1B07F 0%,#B08B4F 100%)",
                }}
              >
                {isLoading ? (
                  <div className='flex items-center gap-2'>
                    <Loader className="animate-spin w-4 h-4" />
                    <span>Adding Client...</span>
                  </div>
                ) : (
                  'Add & Send Invitation'
                )}
              </Button>
            </div>
          </form>
        </FormalCard>
      </PageContent>
    </PageLayout>
  )
}

export default AddNewClient