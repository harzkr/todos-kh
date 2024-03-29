import express, { Response, Request } from "express";
import next from "next";
import cors from "cors";
import fetch from "node-fetch";

const port = 5001;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.prepare().then(() => {
  const server = express();

  server.use(cors());
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));

  server.post("/hello", (req, res) => {
    res.json({ message: "Hello World" });
  });

  server.post("/login", (req, res) => {
    console.log("req.body", req.body);
    const { username, password } = req.body;

    console.log("username", username);
    console.log("password", password);
    fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Basic " + Buffer.from(username + ":" + password).toString("base64"),
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        res.json(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
