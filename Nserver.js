require('dotenv').config();

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Nrealtime Server Running 🚀");
});

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

app.post('/Npush', (req, res) => {

    const token = req.headers['x-secret-key'];

    if (token !== process.env.NSECRET_KEY) {
        return res.status(403).json({ error: "Unauthorized" });
    }

    io.emit("NnewOrder", req.body);

    res.json({ status: true });
});

io.on("connection", (socket) => {
    console.log("Admin Connected:", socket.id);
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log("Server Running on", PORT);
});
