"use client";
import React from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Typography, Button, TextField, Checkbox } from "@mui/material";
import {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} from "@/lib/features/todos/todosSlice";

type Todo = {
  id: string;
  details: string;
  done: boolean;
  name: string;
};

export const Dashboard = () => {
  const { data, error, isLoading } = useGetTodosQuery();

  const [addTodo] = useAddTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  const handleAddTodos = async () => {
    await addTodo({
      name: "New Todo",
      details: "New Todo Details",
      done: false,
    });
  };

  const handleUpdateTodos = async (todo: Todo) => {
    await updateTodo({
      id: todo.id,
      name: todo.name,
      details: todo.details,
      done: todo.done,
    });
  };

  const handleDeleteTodos = async (todo: Todo) => {
    await deleteTodo(todo.id);
  };

  return (
    <div>
      <h1>Dashboard</h1>

      <TextField id="outlined-basic" label="Todo" variant="outlined" />
      <br />
      <Button onClick={handleAddTodos} variant="contained" color="primary">
        Add Todo
      </Button>

      {isLoading && <div>Loading...</div>}
      {data && (
        <div>
          {data.todos.map((todo: Todo) => (
            <div key={todo.id}>
              <Checkbox
                checked={todo.done}
                onChange={() =>
                  handleUpdateTodos({
                    ...todo,
                    done: !todo.done,
                  })
                }
              />
              <Typography variant="body1">{todo.name}</Typography>
              <Button
                onClick={() => handleDeleteTodos(todo)}
                variant="contained"
                color="secondary"
              >
                Delete
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
