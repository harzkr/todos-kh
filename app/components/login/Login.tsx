"use client";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Typography, TextField, Box, Button } from "@mui/material";
import cssStyles from "./login.module.css";

export const Login = () => {
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
        <TextField id="username" label="Username" variant="outlined" />
        <TextField
          id="password"
          label="Password"
          type="password"
          variant="outlined"
        />
      </Box>
      <Button variant="text">Login</Button>
    </div>
  );
};
