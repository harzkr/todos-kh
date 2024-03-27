// Need to use the React-specific entry point to import `createApi`
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface LoginBody {
  username: string;
  password: string;
}

interface LoginResponse {
  data: string;
  string: string;
}

// Define a service using a base URL and expected endpoints
export const loginApiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api" }),
  reducerPath: "loginApi",
  // Tag types are used for caching and invalidation.
  tagTypes: ["Login"],
  endpoints: (build) => ({
    userLogin: build.mutation<LoginResponse, LoginBody>({
      query: ({ username, password }) => ({
        url: `/login`,
        method: "POST",
        body: {
          username,
          password,
        },
      }),
    }),
  }),
});

export const { useUserLoginMutation } = loginApiSlice;
