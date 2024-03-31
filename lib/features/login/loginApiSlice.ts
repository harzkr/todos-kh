import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LoginBodyType, LoginResponseType } from "@/lib/types";

export const loginApiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5001" }),
  reducerPath: "loginApi",
  // Tag types are used for caching and invalidation.
  tagTypes: ["Login"],
  endpoints: (build) => ({
    userLogin: build.mutation<LoginResponseType, LoginBodyType>({
      query: ({ username, password }) => ({
        url: `/login`,
        method: "POST",
        body: { username, password },
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const { useUserLoginMutation } = loginApiSlice;
