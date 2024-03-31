"use client";
import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

export const Header = ({ handleLogout }: { handleLogout: () => void }) => {
  return (
    <AppBar color="secondary" position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          TodoList App
        </Typography>
        <Button onClick={handleLogout} color="inherit">
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};
