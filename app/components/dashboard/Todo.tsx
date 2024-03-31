"use client";
import React from "react";
import {
  Typography,
  Button,
  TextField,
  Checkbox,
  IconButton,
} from "@mui/material";
import {
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} from "@/lib/features/todos/todosSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import cssStyles from "./dashboard.module.css";
import { Todo } from "@/lib/types";

export const TodoComponent = ({
  todo,
  backgroundColor,
}: {
  todo: Todo;
  backgroundColor: string;
}) => {
  const [name, setName] = React.useState("");
  const [details, setDetails] = React.useState("");

  const [editing, setEditing] = React.useState(false);
  const [editingTodo, setEditingTodo] = React.useState("");

  const [addTodo] = useAddTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

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

  const handleEditing = async (todo: Todo) => {
    setEditing(true);
    setEditingTodo(todo.id);

    setName(todo.name);
    setDetails(todo.details);
  };

  const handleSave = async (todo: Todo) => {
    await updateTodo({
      id: todo.id,
      name: name,
      details: details,
      done: todo.done,
    });

    setName("");
    setDetails("");
    setEditing(false);
  };

  return (
    <div
      className={cssStyles.todoContainer}
      style={{
        backgroundColor: backgroundColor,
      }}
      key={todo.id}
    >
      <div className={cssStyles.centeredColumnFlex}>
        <div className={cssStyles.centeredRowFlex}>
          <Checkbox
            checked={todo.done}
            onChange={() =>
              handleUpdateTodos({
                ...todo,
                done: !todo.done,
              })
            }
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              wordBreak: "break-word",
            }}
          >
            <div>
              {editing && editingTodo === todo.id ? (
                <TextField
                  value={name}
                  variant="standard"
                  onChange={(e) => setName(e.target.value)}
                />
              ) : (
                <Typography
                  style={{
                    textDecoration: todo.done ? "line-through" : "none",
                  }}
                  variant="body1"
                >
                  {todo.name}
                </Typography>
              )}
            </div>
            <div>
              {editing && editingTodo === todo.id ? (
                <TextField
                  value={details}
                  variant="standard"
                  onChange={(e) => setDetails(e.target.value)}
                  multiline
                  rows={4}
                  fullWidth
                />
              ) : (
                <Typography
                  style={{
                    textDecoration: todo.done ? "line-through" : "none",
                  }}
                  variant="body2"
                >
                  {todo.details}
                </Typography>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className={cssStyles.centeredRowFlex}>
        {editing && editingTodo === todo.id ? (
          <Button
            onClick={() => handleSave(todo)}
            variant="contained"
            color="primary"
            disabled={name.length === 0}
          >
            Save
          </Button>
        ) : (
          <Button
            onClick={() => handleEditing(todo)}
            variant="text"
            color="primary"
            disabled={editing}
          >
            Edit
          </Button>
        )}
        <IconButton onClick={() => handleDeleteTodos(todo)} aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  );
};
