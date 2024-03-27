import { Login } from "../components/login/Login";
import { Typography, Paper } from "@mui/material";
import { styles } from "./styles";

export default function LoginPage() {
  return (
    <Paper style={styles.paperContainer}>
      <Login />
    </Paper>
  );
}
