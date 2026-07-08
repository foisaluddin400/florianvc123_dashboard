import baseApis from "../baseApis";

const contentManagerApi = baseApis.injectEndpoints({
    endpoints: (build) => ({
        addContentManager: build.mutation<any, any>({
            query: (data) => ({
                url: '/content-manager/create',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['ContentManager']
        }),
        getAllContentManager: build.query<any, void>({
            query: () => ({
                url: '/content-manager/get-all',
                method: 'GET',
            }),
            providesTags: ['ContentManager']
        }),
        getSingleContentManager: build.query<any, string>({
            query: (id) => ({
                url: `/content-manager/get-single/${id}`,
                method: 'GET',
            }),
            providesTags: ['ContentManager']
        }),
        deleteContentManager: build.mutation<any, string>({
            query: (id) => ({
                url: `/content-manager/delete/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['ContentManager']
        }),
        updateContentManager: build.mutation<any, any>({
            query: ({ id, data }) => ({
                url: `/content-manager/update/${id}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['ContentManager']
        })
    })
})

export const {
    useAddContentManagerMutation,
    useGetAllContentManagerQuery,
    useGetSingleContentManagerQuery,
    useDeleteContentManagerMutation,
    useUpdateContentManagerMutation
} = contentManagerApi

export default contentManagerApi
