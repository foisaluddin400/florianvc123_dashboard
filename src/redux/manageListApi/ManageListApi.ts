import baseApis from "../baseApis";

const ManageListApi = baseApis.injectEndpoints({
    endpoints: (build) => ({
       
        getAllManageList: build.query<any, void>({
            query: () => ({
                url: '/auction/get-all',
                method: 'GET',
            }),
            providesTags: ['ManageProject']
        }),
        getSingleManageList: build.query<any, string>({
            query: (id) => ({
                url: `/auction/get-single/${id}`,
                method: 'GET',
            }),
            providesTags: ['ManageProject']
        }),
       
         updateStatus: build.mutation<any, any>({
            query: ({ id, data }) => ({
                url: `/auction/review/${id}`,
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: ['Admin']
        }),

     getUserManage: build.query<any, string | void>({
  query: (status) => ({
    url: status
      ? `/user/get-all?status=${status}`
      : "/user/get-all",
    method: "GET",
  }),
  providesTags: ["user"],
}),
         getSingleUser: build.query<any, string>({
            query: (id) => ({
                url: `/user/get-single/${id}`,
                method: 'GET',
            }),
            providesTags: ['user']
        }),

        updateUserStatus: build.mutation<any, any>({
            query: ({ id, data }) => ({
                url: `/user/accept-reject/${id}`,
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: ['user']
        }),
    })
})

export const {
   useGetAllManageListQuery,useGetSingleManageListQuery,useUpdateStatusMutation, useGetUserManageQuery, useGetSingleUserQuery, useUpdateUserStatusMutation
} = ManageListApi

export default ManageListApi
