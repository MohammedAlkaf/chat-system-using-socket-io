const express = require("express");
const { getMessages } = require('./handlers/getMessages');
const { sendMessage } = require('./handlers/sendMessage');
const socketIo = require("socket.io");

const PORT = 8000;
const frontUrl = "http://localhost:3000";

const app = express();

app.use(express.json());

app.get("/chat", (req, res) => {
    res.status(200).json({ status: 200, message: 'success' })
});

const server = app.listen(PORT, function () {
    console.info("🌍 Listening on port " + PORT);
});

const io = socketIo(server,{
    cors:{
        origin: [frontUrl]
    }
});

io.on("connection", (socket) => {
    console.log("New client connected: ", socket.id);

    socket.on('send-message', async (message) => {
        
        await sendMessage(message);
        await getMessages(io);

    });

    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });

    getMessages(io);
});