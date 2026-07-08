"use client"

import { useState, type ChangeEvent, useEffect } from 'react'
import toast from 'react-hot-toast'
import FormalCard from '../../../../components/shared/cards/FormalCard'
import { PageContent, PageLayout } from '../../../../components/shared/PageLayout'
import { Button } from '../../../../components/ui/button'
import { Field, FieldLabel } from '../../../../components/ui/field'
import { Input } from '../../../../components/ui/input'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import {
  useUpdatePropertyPackageMutation,

} from '../../../../redux/property/propertyApis'
import { Loader } from 'lucide-react'

const EditPropertyPackage = () => {
  const location = useLocation()
const pkg = location.state?.pkg
console.log(pkg)
  const { id } = useParams()
  const navigate = useNavigate()

  const [updatePackage, { isLoading }] = useUpdatePropertyPackageMutation()

  const [title, setTitle] = useState("")
  const [brief, setBrief] = useState("")
  const [errors, setErrors] = useState<any>({})


useEffect(() => {
  if (pkg) {
    setTitle(pkg.name)
    setBrief(pkg.description)
  }
}, [pkg])

  const validateForm = () => {
    const err: any = {}
    if (!title) err.title = "Required"
    if (!brief) err.brief = "Required"
    setErrors(err)
    return Object.keys(err).length === 0
  }

  const handleSavePost = async () => {
    if (!validateForm()) return toast.error("Fill all fields")

    try {
      await updatePackage({
        id,
        data: {
          name: title,
          description: brief,
        },
      }).unwrap()

      toast.success("Updated successfully")
      navigate(-1)

    } catch (err: any) {
      toast.error(err?.data?.message || "Update failed")
    }
  }

  return (
    <PageLayout title="Edit Property Package">
      <PageContent>
        <FormalCard header="Edit Property Package">

          <div className="space-y-6">

            <Field>
              <FieldLabel>Title</FieldLabel>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} />
              {errors.title && <p className="text-red-500">{errors.title}</p>}
            </Field>

            <Field>
              <FieldLabel>Description</FieldLabel>
              <textarea
                value={brief}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                  setBrief(e.target.value)
                }
                className="w-full border p-3 rounded"
              />
              {errors.brief && <p className="text-red-500">{errors.brief}</p>}
            </Field>

            <Button onClick={handleSavePost} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader className="animate-spin w-4 h-4 mr-2" />
                  Updating...
                </>
              ) : (
                "Update"
              )}
            </Button>

          </div>

        </FormalCard>
      </PageContent>
    </PageLayout>
  )
}

export default EditPropertyPackage