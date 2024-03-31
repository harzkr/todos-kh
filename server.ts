import express from "express";
import next from "next";
import cors from "cors";
import fetch from "node-fetch";

const port = 5001;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use(cors());
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));

  server.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Basic " +
            Buffer.from(username + ":" + password).toString("base64"),
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error("Error:", error);
    }
  });

  server.get("/todo", async (req, res) => {
    const { authorization } = req.headers;

    if (!authorization) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const token = authorization.split(" ")[1];

    try {
      const response = await fetch("http://localhost:3000/api/todo", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error("Error:", error);
    }
  });

  server.post("/todo", async (req, res) => {
    const { authorization } = req.headers;

    if (!authorization) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const token = authorization.split(" ")[1];

    try {
      const response = await fetch("http://localhost:3000/api/todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(req.body),
      });

      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error("Error:", error);
    }
  });

  server.put("/todo/:id", async (req, res) => {
    const { authorization } = req.headers;

    if (!authorization) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const token = authorization.split(" ")[1];

    try {
      const response = await fetch(
        `http://localhost:3000/api/todo/${req.params.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(req.body),
        }
      );
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error("Error:", error);
    }
  });

  server.delete("/todo/:id", async (req, res) => {
    const { authorization } = req.headers;

    if (!authorization) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const token = authorization.split(" ")[1];

    try {
      const response = await fetch(
        `http://localhost:3000/api/todo/${req.params.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error("Error:", error);
    }
  });

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
