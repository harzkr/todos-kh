"use client";
import React from "react";
import {
  Typography,
  Button,
  TextField,
  Checkbox,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import {
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

  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

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
            color="secondary"
            checked={todo.done}
            onChange={() =>
              handleUpdateTodos({
                ...todo,
                done: !todo.done,
              })
            }
          />
          <div className={cssStyles.todoTextContainer}>
            <div>
              {editing && editingTodo === todo.id ? (
                <TextField
                  color="secondary"
                  value={name}
                  variant="standard"
                  onChange={(e) => setName(e.target.value)}
                  style={{
                    width: 300,
                  }}
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
                  color="secondary"
                  variant="standard"
                  onChange={(e) => setDetails(e.target.value)}
                  multiline
                  rows={4}
                  fullWidth
                  style={{
                    width: 300,
                  }}
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
            color="secondary"
            disabled={name.length === 0}
            aria-label="save"
          >
            Save
          </Button>
        ) : (
          <Button
            onClick={() => handleEditing(todo)}
            variant="text"
            color="secondary"
            disabled={editing}
            aria-label="edit"
          >
            Edit
          </Button>
        )}
        <IconButton onClick={handleClickOpen} aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
      >
        <DialogTitle id="alert-dialog-title">
          {"Deleting todo item"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this todo item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={handleClose}>
            No
          </Button>
          <Button
            color="secondary"
            onClick={() => handleDeleteTodos(todo)}
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
