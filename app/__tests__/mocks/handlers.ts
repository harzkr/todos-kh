import { http } from "msw";
import { todoMocks } from "./todoMocks";

export const handlers = [
  http.get("https://jsonplaceholder.typicode.com/todos", () => {
    return new Response(JSON.stringify(todoMocks), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }),
];
