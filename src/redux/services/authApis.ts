import baseApis from "../baseApis";

const authApis = baseApis.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (data: any) => ({
        url: '/auth/login',
        method: 'POST',
        body: data
      })
    }),
    changePassword: build.mutation({
      query: (data: any) => ({
        url: '/auth/change-password',
        method: 'POST',
        body: data
      })
    }),
    forgotPassword: build.mutation({
      query: (data: any) => ({
        url: '/auth/forget-password',
        method: 'POST',
        body: data
      })
    }),
    resendResetCode: build.mutation({
      query: (data: any) => ({
        url: '/auth/resend-reset-code',
        method: 'POST',
        body: data
      })
    }),
    verifyResetOtp: build.mutation({
      query: (data: any) => ({
        url: '/auth/verify-reset-otp',
        method: 'POST',
        body: data
      })
    }),
    resetPassword: build.mutation({
      query: (data: any) => ({
        url: '/auth/reset-password',
        method: 'POST',
        body: data
      })
    })
  })
})

export const {
  useLoginMutation,
  useChangePasswordMutation,
  useForgotPasswordMutation,
  useResendResetCodeMutation,
  useVerifyResetOtpMutation,
  useResetPasswordMutation
} = authApis
