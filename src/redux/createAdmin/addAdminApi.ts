import baseApis from "../baseApis";

const addAdminApi = baseApis.injectEndpoints({
    endpoints: (build) => ({
        addAdmin: build.mutation<any, any>({
            query: (data) => ({
                url: '/admin/create-admin',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Admin']
        }),
        getAllAdmin: build.query<any, void>({
            query: () => ({
                url: '/admin/all-admins',
                method: 'GET',
            }),
            providesTags: ['Admin']
        }),
        getSingleAdmin: build.query<any, string>({
            query: (id) => ({
                url: `/admin/single-admin/${id}`,
                method: 'GET',
            }),
            providesTags: ['Admin']
        }),
        deleteAdmin: build.mutation<any, string>({
            query: (id) => ({
                url: `/admin/delete-admin/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Admin']
        }),
        updateAdmin: build.mutation<any, any>({
            query: ({ id, data }) => ({
                url: `/admin/update-admin/${id}`,
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: ['Admin']
        })
    })
})

export const {
    
useAddAdminMutation,useDeleteAdminMutation,useGetAllAdminQuery,useGetSingleAdminQuery,useUpdateAdminMutation
} = addAdminApi

export default addAdminApi
