"use client";
import React, { useEffect } from "react";
import {
  Typography,
  Button,
  TextField,
  AppBar,
  Toolbar,
  Modal,
  Fab,
  CircularProgress,
} from "@mui/material";
import {
  useGetTodosQuery,
  useAddTodoMutation,
} from "@/lib/features/todos/todosSlice";
import AddIcon from "@mui/icons-material/Add";
import { redirect } from "next/navigation";
import cssStyles from "./dashboard.module.css";
import { Todo, TodosResponseType } from "@/lib/types";
import { TodoComponent } from "./Todo";

export const Dashboard = () => {
  const [name, setName] = React.useState("");
  const [details, setDetails] = React.useState("");

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [isAuth, setIsAuth] = React.useState(false);

  const { data, error, isLoading } = useGetTodosQuery();

  const [addTodo] = useAddTodoMutation();

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

  const checkAuth = () => {
    const token = localStorage.getItem("access-token");

    if (!token) {
      redirect("/login");
    }
  };

  useEffect(() => {
    checkAuth();
    if (data && data.string) {
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
    const backgroundColor = (i: number) => (i % 2 === 0 ? "white" : "#ddeaf6");

    return (
      <div className={cssStyles.dataContainer}>
        {data.data.toReversed().map((todo: Todo, row: number) => (
          <TodoComponent
            key={todo.id}
            todo={todo}
            backgroundColor={backgroundColor(row)}
          />
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
          <div
            className={
              cssStyles.centeredRowFlex + " " + cssStyles.calculatedHeight
            }
          >
            No todos haven't been added yet, Add your first now!
          </div>
        )}

        {data && data.data && data.data.length > 0 && renderTodos(data)}

        <div className={cssStyles.fabFixedStyle}>
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
          <div className={cssStyles.modalContainer}>
            <Typography
              variant="h5"
              component="h2"
              className={cssStyles.modalTitle}
            >
              Add Todo
            </Typography>
            <div className={cssStyles.textFieldContainer}>
              <div>
                <TextField
                  onChange={(e) => setName(e.target.value)}
                  id="outlined-basic"
                  label="Name"
                  variant="outlined"
                  value={name}
                  fullWidth
                />
                <TextField
                  onChange={(e) => setDetails(e.target.value)}
                  id="outlined-basic"
                  label="Details"
                  variant="outlined"
                  value={details}
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
                disabled={name.length === 0}
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
