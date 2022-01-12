
const getMessages = async (client, io, room) => {

    const db = client.db("chatSystem");
    const messages = await db.collection(`${room}`).find().toArray();

    io.in(room).emit('get-messages', messages);

};

module.exports = { getMessages }