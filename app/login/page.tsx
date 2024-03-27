import { Login } from "../components/login/Login";
import { Typography, Paper } from "@mui/material";
import Image from "../../public/login/background.jpg";

const styles = {
  paperContainer: {
    backgroundImage: `url(${Image.src})`,
    height: "100vh",
    width: "100%",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
};

export default function LoginPage() {
  return (
    <Paper style={styles.paperContainer}>
      <Typography variant="h5">Login</Typography>
      <Login />
    </Paper>
  );
}
