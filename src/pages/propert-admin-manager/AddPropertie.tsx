import { useState } from "react"
import { useParams } from "react-router-dom"
import FormalCard from "../../components/shared/cards/FormalCard"
import DynamicTable from "../../components/shared/DynamicTable"
import { PageContent, PageLayout } from "../../components/shared/PageLayout"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { useAssignUnassignClientMutation, useGetMyPropertiesQuery } from "../../redux/property/propertyApis"
import type { ColumnDef } from "@tanstack/react-table"
import toast from "react-hot-toast"
import { Loader } from "lucide-react"


function AddPropertie() {
    const { id: clientId } = useParams()
    const { data, isLoading } = useGetMyPropertiesQuery(undefined)
    console.log(data)
    const [assignProperty, { isLoading: isAssigning }] = useAssignUnassignClientMutation()
    const [loadingId, setLoadingId] = useState<string | null>(null)

    const handleAssignProperty = async (propertyId: string) => {
        setLoadingId(propertyId)
        try {
            const res = await assignProperty({
                id: propertyId,
                data: { clientId: clientId }
            }).unwrap()
            if (res.success) {
                toast.success(res.message || "Property assigned successfully!")
            }
        } catch (err: any) {
            toast.error(err?.data?.message || "Failed to assign property. Please try again.")
        } finally {
            setLoadingId(null)
        }
    }

    const columns: ColumnDef<any>[] = [
        {
            id: "name",
            header: "Name",
            cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    <img src={row?.original?.images[0]} alt="Project" className='w-10 h-10 rounded-md object-cover' />
                    <span className="font-medium">{row?.original?.name}</span>
                </div>
            ),
        },
        {
            id: "type",
            header: "Type",
            cell: ({ row }) => row?.original?.type,
        },
        {
            id: "status",
            header: "Status",
            cell: ({ row }) => row?.original?.status,
        },
        {
            id: "progress",
            header: "Progress",
            cell: ({ row }) => <span>{row?.original?.constructionProgressPercentage}%</span>,
        },
        {
            id: "action",
            header: "Action",
            cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    <Button
                        onClick={() => handleAssignProperty(row.original?.id)}
                        disabled={isAssigning}
                        size="sm"
                        className='bg-brand hover:bg-brand cursor-pointer text-white'
                    >
                        {isAssigning && loadingId === row.original?.id ? <Loader className="animate-spin w-4 h-4" /> : "Add"}
                    </Button>
                </div>
            ),
        }
    ]

    return (
        <PageLayout title="Add new project">
            <PageContent>
                <FormalCard header={
                    <div className="w-full flex items-center gap-2">
                        <Input placeholder="Search by name" />
                        <Button className="bg-brand hover:bg-brand cursor-pointer">Search</Button>
                    </div>
                }>
                    <DynamicTable isLoading={isLoading as boolean} header={false} columns={columns || []} data={data?.data || []} />
                </FormalCard>
            </PageContent>
        </PageLayout>


    )
}

export default AddPropertie
