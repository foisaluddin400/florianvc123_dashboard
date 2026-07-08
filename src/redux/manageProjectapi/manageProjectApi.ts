import baseApis from "../baseApis";

const manageProjectApi = baseApis.injectEndpoints({
    endpoints: (build) => ({
        addManageProject: build.mutation<any, any>({
            query: (data) => ({
                url: '/project/create',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['ManageProject']
        }),
        getAllManageProject: build.query<any, void>({
            query: () => ({
                url: '/project/get-all',
                method: 'GET',
            }),
            providesTags: ['ManageProject']
        }),
        getSingleManageProject: build.query<any, string>({
            query: (id) => ({
                url: `/project/get-single/${id}`,
                method: 'GET',
            }),
            providesTags: ['ManageProject']
        }),
        deleteManageProject: build.mutation<any, string>({
            query: (id) => ({
                url: `/project/delete/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['ManageProject']
        }),
        updateManageProject: build.mutation<any, any>({
            query: ({ id, data }) => ({
                url: `/project/update/${id}`,
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: ['ManageProject']
        })
    })
})

export const {
    useAddManageProjectMutation,
    useGetAllManageProjectQuery,
    useGetSingleManageProjectQuery,
    useDeleteManageProjectMutation,
    useUpdateManageProjectMutation
} = manageProjectApi

export default manageProjectApi
