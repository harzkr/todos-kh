"use client";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Typography, TextField, Box, Button } from "@mui/material";
import cssStyles from "./login.module.css";
import { useUserLoginMutation } from "@/lib/features/login/loginApiSlice";
import { useRouter } from "next/navigation";

export const Login = () => {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loginUser, { data, error, isLoading }] = useUserLoginMutation();

  const handleLogin = async () => {
    const resp: any = await loginUser({ username, password });
  };

  React.useEffect(() => {
    if (data) {
      console.log("data", data);
      if (data.string === "ok") {
        // redirect to dashboard
        localStorage.setItem("access-token", data.data);
        router.push("/");
      }
    }
  }, [data]);

  return (
    <div className={cssStyles.loginContainer}>
      <Typography variant="body1">
        Enter your username and password to login
      </Typography>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
          display: "flex",
          flexDirection: "column",
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="username"
          label="Username"
          variant="outlined"
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          id="password"
          label="Password"
          type="password"
          variant="outlined"
          onChange={(e) => setPassword(e.target.value)}
        />
      </Box>
      <Button
        variant="text"
        disabled={username.length === 0 || password.length === 0 || isLoading}
        onClick={handleLogin}
      >
        Login
      </Button>
    </div>
  );
};
