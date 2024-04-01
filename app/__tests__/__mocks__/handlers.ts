import { http, HttpResponse } from "msw";
import { todoMocks } from "./todoMocks";

export const handlers = [
  http.get("http://localhost:5001/todo", ({ request, params, cookies }) => {
    return HttpResponse.json(todoMocks);
  }),
];
