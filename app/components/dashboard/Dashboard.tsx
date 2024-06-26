"use client";
import React, { useEffect } from "react";
import {
  Typography,
  Button,
  TextField,
  Modal,
  Fab,
  CircularProgress,
} from "@mui/material";
import {
  useGetTodosQuery,
  useAddTodoMutation,
} from "@/lib/features/todos/todosSlice";
import { useUserLogoutMutation } from "@/lib/features/login/loginApiSlice";
import AddIcon from "@mui/icons-material/Add";
import cssStyles from "./dashboard.module.css";
import { Todo, TodosResponseType } from "@/lib/types";
import { TodoComponent } from "./Todo";
import { Header } from "../utilComponents/Header";
import { useRouter } from "next/navigation";

export const Dashboard = () => {
  const router = useRouter();

  const [name, setName] = React.useState("");
  const [details, setDetails] = React.useState("");
  const [displayError, setDisplayError] = React.useState("");

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [isAuth, setIsAuth] = React.useState(false);

  const { data, error, isLoading } = useGetTodosQuery();

  const [addTodo] = useAddTodoMutation();
  const [logout] = useUserLogoutMutation();

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

  const handleLogout = async () => {
    await logout();
    router.replace("/login");
  };

  const renderTodos = (data: TodosResponseType) => {
    const backgroundColor = (i: number) => (i % 2 === 0 ? "white" : "#fad1fe");

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
  useEffect(() => {
    if (data && data.string) {
      if (data.error_message) {
        const { error_message } = data;
        if (
          error_message.toLowerCase().includes("unauthorized") ||
          error_message.toLowerCase().includes("invalid token")
        ) {
          router.replace("/login");
        } else {
          setIsAuth(true);
          if (error_message.length > 0) {
            setDisplayError(error_message);
          }
        }
      } else {
        setIsAuth(true);
      }
    }
  }, [data]);

  if (!isAuth) {
    return <CircularProgress data-testid="loader" />;
  } else {
    return (
      <div className={cssStyles.outer}>
        <Header handleLogout={handleLogout} />
        {isLoading && <div>Loading...</div>}
        {(error || displayError.length > 0) && (
          <div className={cssStyles.centeredRowFlex}>
            <Typography color="red">
              There seems to be some error happening. Please reload or relogin
            </Typography>
          </div>
        )}

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

        <div data-testid="add-button" className={cssStyles.fabFixedStyle}>
          <Fab color="secondary" aria-label="add" onClick={handleOpen}>
            <AddIcon />
          </Fab>
        </div>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
        >
          <div className={cssStyles.modalContainer}>
            <Typography
              variant="h5"
              component="h2"
              className={cssStyles.modalTitle}
              data-testid="add-todo-modal-title"
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
                  color="secondary"
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
                  color="secondary"
                />
              </div>
              <br />
              <Button
                onClick={handleAddTodos}
                variant="contained"
                disabled={name.length === 0}
                aria-label="Add Todo"
                color="secondary"
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
