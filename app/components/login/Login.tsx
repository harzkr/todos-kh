"use client";
import React, { useState } from "react";
import { Typography, TextField, Button } from "@mui/material";
import cssStyles from "./login.module.css";
import { useUserLoginMutation } from "@/lib/features/login/loginApiSlice";
import { useRouter } from "next/navigation";

export const Login = () => {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [loginUser, { data, error, isLoading }] = useUserLoginMutation();

  const handleLogin = async () => {
    await loginUser({ username, password });
  };

  const handleRedirection = async (token: string) => {
    await localStorage.setItem("access-token", token);

    setTimeout(() => {
      router.replace("/");
    }, 1000);
  };

  React.useEffect(() => {
    if (data) {
      console.log("data", data);
      if (data.string === "ok") {
        // redirect to dashboard
        handleRedirection(data.data);
      } else {
        // show error message
        console.log("error", data);
        if (data.error_message) {
          setErrorMessage(data.error_message);
        }
      }
    }
  }, [data]);

  return (
    <div className={cssStyles.loginContainer}>
      <Typography variant="body2">ENTER YOUR CREDENTIALS TO LOGIN</Typography>
      <br />
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
        />
      </div>
      <Button
        variant="text"
        disabled={username.length === 0 || password.length === 0 || isLoading}
        onClick={handleLogin}
        color="secondary"
      >
        Login
      </Button>
    </div>
  );
};
