import baseApis from "../baseApis";

const manageMarketApi = baseApis.injectEndpoints({
    endpoints: (build) => ({
        addManageMarket: build.mutation<any, any>({
            query: (data) => ({
                url: '/market-update/create',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['ManageMarket']
        }),
        getAllManageMarket: build.query<any, void>({
            query: () => ({
                url: '/market-update/get-all',
                method: 'GET',
            }),
            providesTags: ['ManageMarket']
        }),
        getSingleManageMarket: build.query<any, string>({
            query: (id) => ({
                url: `/market-update/get-single/${id}`,
                method: 'GET',
            }),
            providesTags: ['ManageMarket']
        }),
        deleteManageMarket: build.mutation<any, string>({
            query: (id) => ({
                url: `/market-update/delete/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['ManageMarket']
        }),
        updateManageMarket: build.mutation<any, any>({
            query: ({ id, data }) => ({
                url: `/market-update/update/${id}`,
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: ['ManageMarket']
        })
    })
})

export const {
    useAddManageMarketMutation,
    useGetAllManageMarketQuery,
    useGetSingleManageMarketQuery,
    useDeleteManageMarketMutation,
    useUpdateManageMarketMutation
} = manageMarketApi

export default manageMarketApi
