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
    const nameValue = name;
    const detailsValue = details;

    setName("");
    setDetails("");

    await addTodo({
      name: nameValue,
      details: detailsValue,
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

  console.log(data, "checking data");

  return (
    <div
      style={{
        width: "100%",
        padding: "20px",
        height: "100vh",
      }}
    >
      {isLoading && <div>Loading...</div>}

      {data && data.data && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "calc(100vh - 200px)",
            overflowY: "scroll",
          }}
        >
          {data.data.map((todo: Todo) => (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                margin: "10px 0",
              }}
              key={todo.id}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
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
                </div>
                <div>
                  <Typography variant="body2">{todo.details}</Typography>
                </div>
              </div>
              <Button
                onClick={() => handleDeleteTodos(todo)}
                variant="text"
                color="secondary"
              >
                Delete
              </Button>
            </div>
          ))}
        </div>
      )}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "20px auto",
          position: "fixed",
          bottom: "0px",
        }}
      >
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
        </div>
        <br />
        <Button
          onClick={handleAddTodos}
          variant="contained"
          color="primary"
          disabled={name.length === 0}
        >
          Add Todo
        </Button>
      </div>
    </div>
  );
};
