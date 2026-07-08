import baseApis from "../../baseApis"


const adminStatsApi = baseApis.injectEndpoints({
    endpoints: (build) => ({
       
        getAllAdminStats: build.query<any, void>({
            query: () => ({
                url: '/meta/admin-meta-data',
                method: 'GET',
            }),
            providesTags: ['AdminStats'],
        }),
        getAllAdmiActivities: build.query<any, string>({
            query: (range) => ({
                url: `/meta/admin-stats?range=${range}`,
                method: 'GET',
            }),
            providesTags: ['AdminStats'],
        }),
      
      
    
    })
})

export const {
    useGetAllAdminStatsQuery,
    useGetAllAdmiActivitiesQuery
} = adminStatsApi

export default adminStatsApi
