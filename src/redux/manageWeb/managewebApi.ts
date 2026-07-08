import baseApis from "../baseApis";

const managewebApi = baseApis.injectEndpoints({
    endpoints: (build) => ({
        getTermsCondition: build.query<any, void>({
            query: () => ({
                url: '/manage/get-terms-conditions',
                method: 'GET',
            }),
            providesTags: ['ManageWeb']
        }),
        addTermsCondition: build.mutation<any, any>({
            query: (data) => ({
                url: '/manage/add-terms-conditions',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['ManageWeb']
        }),
        getPrivacyPolicy: build.query<any, void>({
            query: () => ({
                url: '/manage/get-privacy-policy',
                method: 'GET',
            }),
            providesTags: ['ManageWeb']
        }),
        addPrivacyPolicy: build.mutation<any, any>({
            query: (data) => ({
                url: '/manage/add-privacy-policy',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['ManageWeb']
        }),


    })
})

export const {
    useGetTermsConditionQuery,
    useAddTermsConditionMutation,
    useGetPrivacyPolicyQuery,
    useAddPrivacyPolicyMutation

} = managewebApi

export default managewebApi
