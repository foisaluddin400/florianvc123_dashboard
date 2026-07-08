import baseApis from "../baseApis";

const propertyApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    createPropertyFile: builder.mutation({
      query: (data) => ({
        url: "/property-file/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Properties", "AllProperties"],
    }),
    createProperty: builder.mutation({
      query: (data) => ({
        url: "/property/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Properties", "AllProperties"],
    }),
    getMyProperties: builder.query({
      query: () => ({
        url: "/property/my-properties",
      }),
      providesTags: ["Properties"],
    }),
    getSingleProperty: builder.query({
      query: (id) => ({
        url: `/property/get-single/${id}`,
      }),
      providesTags: ["Properties"],
    }),

     getSingleClientProperty: builder.query({
      query: (id) => ({
        url: `/client-property/clients-for-property/${id}`,
      }),
      providesTags: ["Properties"],
    }),

    getSinglePropertyFileUpdate: builder.mutation({
      query: ({ id, data }) => ({
        url: `/property-file/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Properties", "AllProperties"],
    }),

    getManageProperties: builder.query({
      query: () => ({
        url: `/property/get-all`,
      }),
      providesTags: ["Properties"],
    }),

    getPropertyPackages: builder.query({
      query: (id) => ({
        url: `/property-package/get-all/${id}`,
      }),
      providesTags: ["Properties"],
    }),
  deletePropertyPackage: builder.mutation({
      query: (id) => ({
        url: `/property-package/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Properties"],
    }),
  createPropertyPackage: builder.mutation({
      query: (data) => ({
        url: "/property-package/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Properties", "AllProperties"],
    }),

updatePropertyPackage: builder.mutation({
      query: ({ id, data }) => ({
        url: `/property-package/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Properties"],
    }),




    getSingleAllPropertyFiles: builder.query({
      query: (id) => ({
        url: `/property-file/get-all/${id}`,
      }),
      providesTags: ["Properties"],
    }),
    deleteSingleAllPropertyFiles: builder.mutation({
      query: (id) => ({
        url: `/property-file/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Properties"],
    }),

    // update property file
    createUpdatePropertyFile: builder.mutation({
      query: (data) => ({
        url: "/property-image/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Properties", "AllProperties"],
    }),
    getSingleUpdateAllPropertyFiles: builder.query({
      query: (id) => ({
        url: `/property-image/get-all/${id}`,
      }),
      providesTags: ["Properties"],
    }),
    getSingleUPdatePropertyFileUpdate: builder.mutation({
      query: ({ id, data }) => ({
        url: `/property-image/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Properties", "AllProperties"],
    }),
    deleteSingleUpdateFiles: builder.mutation({
      query: (id) => ({
        url: `/property-image/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Properties"],
    }),
    updateConstructionStage: builder.mutation({
      query: ({ id, data }) => ({
        url: `/construction-stage/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Properties"],
    }),
    getSingleConstructionStage: builder.query({
      query: (id) => ({
        url: `/construction-stage/${id}`,
      }),
      providesTags: ["Properties"],
    }),
    assignUnassignClient: builder.mutation({
      query: ({ id, data }) => ({
        url: `/property/assign-unassign-client/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Properties", "AllProperties", "Client"],
    }),
  }),
});

export const {
  useGetMyPropertiesQuery,
  useCreatePropertyFileMutation,
  useCreatePropertyMutation,
  useGetSinglePropertyQuery,
  useGetSingleAllPropertyFilesQuery,
  useGetSinglePropertyFileUpdateMutation,
  useDeleteSingleAllPropertyFilesMutation,
  useCreateUpdatePropertyFileMutation,
  useGetSingleUpdateAllPropertyFilesQuery,
  useGetSingleUPdatePropertyFileUpdateMutation,
  useDeleteSingleUpdateFilesMutation,
  useUpdateConstructionStageMutation,
  useGetSingleConstructionStageQuery,
  useAssignUnassignClientMutation,
  useGetManagePropertiesQuery,
  useGetPropertyPackagesQuery,
  useCreatePropertyPackageMutation,
  useUpdatePropertyPackageMutation,
    useGetSingleClientPropertyQuery,
    useDeletePropertyPackageMutation,
} = propertyApis;
