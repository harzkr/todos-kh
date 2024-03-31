// Need to use the React-specific entry point to import `createApi`
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Todo, TodoBodyType, TodosResponseType } from "@/lib/types";

// Define a service using a base URL and expected endpoints
export const todosApiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5001",
  }),
  reducerPath: "todosApi",
  // Tag types are used for caching and invalidation.
  tagTypes: ["Todos"],
  endpoints: (build) => ({
    getTodos: build.query<TodosResponseType, void>({
      query: () => ({
        url: `/todo`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      }),
      providesTags: ["Todos"],
    }),
    addTodo: build.mutation<Todo, TodoBodyType>({
      query: (body) => ({
        url: `/todo`,
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      }),
      invalidatesTags: ["Todos"],
    }),
    updateTodo: build.mutation<Todo, Todo>({
      query: (body) => ({
        url: `/todo/${body.id}`,
        method: "PUT",
        body,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      }),
      invalidatesTags: ["Todos"],
    }),
    deleteTodo: build.mutation<void, string>({
      query: (id) => ({
        url: `/todo/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      }),
      invalidatesTags: ["Todos"],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = todosApiSlice;
