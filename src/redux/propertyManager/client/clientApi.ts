import baseApis from "../../baseApis"


const clientApi = baseApis.injectEndpoints({
    endpoints: (build) => ({
        addClient: build.mutation<any, any>({
            query: (data) => ({
                url: '/client/create',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Client']
        }),
        getAllClients: build.query<any, void>({
            query: () => ({
                url: '/client/get-all',
                method: 'GET',
            }),
            providesTags: ['Client']
        }),
        getSingleClient: build.query<any, string>({
            query: (id) => ({
                url: `/client/get-single/${id}`,
                method: 'GET',
            }),
            providesTags: ['Client']
        }),
        deleteClient: build.mutation<any, string>({
            query: (id) => ({
                url: `/client/delete/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Client']
        }),
        updateClient: build.mutation<any, any>({
            query: ({ id, data }) => ({
                url: `/client/update/${id}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['Client']
        }),
        blockUnblockUser: build.mutation<any, string>({
            query: (id) => ({
                url: `/user/block-unblock/${id}`,
                method: 'PATCH',
            }),
            invalidatesTags: ['Client']
        })
    })
})

export const {
    useAddClientMutation,
    useGetAllClientsQuery,
    useGetSingleClientQuery,
    useDeleteClientMutation,
    useUpdateClientMutation,
    useBlockUnblockUserMutation
} = clientApi

export default clientApi
