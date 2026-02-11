require('dotenv').config();

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// 🔐 Secret verify middleware
app.post('/Npush', (req, res) => {

    const token = req.headers['x-secret-key'];

    if (token !== process.env.NSECRET_KEY) {
        return res.status(403).json({ error: "Unauthorized" });
    }

    const order = req.body;

    io.emit("NnewOrder", order);

    res.json({ status: true });
});

io.on("connection", (socket) => {
    console.log("Admin Connected:", socket.id);
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log("Node Server Running on port", PORT);
});
