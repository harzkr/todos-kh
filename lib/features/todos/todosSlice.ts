// Need to use the React-specific entry point to import `createApi`
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface TodoBody {
  name: string;
  details: string;
  done: boolean;
}

interface Todo {
  id: string;
  name: string;
  details: string;
  done: boolean;
}

interface TodosList {
  todos: Todo[];
}

// Define a service using a base URL and expected endpoints
export const todosApiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5001",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("access-token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  reducerPath: "todosApi",
  // Tag types are used for caching and invalidation.
  tagTypes: ["Todos"],
  endpoints: (build) => ({
    getTodos: build.query<TodosList, void>({
      query: () => ({
        url: `/todo`,
        method: "GET",
      }),
    }),
    addTodo: build.mutation<Todo, TodoBody>({
      query: (body) => ({
        url: `/todo`,
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    updateTodo: build.mutation<Todo, Todo>({
      query: (body) => ({
        url: `/todo/${body.id}`,
        method: "PUT",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    deleteTodo: build.mutation<void, string>({
      query: (id) => ({
        url: `/todo/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = todosApiSlice;
