import baseApis from "../../baseApis"


const supportManagerApi = baseApis.injectEndpoints({
    endpoints: (build) => ({
        getAllSupportManagerStats: build.query<any, void>({
            query: () => ({
                url: '/meta/support-manager-meta-data',
                method: 'GET'
            }),
            providesTags: ['SupportManagerStats']
        })
    })
})

export const {
    useGetAllSupportManagerStatsQuery,
} = supportManagerApi

export default supportManagerApi
