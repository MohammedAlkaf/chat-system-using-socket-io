const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const sendMessage = async (message) => {
    try{
        const client = new MongoClient(MONGO_URI, options);
        await client.connect();
        console.log("connected");
    
        const db = client.db("chatSystem");
        await db.collection("messages").insertOne(message);
        client.close();
        console.log("disconnected");
    }
    catch(err){
        console.log("Error:", err)
    }
};

module.exports = { sendMessage }