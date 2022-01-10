const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const getMessages = async () => {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    console.log("connected");

    const db = client.db("chatSystem");
    const messages = await db.collection("messages").find().toArray();
    client.close();
    console.log("disconnected");

    return messages

};

module.exports = { getMessages }