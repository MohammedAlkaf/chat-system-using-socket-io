
const sendMessage = async (client, message, room) => {

        const db = client.db("chatSystem");
        await db.collection(`${room}`).insertOne(message);
}
;

module.exports = { sendMessage }