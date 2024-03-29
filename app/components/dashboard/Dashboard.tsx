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
  const [name, setName] = React.useState("");
  const [details, setDetails] = React.useState("");

  const { data, error, isLoading } = useGetTodosQuery();

  const [addTodo] = useAddTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  const handleAddTodos = async () => {
    console.log("name", name);
    console.log("details", details);
    await addTodo({
      name: name,
      details: details,
      done: false,
    });

    setName("");
    setDetails("");
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

  console.log(data, "checking data");

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {data && data.data && (
        <div>
          {data.data.map((todo: Todo) => (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                margin: "10px 0",
              }}
              key={todo.id}
            >
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
              <Typography variant="body2">{todo.details}</Typography>
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

      <div>
        <TextField
          onChange={(e) => setName(e.target.value)}
          id="outlined-basic"
          label="Name"
          variant="outlined"
        />
        <TextField
          onChange={(e) => setDetails(e.target.value)}
          id="outlined-basic"
          label="Details"
          variant="outlined"
        />
        <br />
        <Button onClick={handleAddTodos} variant="contained" color="primary">
          Add Todo
        </Button>
      </div>
    </div>
  );
};
