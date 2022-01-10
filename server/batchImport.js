const { MongoClient } = require("mongodb"); // Require MongoDB package
require("dotenv").config(); // Require dotenv(environment variables) configuration

// Get Mongo_URI(important to connect to our unique MongoDB account, and project database) from .env file
const { MONGO_URI } = process.env;
// set up the options for MongoClient -> I do not know yet what this exactly does, but it's important :)
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const messages = [
    {
        id:'1213213113',
        text:'hi'
    },
    {
        id:'1321311188',
        text:'this is MongoDB'
    }
];

const batchImport = async () => {
    try{
        // Create a client connection
        const client = new MongoClient(MONGO_URI, options);
        // Connect to client
        await client.connect();
        console.log('connected');
        // Connect the client to the database
        const db = client.db('chatSystem');

        // add initial customers info to the 'messages' collection
        await db.collection("messages").insertMany(messages);

        // colse connection to the client
        client.close();
        console.log('disconnected');
    }
    catch(err){
        console.log("ERROR OCCURED: ", err);
    }
}

// Call the this function when run this js file.
batchImport();