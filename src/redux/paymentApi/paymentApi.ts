import baseApis from "../baseApis";

const paymentApi = baseApis.injectEndpoints({
  endpoints: (builder) => ({

    getPropertyPlan: builder.query({
      query: (id) => ({
        url: `/property-file/get-all/${id}`,
      }),
      providesTags: ['paymentProperty'],
    }),

    getSinglePropertyPlan: builder.query({
      query: (id) => ({
        url: `/property-file/get-single/${id}`,
      }),
      providesTags: ['paymentProperty'],
    }),

    createPaymentPlan: builder.mutation({
      query: (data) => ({
        url: '/payment-plan/create',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['paymentProperty'],
    }),

    updatePaymentPlan: builder.mutation({
      query: ({ id, data }) => ({
        url: `/payment-plan/update/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['paymentProperty'],
    }),

    deletePaymentPlan: builder.mutation({
      query: (id) => ({
        url: `/payment-plan/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['paymentProperty'],
    }),

  }),
})

export const {
  useGetPropertyPlanQuery,
  useGetSinglePropertyPlanQuery,
  useCreatePaymentPlanMutation,
  useUpdatePaymentPlanMutation,
  useDeletePaymentPlanMutation,
} = paymentApi

