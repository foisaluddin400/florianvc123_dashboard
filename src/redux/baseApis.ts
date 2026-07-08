import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "./store";

const baseApis = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://rnj64vmh-4500.inc1.devtunnels.ms/api/v1",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.accessToken;
      if (token) {
        headers.set("Authorization", `${token}`);
      }
      return headers;
    },
  }),
  tagTypes: [
    "PropertyManager",
    "ContentManager",
    "SupportManager",
    "Admin",
    "Client",
    "LifeStyle",
    "Legal",
    "ManageMarket",
    "ManageProject",
    "user",
    "Properties",
    "AllProperties",
    "AdminStats",
    "ContentStats",
    "PropertyManagerStats",
    "SupportManagerStats",
    "ManageWeb",
    "paymentProperty",
    "LegalAndCompany"
  ],
  endpoints: () => ({}),
});

export default baseApis;
