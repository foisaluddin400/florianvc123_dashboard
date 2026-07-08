import { useState, useEffect } from 'react'
import FormalCard from '../../../components/shared/cards/FormalCard'
import { PageContent, PageLayout } from '../../../components/shared/PageLayout'
import Space from '../../../components/shared/Space'
import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'
import { useGetLegalAndCompanyQuery, useAddUpdateLegalAndCompanyMutation } from '../../../redux/legalAndCompanyApi/legalAndCompanyApi'
import { Loader } from 'lucide-react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

interface CompanyInfo {
  name: string
  officeAddress: string
  tradeLicenseNumber: string
  issuingAuthority: string
  businessActivity: string
  phoneNumber: string
  websiteLink: string
}

function UpdateCompanyInfo() {
  const navigate = useNavigate();

  const { data: legalAndCompanyResponse, isLoading: isFetching } = useGetLegalAndCompanyQuery();
  const [updateLegalAndCompany, { isLoading: isUpdating }] = useAddUpdateLegalAndCompanyMutation();

  const [formData, setFormData] = useState<CompanyInfo>({
    name: '',
    officeAddress: '',
    tradeLicenseNumber: '',
    issuingAuthority: '',
    businessActivity: '',
    phoneNumber: '',
    websiteLink: ''
  })

  useEffect(() => {
    if (legalAndCompanyResponse?.data) {
      const data = legalAndCompanyResponse.data;
      setFormData({
        name: data.name || '',
        officeAddress: data.officeAddress || '',
        tradeLicenseNumber: data.tradeLicenseNumber || '',
        issuingAuthority: data.issuingAuthority || '',
        businessActivity: data.businessActivity || '',
        phoneNumber: data.phoneNumber || '',
        websiteLink: data.websiteLink || ''
      });
    }
  }, [legalAndCompanyResponse]);

  const handleInputChange = (field: keyof CompanyInfo, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await updateLegalAndCompany(formData).unwrap();
      if (res.success || res.statusCode === 200 || res.data) {
        toast.success(res.message || 'Company info updated successfully');
        navigate(-1);
      } else {
        toast.success('Company info updated successfully');
        navigate(-1);
      }
    } catch (err: any) {
      toast.error(err?.data?.message || 'Failed to update company info');
    }
  }

  if (isFetching) {
    return (
      <PageLayout title='Update Legal & Company Info'>
        <div className="flex justify-center items-center py-40">
          <Loader className="animate-spin text-brand" size={40} />
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title='Update Legal & Company Info'>
      <PageContent>
        <FormalCard header={
          <div>
            <h1 className='text-lg text-[#666666] font-nunito-semibold-italic'>Legal & Company Information</h1>
            <p className='text-sm text-[#B0B0B0] font-nunito-semibold-italic'>Keep your legal and company details up to date.</p>
          </div>
        }>
          <form onSubmit={handleSubmit}>
            <div className="responsive-grid-2">
              <div className="space-y-2">
                <label className="text-[#B0B0B0] font-nunito-semibold-italic text-sm">Company Name</label>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="border-[#DDDDDD] focus:ring-brand/20"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[#B0B0B0] font-nunito-semibold-italic text-sm">Registered Office Address</label>
                <Input
                  type="text"
                  value={formData.officeAddress}
                  onChange={(e) => handleInputChange('officeAddress', e.target.value)}
                  className="border-[#DDDDDD] focus:ring-brand/20"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[#B0B0B0] font-nunito-semibold-italic text-sm">Trade License Number</label>
                <Input
                  type="text"
                  value={formData.tradeLicenseNumber}
                  onChange={(e) => handleInputChange('tradeLicenseNumber', e.target.value)}
                  className="border-[#DDDDDD] focus:ring-brand/20"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[#B0B0B0] font-nunito-semibold-italic text-sm">Issuing Authority</label>
                <Input
                  type="text"
                  value={formData.issuingAuthority}
                  onChange={(e) => handleInputChange('issuingAuthority', e.target.value)}
                  className="border-[#DDDDDD] focus:ring-brand/20"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[#B0B0B0] font-nunito-semibold-italic text-sm">Business Activity</label>
                <textarea
                  value={formData.businessActivity}
                  onChange={(e) => handleInputChange('businessActivity', e.target.value)}
                  className="w-full p-3 border border-[#DDDDDD] rounded-md focus:outline-none focus:ring-2 focus:ring-brand/20 min-h-20 resize-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[#B0B0B0] font-nunito-semibold-italic text-sm">Phone Number</label>
                <Input
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                  className="border-[#DDDDDD] focus:ring-brand/20"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[#B0B0B0] font-nunito-semibold-italic text-sm">Official Website</label>
                <Input
                  type="url"
                  value={formData.websiteLink}
                  onChange={(e) => handleInputChange('websiteLink', e.target.value)}
                  className="border-[#DDDDDD] focus:ring-brand/20"
                />
              </div>
            </div>

            <Space size={6} />

            <div className="flex gap-3">
              <Button
                type="submit"
                disabled={isUpdating}
                className='bg-brand hover:bg-brand/80 text-white min-w-[150px]'
              >
                {isUpdating ? <Loader className="animate-spin w-5 h-5 mr-2" /> : null}
                {isUpdating ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </FormalCard>
      </PageContent>
    </PageLayout>
  )
}

export default UpdateCompanyInfo
