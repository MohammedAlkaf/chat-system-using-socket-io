
const getMessages = async (client, io) => {

    const db = client.db("chatSystem");
    const messages = await db.collection("messages").find().toArray();

    io.emit('get-messages', messages);

};

module.exports = { getMessages }