import baseApis from "../baseApis";

const legalAndCompanyApi = baseApis.injectEndpoints({
  endpoints: (build) => ({
    getLegalAndCompany: build.query<any, void>({
      query: () => ({
        url: `/legal-and-company/get`,
        method: "GET",
      }),
      providesTags: ["LegalAndCompany"],
    }),
    addUpdateLegalAndCompany: build.mutation<any, any>({
      query: (body) => ({
        url: `/legal-and-company/add-update`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["LegalAndCompany"],
    }),
  }),
});

export const { useGetLegalAndCompanyQuery, useAddUpdateLegalAndCompanyMutation } = legalAndCompanyApi;
export default legalAndCompanyApi;
