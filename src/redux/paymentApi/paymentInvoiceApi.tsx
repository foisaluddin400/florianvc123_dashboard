import baseApis from "../baseApis";

const paymentInvoiceApi = baseApis.injectEndpoints({
  endpoints: (builder) => ({

    getPropertyInvoice: builder.query({
      query: (id) => ({
        url: `/payment-invoice/get-all/${id}`,
      }),
      providesTags: ['paymentProperty'],
    }),

       getPaymentPlane: builder.query({
      query: (id) => ({
        url: `/payment-plan/get-all/${id}`,
      }),
      providesTags: ['paymentProperty'],
    }),

      getSinglePaymentInvoice: builder.query({
      query: (id) => ({
        url: `/payment-invoice/get-single/${id}`,
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
        url: `/property-file/update/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['paymentProperty'],
    }),

    deletePaymentPlan: builder.mutation({
      query: (id) => ({
        url: `/property-file/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['paymentProperty'],
    }),

  }),
})

export const {
  useGetPropertyInvoiceQuery,
  useGetSinglePropertyPlanQuery,
  useCreatePaymentPlanMutation,
  useUpdatePaymentPlanMutation,
  useDeletePaymentPlanMutation,
    useGetPaymentPlaneQuery,
    useGetSinglePaymentInvoiceQuery,
} = paymentInvoiceApi

