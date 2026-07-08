import baseApis from "../../baseApis"


const legalApi = baseApis.injectEndpoints({
    endpoints: (build) => ({
        addLegal: build.mutation<any, FormData>({
            query: (data) => ({
                url: '/legal-update/create',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Legal'],
        }),
        getAllLegal: build.query<any, void>({
            query: () => ({
                url: '/legal-update/get-all',
                method: 'GET',
            }),
            providesTags: ['Legal'],
        }),
        getSingleLegal: build.query<any, string>({
            query: (id) => ({
                url: `/legal-update/get-single/${id}`,
                method: 'GET',
            }),
            providesTags: ['Legal']
        }),
        updateLegal: build.mutation<any, { id: string, data: FormData }>(
            {
                query: ({ id, data }) => ({
                    url: `/legal-update/update/${id}`,
                    method: 'PATCH',
                    body: data,
                }),
                invalidatesTags: ['Legal'],
            }
        ),
        deleteLegal: build.mutation<any, string>({
            query: (id) => ({
                url: `/legal-update/delete/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Legal'],
        })
    })
})

export const {
    useAddLegalMutation,
    useGetAllLegalQuery,
    useGetSingleLegalQuery,
    useUpdateLegalMutation,
    useDeleteLegalMutation,
} = legalApi

export default legalApi
