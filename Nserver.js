const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.send("Nrealtime Server Running 🚀");
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Laravel trigger route
app.post("/Npush", (req, res) => {

  console.log("🔥 Order Received:", req.body);

  io.emit("NnewOrder", req.body);

  res.json({ status: true });
});

io.on("connection", (socket) => {
  console.log("✅ Admin Connected:", socket.id);
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log("🚀 Server Running on", PORT);
});
