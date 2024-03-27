import Image from "../../public/login/background.jpg";

export const styles = {
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
    flexDirection: "column" as "column",
  },
};
