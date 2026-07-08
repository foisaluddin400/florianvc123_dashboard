import baseApis from "../baseApis";

const contentApi = baseApis.injectEndpoints({
    endpoints: (build) => ({
        addLifestyle: build.mutation<any, FormData>({
            query: (data) => ({
                url: '/lifestyle/create',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['LifeStyle'],
        }),
        getAllLifeStyle: build.query<any, void>({
            query: () => ({
                url: '/lifestyle/get-all',
                method: 'GET',
            }),
            providesTags: ['LifeStyle'],
        }),
        getSingleLifeStyle: build.query<any, string>({
            query: (id) => ({
                url: `/lifestyle/get-single/${id}`,
                method: 'GET',
            }),
            providesTags: ['LifeStyle']
        }),
        updateLifeStyle: build.mutation<any, { id: string, data: FormData }>(
            {
                query: ({ id, data }) => ({
                    url: `/lifestyle/update/${id}`,
                    method: 'PATCH',
                    body: data,
                }),
                invalidatesTags: ['LifeStyle'],
            }
        ),
        deleteLifeStyle: build.mutation<any, string>({
            query: (id) => ({
                url: `/lifestyle/delete/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['LifeStyle'],
        })
    })
})

export const {
    useAddLifestyleMutation,
    useGetAllLifeStyleQuery,
    useGetSingleLifeStyleQuery,
    useUpdateLifeStyleMutation,
    useDeleteLifeStyleMutation,
} = contentApi

export default contentApi
