import baseApis from "../../baseApis"


const contentStatsApi = baseApis.injectEndpoints({
    endpoints: (build) => ({
       
        getAllContentStats: build.query<any, void>({
            query: () => ({
                url: '/meta/content-manager-meta-data',
                method: 'GET',
            }),
            providesTags: ['ContentStats'],
        }),
          getAllContentActivities: build.query<any, string>({
            query: (range) => ({
                url: `/meta/content-manager-stats?range=${range}`,
                method: 'GET',
            }),
            providesTags: ['ContentStats'],
        }),
      
      
    
    })
})

export const {
    useGetAllContentStatsQuery,
    useGetAllContentActivitiesQuery,
} = contentStatsApi

export default contentStatsApi
