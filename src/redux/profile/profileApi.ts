import baseApis from "../baseApis";

const profileApi = baseApis.injectEndpoints({
    endpoints: (build) => ({
       
        getProfile: build.query<any, void>({
            query: () => ({
                url: '/user/get-my-profile',
                method: 'GET',
            })
        }),
       
    })
})

export const {
   useGetProfileQuery
} = profileApi

export default profileApi
