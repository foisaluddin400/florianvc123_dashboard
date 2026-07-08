import baseApis from "../../baseApis"


const propertyManagerApi = baseApis.injectEndpoints({
    endpoints: (build) => ({
        getAllPropertyManagerStats: build.query<any, void>({
            query: () => ({
                url: '/meta/property-manager-meta-data',
                method: 'GET',
            }),
            providesTags: ['PropertyManagerStats'],
        }),
          getAllPropertyManagerActivities: build.query<any, string>({
            query: (range) => ({
                url: `/meta/property-manager-stats?range=${range}`,
                method: 'GET',
            }),
            providesTags: ['AdminStats'],
        }),
    })
})

export const {
    useGetAllPropertyManagerStatsQuery,
    useGetAllPropertyManagerActivitiesQuery
} = propertyManagerApi

export default propertyManagerApi
