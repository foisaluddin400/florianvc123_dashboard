import baseApis from "../baseApis";

const supportManagerApi = baseApis.injectEndpoints({
    endpoints: (build) => ({
        addSupportManager: build.mutation<any, any>({
            query: (data) => ({
                url: '/support-manager/create',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['SupportManager']
        }),
             addFileUpload: build.mutation<any, any>({
            query: (data) => ({
                url: '/file-upload/upload-files',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['SupportManager']
        }),
        getAllSupportManager: build.query<any, void>({
            query: () => ({
                url: '/support-manager/get-all',
                method: 'GET',
            }),
            providesTags: ['SupportManager']
        }),
        getSingleSupportManager: build.query<any, string>({
            query: (id) => ({
                url: `/support-manager/get-single/${id}`,
                method: 'GET',
            }),
            providesTags: ['SupportManager']
        }),
        deleteSupportManager: build.mutation<any, string>({
            query: (id) => ({
                url: `/support-manager/delete/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['SupportManager']
        })
    })
})

export const {
    useAddSupportManagerMutation,
    useGetAllSupportManagerQuery,
    useGetSingleSupportManagerQuery,
    useDeleteSupportManagerMutation,
    useAddFileUploadMutation
} = supportManagerApi

export default supportManagerApi
