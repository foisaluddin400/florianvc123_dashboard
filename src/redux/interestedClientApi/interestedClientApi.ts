import baseApis from "../baseApis";

const interestedClientApi = baseApis.injectEndpoints({
  endpoints: (build) => ({
    getProjectInterestedClients: build.query<any, string>({
      query: (projectId) => ({
        url: `/interested-client/project-interested-clients/${projectId}`,
        method: "GET",
      }),
      providesTags: ["Client"],
    }),
    getSingleInterestedClient: build.query<any, string>({
      query: (id) => ({
        url: `/interested-client/get-single/${id}`,
        method: "GET",
      }),
      providesTags: ["Client"],
    }),
  }),
});

export const { useGetProjectInterestedClientsQuery, useGetSingleInterestedClientQuery } = interestedClientApi;
export default interestedClientApi;
