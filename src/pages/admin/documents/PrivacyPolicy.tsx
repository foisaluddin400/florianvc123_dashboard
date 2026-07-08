import { useEffect, useState } from 'react'
import JoditComponent from '../../../components/shared/JoditComponent'
import { PageContent, PageLayout } from '../../../components/shared/PageLayout'
import { Button } from '../../../components/ui/button'
import { useGetPrivacyPolicyQuery, useAddPrivacyPolicyMutation } from '../../../redux/manageWeb/managewebApi'
import toast from 'react-hot-toast'
import { Loader } from 'lucide-react'

function PrivacyPolicy() {
  const [content, setContent] = useState<string>('')
  const { data, isLoading } = useGetPrivacyPolicyQuery()
  const [addPrivacyPolicy, { isLoading: isSaving }] = useAddPrivacyPolicyMutation()

  const privacyData = data?.data

  useEffect(() => {
    if (privacyData) {
      setContent(privacyData.description || '')
    }
  }, [privacyData])

  const handleSubmit = async () => {
    try {
      await addPrivacyPolicy({
        description: content
      }).unwrap()
      toast.success("Privacy Policy updated successfully!")
    } catch (error: any) {
      console.error(error)
      toast.error(error?.data?.message || "Something went wrong")
    }
  }

  return (
    <PageLayout title='Privacy Policy'>
      <PageContent>
        {isLoading ? (
          <div className='flex justify-center items-center py-40'>
            <Loader className='animate-spin text-brand' size={40} />
          </div>
        ) : (
          <JoditComponent content={content} setContent={setContent} />
        )}
        <Button
          onClick={handleSubmit}
          className='mt-4 bg-brand text-white'
          disabled={isSaving}
        >
          {isSaving ? 'Saving...' : 'Save Changes'}
        </Button>
      </PageContent>
    </PageLayout>
  )
}

export default PrivacyPolicy
