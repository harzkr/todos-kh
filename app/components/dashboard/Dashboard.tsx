"use client";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  Typography,
  Button,
  TextField,
  Checkbox,
  IconButton,
  AppBar,
  Toolbar,
  Modal,
  Box,
  Fab,
  CircularProgress,
} from "@mui/material";
import {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} from "@/lib/features/todos/todosSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { redirect } from "next/navigation";
import cssStyles from "./dashboard.module.css";
import { Todo, TodoBodyType, TodosResponseType } from "@/lib/types";

export const Dashboard = () => {
  const [name, setName] = React.useState("");
  const [details, setDetails] = React.useState("");

  const [editing, setEditing] = React.useState(false);
  const [editingTodo, setEditingTodo] = React.useState("");

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [isAuth, setIsAuth] = React.useState(false);

  const { data, error, isLoading } = useGetTodosQuery();

  const [addTodo] = useAddTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  const handleAddTodos = async () => {
    const nameValue = name;
    const detailsValue = details;

    setName("");
    setDetails("");
    handleClose();

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

  const checkAuth = () => {
    const token = localStorage.getItem("access-token");

    if (!token) {
      redirect("/login");
    }
  };

  useEffect(() => {
    checkAuth();

    if (data && data.data) {
      if (data.error_message) {
        const { error_message } = data;

        if (
          error_message.toLowerCase().includes("unauthorized") ||
          error_message.toLowerCase().includes("invalid token")
        ) {
          redirect("/login");
        } else {
          setIsAuth(true);
        }
      } else {
        setIsAuth(true);
      }
    }
  }, [data, checkAuth]);

  const renderTodos = (data: TodosResponseType) => {
    const backgroundColor = (i: number) =>
      i % 2 === 0 ? "white" : "lightgray";

    return (
      <div className={cssStyles.dataContainer}>
        {data.data.toReversed().map((todo: Todo, row: number) => (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              padding: "10px",
              border: "1px solid #ccc",
              margin: "10px 0",
              backgroundColor: backgroundColor(row),
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
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
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
              <IconButton
                onClick={() => handleDeleteTodos(todo)}
                aria-label="delete"
              >
                <DeleteIcon />
              </IconButton>
            </div>
          </div>
        ))}
      </div>
    );
  };

  if (!isAuth) {
    return <CircularProgress />;
  } else {
    return (
      <div className={cssStyles.outer}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              TodoList App
            </Typography>
            <Button color="inherit">Logout</Button>
          </Toolbar>
        </AppBar>
        {isLoading && <div>Loading...</div>}

        {data && data.data && data.data.length === 0 && (
          <div className={cssStyles.centeredRowFlex}>
            No todos haven't been added yet, Add your first now!
          </div>
        )}

        {data && data.data && data.data.length > 0 && renderTodos(data)}

        <div
          style={{
            position: "fixed",
            bottom: 20,
            right: 20,
          }}
        >
          <Fab color="primary" aria-label="add" onClick={handleOpen}>
            <AddIcon />
          </Fab>
        </div>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              padding: 4,
              backgroundColor: "white",
              border: "2px solid #000",
              boxShadow: "red 60px -16px;",
            }}
          >
            <Typography
              variant="h5"
              component="h2"
              style={{
                textAlign: "center",
                padding: "20px",
              }}
            >
              Add Todo
            </Typography>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                margin: "20px auto",
                padding: "20px",
              }}
            >
              <div>
                <TextField
                  onChange={(e) => setName(e.target.value)}
                  id="outlined-basic"
                  label="Name"
                  variant="outlined"
                  value={editing ? "" : name}
                  fullWidth
                />
                <TextField
                  onChange={(e) => setDetails(e.target.value)}
                  id="outlined-basic"
                  label="Details"
                  variant="outlined"
                  value={editing ? "" : details}
                  style={{
                    marginTop: 12,
                  }}
                  multiline
                  rows={4}
                  fullWidth
                />
              </div>
              <br />
              <Button
                onClick={handleAddTodos}
                variant="contained"
                color="primary"
                disabled={name.length === 0 || editing}
              >
                Add Todo
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
};
