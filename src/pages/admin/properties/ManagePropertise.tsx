import { Loader } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DynamicTable from '../../../components/shared/DynamicTable'
import { PageContent, PageLayout } from '../../../components/shared/PageLayout'
import { Button } from '../../../components/ui/button'
import { ButtonGroup } from '../../../components/ui/button-group'
import { Field } from '../../../components/ui/field'
import { Input } from '../../../components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select'
import { PropertiseDataColumn } from './PropertiseDataColumn'
import { useGetManagePropertiesQuery } from '../../../redux/property/propertyApis'

function ManagePropertise() {
  const { data: allProperties, isLoading: allPropertiesLoading } = useGetManagePropertiesQuery(undefined)

  const [, setSearchQuery] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  if (allPropertiesLoading) {
    return (
      <PageLayout title="Manage Clients" action={<button className="btn btn-primary">Add Client</button>}>
        <PageContent>
          <div className='flex justify-center items-center py-40'>
            <Loader className='animate-spin text-brand' size={40} />
          </div>
        </PageContent>
      </PageLayout>
    )
  }

  const handlerNavigate = (id: string) => {
    navigate(`/property-admin/properties/details/${id}`)
  }

  const renderAction = () => {
    return (
      <div className='flex gap-2'>
        <Select>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">All Users</SelectItem>
              <SelectItem value="active">Active Users</SelectItem>
              <SelectItem value="blocked">Blocked Users</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Field>
          <ButtonGroup>
            <Input onChange={handleSearch} className='h-9 focus:outline-none! focus:ring-0!' id="input-button-group" placeholder="Type to search..." />
            <Button size='default' className="h-9" variant="outline">Search</Button>
          </ButtonGroup>
        </Field>
      </div>
    )
  }

  return (
    <PageLayout title="Manage Properties" action={renderAction()}>
      <PageContent children={<DynamicTable columns={PropertiseDataColumn(handlerNavigate)} data={allProperties?.data || []} />} />
    </PageLayout>
  )
}

export default ManagePropertise