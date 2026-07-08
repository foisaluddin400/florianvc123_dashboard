import baseApis from "../baseApis";

const profileApis = baseApis.injectEndpoints({
  endpoints: (build) => ({
    getProfile: build.query<any, void>({
      query: () => ({
        url: "/user/get-my-profile",
        method: "GET",
      }),
    }),
    updateProfile: build.mutation<any, any>({
      query: (data) => ({
        url: `/user/update-profile`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["ManageMarket"],
    }),
  }),
});

export const { useGetProfileQuery, useUpdateProfileMutation } = profileApis;
