"use client";
import React, { useState } from "react";
import { Typography, TextField, Button, CircularProgress } from "@mui/material";
import cssStyles from "./login.module.css";
import { useUserLoginMutation } from "@/lib/features/login/loginApiSlice";
import { useRouter } from "next/navigation";

export const Login = () => {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  const [loginUser, { data, error, isLoading }] = useUserLoginMutation();

  const handleLogin = async () => {
    setErrorMessage("");
    setLoggingIn(true);
    await loginUser({ username, password });
  };

  const handleRedirection = async () => {
    setLoggingIn(false);
    router.replace("/");
  };

  React.useEffect(() => {
    if (data && data.string) {
      console.log("data", data);
      if (data.string === "ok") {
        // redirect to dashboard
        handleRedirection();
      } else {
        // show error message
        console.log("error", data);
        if (data.error_message) {
          setErrorMessage(data.error_message);
          setLoggingIn(false);
        }
      }
    }

    if (error) {
      console.log("error", error);
      setErrorMessage("An error occurred. Please try again.");
      setLoggingIn(false);
    }
  }, [data, error]);

  if (loggingIn) {
    return <CircularProgress />;
  }

  return (
    <div className={cssStyles.loginContainer}>
      <Typography variant="body2">ENTER YOUR CREDENTIALS TO LOGIN</Typography>
      {errorMessage && (
        <Typography variant="body2" color="error">
          {errorMessage}
        </Typography>
      )}
      <div className={cssStyles.outerContainer}>
        <TextField
          id="username"
          label="Username"
          variant="outlined"
          onChange={(e) => setUsername(e.target.value)}
          color="secondary"
          fullWidth
          data-testid="username"
        />
        <br />
        <TextField
          id="password"
          label="Password"
          type="password"
          variant="outlined"
          onChange={(e) => setPassword(e.target.value)}
          color="secondary"
          fullWidth
          data-testid="password"
        />
      </div>
      <Button
        variant="text"
        disabled={username.length === 0 || password.length === 0 || isLoading}
        onClick={handleLogin}
        color="secondary"
        data-testid="login-button"
      >
        Login
      </Button>
    </div>
  );
};
