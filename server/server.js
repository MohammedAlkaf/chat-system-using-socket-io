const express = require("express");
const { getMessages } = require('./handlers/getMessages');
const { sendMessage } = require('./handlers/sendMessage');

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

const io = require("socket.io")(server,{
    cors:{
        origin: [frontUrl]
    }
});

io.on("connection", async (socket) => {
    console.log(socket.id);

    socket.on('send-message', async (message) => {
        await sendMessage(message);

        let messages = await getMessages();
        io.emit('get-messages', messages);
    });

    let messages = await getMessages();
    io.emit('get-messages', messages);
});