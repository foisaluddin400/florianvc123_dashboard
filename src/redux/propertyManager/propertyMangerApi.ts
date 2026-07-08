import baseApis from "../baseApis";

const propertyManagerApi = baseApis.injectEndpoints({
    endpoints: (build) => ({
        addPropertyManager: build.mutation<any, any>({
            query: (data) => ({
                url: '/property-manager/create',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['PropertyManager']
        }),
        getAllPropertyManager: build.query<any, void>({
            query: () => ({
                url: '/property-manager/get-all',
                method: 'GET',
            }),
            providesTags: ['PropertyManager']
        }),
        getSinglePropertyManager: build.query<any, string>({
            query: (id) => ({
                url: `/property-manager/get-single/${id}`,
                method: 'GET',
            }),
            providesTags: ['PropertyManager']
        }),
        deletePropertyManger: build.mutation<any, string>({
            query: (id) => ({
                url: `/property-manager/delete/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['PropertyManager']
        })
    })
})

export const {
    useAddPropertyManagerMutation,
    useGetAllPropertyManagerQuery,
    useGetSinglePropertyManagerQuery,
    useDeletePropertyMangerMutation
} = propertyManagerApi

export default propertyManagerApi
