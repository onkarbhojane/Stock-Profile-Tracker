import express from "express";
import router from "./Routes/Routes.js";
import cors from "cors";
import dotenv from "dotenv";
import conn from "./DB/conn.js";
import { createServer } from "http"; // Import HTTP module
import { Server } from "socket.io";

dotenv.config();
conn();

const app = express();
const port = process.env.PORT || 3000;

// Create an HTTP server and attach Express to it
const httpServer = createServer(app);

// Attach socket.io to the HTTP server
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173", // Adjust this according to your frontend's origin
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  socket.on("message", (data) => {
    console.log("Message received:", data);
    io.emit("message", data); // Broadcast message to all clients
  });
  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");
  });
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors());

// Import and use routes
app.use("/api/user", router);
app.use("/service", router);
app.use("/payment", router);
app.use("/stock", router);

app.get("/", (req, res) => {
  res.send("Server is working on Vercel!");
});

// Start the server using `httpServer` instead of `app`
httpServer.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
