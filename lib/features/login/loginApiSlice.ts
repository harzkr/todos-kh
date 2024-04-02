import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LoginBodyType, LoginResponseType } from "@/lib/types";

export const loginApiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_SERVER_URL }),
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
    userLogout: build.mutation<void, void>({
      query: () => ({
        url: `/logout`,
        method: "POST",
        credentials: "include",
      }),
    }),
  }),
});

export const { useUserLoginMutation, useUserLogoutMutation } = loginApiSlice;
