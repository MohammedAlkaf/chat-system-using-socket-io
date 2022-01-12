const express = require("express");
const { getMessages } = require('./handlers/getMessages');
const { sendMessage } = require('./handlers/sendMessage');
const socketIo = require("socket.io");

// MongoDB
const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
// ----------

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

io.on("connection", async (socket) => {
    const client = new MongoClient(MONGO_URI, options);

    await client.connect();

    console.log("MongoClient connected");

    console.log("New client connected: ", socket.id);

    await socket.on('send-message', async (message) => {
        
        await sendMessage(client, message);
        await getMessages(client, io);

    });

    await socket.on("disconnect", () => {
        client.close();
        console.log("MongoClient disconnected");
        console.log("Client disconnected", socket.id);
    });

    getMessages(client,io);
});