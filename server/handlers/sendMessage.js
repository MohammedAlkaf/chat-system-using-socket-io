
const sendMessage = async (client, message) => {

        const db = client.db("chatSystem");
        await db.collection("messages").insertOne(message);
}
;

module.exports = { sendMessage }